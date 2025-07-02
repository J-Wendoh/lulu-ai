# 🛠️ Lulu AI Setup Guide

This guide will walk you through setting up Lulu AI for local development and deployment.

---

## 📋 Prerequisites

Before getting started, ensure you have the following installed:

### Required Software
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** - Version control system

### API Keys & Accounts
- **OpenAI Account** - For GPT-4o and DALL·E 3 API access
- **Midjourney Account** (Optional) - For advanced image generation
- **Social Media Developer Accounts**:
  - Instagram Basic Display API
  - LinkedIn API
  - X (Twitter) API v2
  - Facebook Graph API

---

## 🚀 Local Development Setup

### Step 1: Clone the Repository
```bash
# Clone the repository
git clone https://github.com/your-username/lulu-ai.git

# Navigate to the project directory
cd lulu-ai
```

### Step 2: Install Dependencies
```bash
# Install all required packages
npm install

# Or using yarn
yarn install
```

### Step 3: Environment Variables Setup

Create a `.env` file in the root directory:
```bash
# Copy the example environment file
cp .env.example .env
```

Add your API keys to the `.env` file:
```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o

# DALL·E Configuration
DALLE_API_KEY=your_dalle_api_key_here

# Midjourney Configuration (Optional)
MIDJOURNEY_API_KEY=your_midjourney_api_key_here
MIDJOURNEY_WEBHOOK_URL=your_webhook_url_here

# Social Media API Keys
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# OAuth Redirect URIs
OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
PRODUCTION_REDIRECT_URI=https://your-domain.com/auth/callback

# Internet Identity Configuration
II_CANISTER_ID=your_internet_identity_canister_id
DFX_NETWORK=local

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 4: API Key Configuration

#### OpenAI API Setup
1. Visit [OpenAI API Dashboard](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env` file as `OPENAI_API_KEY`

#### Social Media API Setup

**Instagram Basic Display API:**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app and add Instagram Basic Display
3. Add your redirect URI: `http://localhost:3000/auth/instagram/callback`
4. Copy Client ID and Secret to `.env`

