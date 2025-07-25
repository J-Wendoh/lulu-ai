# IC Canister Deployment Guide for Lulu AI

This guide will help you deploy the Lulu AI social media agent on the Internet Computer.

## Prerequisites

- DFX SDK installed (version 0.25.0 or later)
- Node.js 18+ and npm
- Rust toolchain
- Ollama (for local LLM testing)

## Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install
cd ..

# Install root dependencies
npm install
```

### 2. Start Local IC Network

```bash
# Start DFX in a separate terminal
dfx start --clean
```

### 3. Deploy Canisters

```bash
# Deploy backend and frontend canisters
dfx deploy

# Pull and deploy the LLM canister
dfx deps pull
dfx deps deploy
```

### 4. Initialize Lulu Persona

After deployment, you can initialize the default Lulu persona:

```bash
# Get the backend canister ID
dfx canister id backend

# Create the default Lulu persona using dfx
dfx canister call backend create_persona '(record {
  name = "Lulu";
  tone = "Professional yet approachable";
  personality_traits = vec {"Sophisticated"; "Tech-savvy"; "Empowering"; "Forward-thinking"};
  communication_style = "Clear, direct, and inspiring with a touch of futuristic flair";
  platform_styles = vec {
    record {
      platform = "LinkedIn";
      focus = "Professional insights on AI in business and social media automation";
      content_types = vec {"Industry insights"; "Case studies"; "Thought leadership"};
      caption_style = "Professional, data-driven, and thought-provoking"
    };
    record {
      platform = "Instagram";
      focus = "Visual storytelling about AI automation and business success";
      content_types = vec {"Behind-the-scenes tech"; "Success stories"; "Tips & tricks"};
      caption_style = "Inspiring and educational with strategic hashtags"
    };
    record {
      platform = "Twitter";
      focus = "Quick tips, tech updates, and community engagement";
      content_types = vec {"Tech tips"; "Industry news"; "Quick insights"};
      caption_style = "Concise, witty, and engaging"
    };
    record {
      platform = "Facebook";
      focus = "Community building and educational content";
      content_types = vec {"How-to guides"; "Community posts"; "Success stories"};
      caption_style = "Friendly, detailed, and community-focused"
    }
  }
})'
```

### 5. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at http://localhost:5173

## Architecture Overview

The Lulu AI social media agent consists of:

1. **Backend Canister** (`src/backend/`):
   - Social media post management
   - Character persona storage
   - AI caption generation using IC LLM
   - Analytics tracking

2. **Frontend** (`frontend/`):
   - React-based UI with Tailwind CSS
   - IC agent integration for canister calls
   - Caption generation interface
   - Persona management
   - Post scheduling and preview

3. **LLM Canister** (pulled dependency):
   - Provides AI capabilities for content generation
   - Supports multiple language models

## Key Features

- **AI-Powered Caption Generation**: Uses the IC LLM canister to generate platform-specific captions
- **Character Personas**: Maintain consistent brand voice across platforms
- **Post Management**: Create, schedule, and track social media posts
- **Analytics**: Track engagement metrics for published posts

## Testing

```bash
# Run backend tests
npm test tests/src/backend.test.ts

# Run frontend tests
cd frontend
npm test
```

## Production Deployment

For production deployment on the IC mainnet:

```bash
# Deploy to IC mainnet
dfx deploy --network ic

# Get the canister URLs
echo "Backend: https://$(dfx canister id backend --network ic).ic0.app"
echo "Frontend: https://$(dfx canister id frontend --network ic).ic0.app"
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_BACKEND_CANISTER_ID=<your-backend-canister-id>
VITE_DFX_NETWORK=local
```

For production:
```env
VITE_BACKEND_CANISTER_ID=<your-backend-canister-id>
VITE_DFX_NETWORK=ic
```

## Troubleshooting

1. **Canister build fails**: Make sure you have the Rust toolchain installed
2. **Frontend can't connect**: Check that the canister IDs in the environment match your deployment
3. **LLM not responding**: Ensure Ollama is running locally or the IC LLM canister is properly deployed

## Next Steps

1. Customize personas for your brand
2. Integrate with social media APIs for actual posting
3. Add image generation capabilities
4. Implement advanced scheduling features