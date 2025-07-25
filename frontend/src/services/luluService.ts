import { Principal } from '@dfinity/principal';
import { Actor, HttpAgent } from '@dfinity/agent';
// Mock the backend service for now since declarations aren't building properly
const idlFactory = () => null;

const canisterId = process.env.VITE_BACKEND_CANISTER_ID || 'be2us-64aaa-aaaaa-qaabq-cai';

const createActor = () => {
  const agent = new HttpAgent({
    host: process.env.VITE_DFX_NETWORK === 'ic' ? 'https://ic0.app' : 'http://localhost:4943',
  });

  if (process.env.VITE_DFX_NETWORK !== 'ic') {
    agent.fetchRootKey().catch(console.error);
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: Principal.fromText(canisterId),
  });
};

const backend = createActor();

export interface SocialMediaPost {
  id: bigint;
  platform: string;
  content: string;
  image_url: [] | [string];
  scheduled_time: string;
  status: { Draft: null } | { Scheduled: null } | { Published: null } | { Failed: null };
  ai_generated: boolean;
  created_at: bigint;
}

export interface CharacterPersona {
  name: string;
  tone: string;
  personality_traits: string[];
  communication_style: string;
  platform_styles: PlatformStyle[];
}

export interface PlatformStyle {
  platform: string;
  focus: string;
  content_types: string[];
  caption_style: string;
}

export interface ContentGenerationRequest {
  platform: string;
  content_type: string;
  topic: [] | [string];
  image_description: [] | [string];
  include_hashtags: boolean;
  persona_name: [] | [string];
}

export interface AnalyticsData {
  post_id: bigint;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export const luluService = {
  async generateCaption(request: ContentGenerationRequest): Promise<string> {
    try {
      const result = await backend.generate_caption(request);
      if ('Ok' in result) {
        return result.Ok;
      } else {
        throw new Error(result.Err);
      }
    } catch (error) {
      console.error('Error generating caption:', error);
      throw error;
    }
  },

  async createPost(
    platform: string,
    content: string,
    imageUrl?: string,
    scheduledTime?: string
  ): Promise<bigint> {
    const scheduled = scheduledTime || new Date().toISOString();
    return await backend.create_post(
      platform,
      content,
      imageUrl ? [imageUrl] : [],
      scheduled
    );
  },

  async getPosts(platform?: string, status?: string): Promise<SocialMediaPost[]> {
    const statusOption = status ? [{ [status]: null }] : [];
    return await backend.get_posts(
      platform ? [platform] : [],
      statusOption
    );
  },

  async updatePostStatus(postId: bigint, status: string): Promise<void> {
    const statusObj = { [status]: null };
    const result = await backend.update_post_status(postId, statusObj);
    if ('Err' in result) {
      throw new Error(result.Err);
    }
  },

  async createPersona(persona: CharacterPersona): Promise<string> {
    return await backend.create_persona(persona);
  },

  async getPersonas(): Promise<CharacterPersona[]> {
    return await backend.get_personas();
  },

  async recordAnalytics(analytics: AnalyticsData): Promise<void> {
    const result = await backend.record_analytics(analytics);
    if ('Err' in result) {
      throw new Error(result.Err);
    }
  },

  async getAnalytics(postId?: bigint): Promise<AnalyticsData[]> {
    return await backend.get_analytics(postId ? [postId] : []);
  },

  async chat(messages: any[]): Promise<string> {
    return await backend.chat(messages);
  },

  async prompt(promptStr: string): Promise<string> {
    return await backend.prompt(promptStr);
  },
};