**LinkedIn API:**
1. Visit [LinkedIn Developer Platform](https://www.linkedin.com/developers/)
2. Create a new app with Sign In with LinkedIn
3. Add redirect URI: `http://localhost:3000/auth/linkedin/callback`
4. Copy Client ID and Secret to `.env`

**X (Twitter) API:**
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app and enable OAuth 2.0
3. Add callback URL: `http://localhost:3000/auth/twitter/callback`
4. Copy API Key and Secret to `.env`

**Facebook Graph API:**
1. Use the same Facebook app from Instagram setup
2. Add Facebook Login product
3. Configure OAuth redirect URI
4. Copy App ID and Secret to `.env`

### Step 5: Initialize Project Structure

Create the required directories:
```bash
# Create user content directories
mkdir -p Photos Calendar Articles "Character Files"

# Create demo content (optional)
mkdir -p public/demo
```

### Step 6: Start Development Server
```bash
# Start the development server
npm run dev

# Or using yarn
yarn dev
```

Visit `http://localhost:3000` to see Lulu AI running locally!

---

## 🧪 Adding Demo Data (Optional)

To test the application with sample data:

### Step 1: Create Sample Character File
```bash
# Create a sample character file
cat > "Character Files/sample-brand.json" << EOF
{
  "name": "Tech Startup Brand",
  "personality": "innovative, friendly, professional",
  "tone": "enthusiastic but informative",
  "voice": "conversational with technical expertise",
  "values": ["innovation", "user-centric design", "transparency"],
  "target_audience": "tech-savvy professionals and entrepreneurs",
  "content_themes": ["technology trends", "startup tips", "industry insights"],
  "posting_frequency": "daily",
  "hashtag_strategy": "mix of trending and niche hashtags",
  "content_pillars": [
    "Educational content (40%)",
    "Behind-the-scenes (30%)",
    "Industry news (20%)",
    "Community engagement (10%)"
  ]
}
EOF
```

### Step 2: Add Sample Photos
```bash
# Create sample photo directory
mkdir -p Photos/sample-content

# You can add your own photos or use placeholder images
# The AI will analyze and generate appropriate captions
```

### Step 3: Test API Connections
```bash
# Test OpenAI connection
npm run test:openai

# Test social media APIs
npm run test:social-apis
```

---

## 🌐 Deployment Instructions

### Netlify Deployment (Recommended)

#### Method 1: Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist` or `build`
3. Add environment variables in Netlify dashboard
4. Deploy automatically on every push

#### Method 2: Manual Deployment
```bash
# Build for production
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### ICP via Fleek (Decentralized)

#### Step 1: Install Fleek CLI
```bash
# Install Fleek CLI
npm install -g @fleek-platform/cli

# Login to Fleek
fleek login
```

#### Step 2: Configure Fleek
```bash
# Initialize Fleek configuration
fleek sites init

# Configure build settings
fleek sites deploy
```

#### Step 3: Deploy to ICP
```bash
# Deploy to Internet Computer
npm run deploy:icp
```

---

## 🔧 Advanced Configuration

### Custom AI Model Configuration
```javascript
// src/config/ai-config.js
export const aiConfig = {
  openai: {
    model: 'gpt-4o',
    maxTokens: 1000,
    temperature: 0.7,
  },
  dalle: {
    model: 'dall-e-3',
    quality: 'standard',
    size: '1024x1024',
  },
  midjourney: {
    version: 'v6',
    quality: 'high',
    stylize: 100,
  }
};
```

### Social Media Platform Configuration
```javascript
// src/config/platforms.js
export const platforms = {
  instagram: {
    enabled: true,
    maxImageSize: '8MB',
    supportedFormats: ['jpg', 'png', 'gif'],
    maxCaptionLength: 2200,
  },
  linkedin: {
    enabled: true,
    maxPostLength: 3000,
    supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
  },
  twitter: {
    enabled: true,
    maxTweetLength: 280,
    threadSupport: true,
  },
  facebook: {
    enabled: true,
    maxPostLength: 63206,
    supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
  }
};
```

---

## 🚨 Troubleshooting

### Common Issues

#### API Key Errors
```bash
# Check if API keys are properly loaded
npm run check:env

# Test individual API connections
npm run test:openai
npm run test:social-apis
```

#### Build Errors
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated
npm update
```

#### OAuth Redirect Issues
1. Ensure redirect URIs match exactly in your API configurations
2. Check that your domain is properly configured
3. Verify SSL certificates for production deployments

### Performance Optimization
```bash
# Analyze bundle size
npm run analyze

# Optimize images
npm run optimize:images

# Check performance metrics
npm run lighthouse
```

---

## 📚 Additional Resources

### Documentation
- [API Reference](api-reference.md)
- [Character File Schema](character-file-schema.md)
- [Deployment Guide](deployment.md)

### Community
- [Discord Server](https://discord.gg/lulu-ai)
- [GitHub Discussions](https://github.com/your-username/lulu-ai/discussions)
- [FAQ](faq.md)

### Development Tools
- [VSCode Extensions](development-tools.md#vscode-extensions)
- [Testing Guide](testing.md)
- [Debugging Tips](debugging.md)

---

## 🆘 Getting Help

If you encounter issues during setup:

1. **Check the logs**: Most errors will be displayed in the terminal
2. **Verify API keys**: Ensure all required API keys are properly configured
3. **Review environment variables**: Double-check your `.env` file
4. **Community support**: Join our [Discord](https://discord.gg/lulu-ai) for help
5. **GitHub Issues**: Report bugs or request features

---

<div align="center">

**Setup complete! 🎉**

[← Back to README](../README.md) | [Contributing Guide →](contributing.md)

</div> 