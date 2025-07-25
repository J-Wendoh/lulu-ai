use ic_cdk::export_candid;
use std::cell::RefCell;
use candid::{CandidType, Deserialize};
use serde::Serialize;

use ic_llm::{ChatMessage, Model};

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct SocialMediaPost {
    pub id: u64,
    pub platform: String,
    pub content: String,
    pub image_url: Option<String>,
    pub scheduled_time: String,
    pub status: PostStatus,
    pub ai_generated: bool,
    pub created_at: u64,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug, PartialEq)]
pub enum PostStatus {
    Draft,
    Scheduled,
    Published,
    Failed,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct CharacterPersona {
    pub name: String,
    pub tone: String,
    pub personality_traits: Vec<String>,
    pub communication_style: String,
    pub platform_styles: Vec<PlatformStyle>,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct PlatformStyle {
    pub platform: String,
    pub focus: String,
    pub content_types: Vec<String>,
    pub caption_style: String,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct ContentGenerationRequest {
    pub platform: String,
    pub content_type: String,
    pub topic: Option<String>,
    pub image_description: Option<String>,
    pub include_hashtags: bool,
    pub persona_name: Option<String>,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct AnalyticsData {
    pub post_id: u64,
    pub likes: u32,
    pub comments: u32,
    pub shares: u32,
    pub views: u32,
}

thread_local! {
    static COUNTER: RefCell<u64> = const { RefCell::new(0) };
    static POSTS: RefCell<Vec<SocialMediaPost>> = RefCell::new(Vec::new());
    static PERSONAS: RefCell<Vec<CharacterPersona>> = RefCell::new(Vec::new());
    static ANALYTICS: RefCell<Vec<AnalyticsData>> = RefCell::new(Vec::new());
}

#[ic_cdk::update]
async fn generate_caption(request: ContentGenerationRequest) -> Result<String, String> {
    let mut system_prompt = String::from("You are Lulu AI, a sophisticated social media manager. ");
    
    if let Some(persona_name) = &request.persona_name {
        if let Some(persona) = get_persona_by_name(persona_name) {
            system_prompt.push_str(&format!(
                "Adopt the following persona: {} with tone: {} and style: {}. ",
                persona.name, persona.tone, persona.communication_style
            ));
            
            for platform_style in &persona.platform_styles {
                if platform_style.platform == request.platform {
                    system_prompt.push_str(&format!(
                        "For {}, focus on: {} with style: {}. ",
                        platform_style.platform, platform_style.focus, platform_style.caption_style
                    ));
                }
            }
        }
    }
    
    let user_prompt = format!(
        "Generate a {} caption for {} about: {}. {}",
        request.content_type,
        request.platform,
        request.topic.unwrap_or_else(|| "general content".to_string()),
        if request.include_hashtags { "Include relevant hashtags." } else { "" }
    );
    
    let messages = vec![
        ChatMessage::System { content: system_prompt },
        ChatMessage::User { content: user_prompt },
    ];
    
    let response = ic_llm::chat(Model::Llama3_1_8B)
        .with_messages(messages)
        .send()
        .await;
    
    Ok(response.message.content.unwrap_or_else(|| "Failed to generate caption".to_string()))
}

#[ic_cdk::update]
async fn prompt(prompt_str: String) -> String {
    ic_llm::prompt(Model::Llama3_1_8B, prompt_str).await
}

#[ic_cdk::update]
async fn chat(messages: Vec<ChatMessage>) -> String {
    let response = ic_llm::chat(Model::Llama3_1_8B)
        .with_messages(messages)
        .send()
        .await;

    response.message.content.unwrap_or_default()
}

#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[ic_cdk::update]
fn increment() -> u64 {
    COUNTER.with(|counter| {
        let val = *counter.borrow() + 1;
        *counter.borrow_mut() = val;
        val
    })
}

#[ic_cdk::query]
fn get_count() -> u64 {
    COUNTER.with(|counter| *counter.borrow())
}

#[ic_cdk::update]
fn set_count(value: u64) -> u64 {
    COUNTER.with(|counter| {
        *counter.borrow_mut() = value;
        value
    })
}

#[ic_cdk::update]
fn create_post(platform: String, content: String, image_url: Option<String>, scheduled_time: String) -> u64 {
    let post_id = COUNTER.with(|counter| {
        let val = *counter.borrow() + 1;
        *counter.borrow_mut() = val;
        val
    });
    
    let post = SocialMediaPost {
        id: post_id,
        platform,
        content,
        image_url,
        scheduled_time,
        status: PostStatus::Draft,
        ai_generated: false,
        created_at: ic_cdk::api::time(),
    };
    
    POSTS.with(|posts| posts.borrow_mut().push(post));
    post_id
}

#[ic_cdk::query]
fn get_posts(platform: Option<String>, status: Option<PostStatus>) -> Vec<SocialMediaPost> {
    POSTS.with(|posts| {
        let posts_ref = posts.borrow();
        posts_ref.iter()
            .filter(|post| {
                (platform.is_none() || Some(&post.platform) == platform.as_ref()) &&
                (status.is_none() || &post.status == status.as_ref().unwrap())
            })
            .cloned()
            .collect()
    })
}

#[ic_cdk::update]
fn update_post_status(post_id: u64, status: PostStatus) -> Result<(), String> {
    POSTS.with(|posts| {
        let mut posts_mut = posts.borrow_mut();
        if let Some(post) = posts_mut.iter_mut().find(|p| p.id == post_id) {
            post.status = status;
            Ok(())
        } else {
            Err("Post not found".to_string())
        }
    })
}

#[ic_cdk::update]
fn create_persona(persona: CharacterPersona) -> String {
    let persona_name = persona.name.clone();
    PERSONAS.with(|personas| personas.borrow_mut().push(persona));
    persona_name
}

#[ic_cdk::query]
fn get_personas() -> Vec<CharacterPersona> {
    PERSONAS.with(|personas| personas.borrow().clone())
}

fn get_persona_by_name(name: &str) -> Option<CharacterPersona> {
    PERSONAS.with(|personas| {
        personas.borrow().iter().find(|p| p.name == name).cloned()
    })
}

#[ic_cdk::update]
fn record_analytics(analytics: AnalyticsData) -> Result<(), String> {
    ANALYTICS.with(|data| data.borrow_mut().push(analytics));
    Ok(())
}

#[ic_cdk::query]
fn get_analytics(post_id: Option<u64>) -> Vec<AnalyticsData> {
    ANALYTICS.with(|data| {
        let data_ref = data.borrow();
        if let Some(id) = post_id {
            data_ref.iter().filter(|a| a.post_id == id).cloned().collect()
        } else {
            data_ref.clone()
        }
    })
}

export_candid!();