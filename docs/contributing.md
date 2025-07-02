# 🤝 Contributing to Lulu AI

We're thrilled that you're interested in contributing to Lulu AI! This guide will help you get started with contributing to our AI-powered social media management platform.

---

## 🌟 Ways to Contribute

### 🐛 Bug Reports
- Report bugs through [GitHub Issues](https://github.com/your-username/lulu-ai/issues)
- Include detailed reproduction steps
- Provide system information and screenshots

### 💡 Feature Requests
- Suggest new features via [GitHub Discussions](https://github.com/your-username/lulu-ai/discussions)
- Explain the use case and expected behavior
- Consider the impact on non-technical users

### 📝 Documentation
- Improve existing documentation
- Add examples and tutorials
- Fix typos and clarify instructions

### 🔧 Code Contributions
- Fix bugs and implement features
- Improve performance and accessibility
- Add new social media integrations

### 🎨 Design & UX
- Enhance the purple/black luxury theme
- Improve user experience flows
- Create better visual components

---

## 🚀 Getting Started

### Prerequisites
1. Read our [Code of Conduct](CODE_OF_CONDUCT.md)
2. Check [existing issues](https://github.com/your-username/lulu-ai/issues) for similar problems
3. Join our [Discord community](https://discord.gg/lulu-ai) for discussions

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Follow the [setup guide](setup.md) to configure your environment
4. Create a new branch for your changes

---

## 🌿 Branching Strategy

### Branch Naming Convention
```
feature/short-description       # New features
bugfix/issue-number-description # Bug fixes
hotfix/critical-issue          # Critical production fixes
docs/documentation-update      # Documentation changes
refactor/component-name        # Code refactoring
style/ui-improvements         # UI/UX improvements
```

### Examples
```bash
# Good branch names
feature/instagram-stories-support
bugfix/121-caption-length-validation
hotfix/oauth-redirect-failure
docs/api-reference-update
refactor/character-file-parser
style/mobile-responsive-dashboard
```

### Branch Creation
```bash
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Push branch to your fork
git push origin feature/your-feature-name
```

---

## 📝 Coding Standards

### JavaScript/TypeScript Guidelines

#### Code Style
- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **functional components** with hooks
- Implement **proper error handling**

#### File Structure
```javascript
// Component structure
import React, { useState, useEffect } from 'react';
import { SomeUtility } from '../utils/someUtility';
import './ComponentName.css';

interface ComponentProps {
  // Define props with TypeScript interfaces
  title: string;
  isVisible?: boolean;
}

const ComponentName: React.FC<ComponentProps> = ({ 
  title, 
  isVisible = true 
}) => {
  // Component logic here
  const [state, setState] = useState<StateType>(initialState);
  
  useEffect(() => {
    // Side effects
  }, []);

  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

#### Naming Conventions
- **Components**: PascalCase (`CharacterFileUploader`)
- **Functions**: camelCase (`generateCaption`)
- **Variables**: camelCase (`userPreferences`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_CAPTION_LENGTH`)
- **Files**: kebab-case (`character-file-parser.ts`)

### CSS/Styling Guidelines

#### TailwindCSS Usage
- Use **utility-first** approach
- Create **custom components** for repeated patterns
- Maintain **purple/black luxury theme**
- Ensure **mobile-first responsiveness**

#### Custom CSS
```css
/* Use BEM methodology when custom CSS is needed */
.character-file-uploader {
  @apply bg-purple-900 text-white rounded-lg shadow-lg;
}

.character-file-uploader__button {
  @apply bg-purple-600 hover:bg-purple-700 transition-colors;
}

.character-file-uploader__button--disabled {
  @apply bg-gray-400 cursor-not-allowed;
}
```

### API Integration Standards

#### Error Handling
```javascript
// Proper error handling for API calls
async function generateCaption(imageData: ImageData): Promise<string> {
  try {
    const response = await openai.createCompletion({
      model: 'gpt-4o',
      prompt: buildPrompt(imageData),
      max_tokens: 100,
    });
    
    return response.data.choices[0].text || '';
  } catch (error) {
    console.error('Caption generation failed:', error);
    throw new Error('Failed to generate caption. Please try again.');
  }
}
```

#### Rate Limiting
```javascript
// Implement rate limiting for API calls
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter(10, 'minute'); // 10 requests per minute

async function makeAPICall(params: APIParams) {
  await limiter.removeTokens(1);
  return await apiClient.request(params);
}
```

---

## 🧪 Testing Guidelines

### Testing Strategy
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API integrations and workflows
- **E2E Tests**: Test complete user journeys
- **Visual Regression Tests**: Ensure UI consistency

### Testing Commands
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Test Structure
```javascript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterFileUploader from './CharacterFileUploader';

describe('CharacterFileUploader', () => {
  test('renders upload button', () => {
    render(<CharacterFileUploader />);
    expect(screen.getByText('Upload Character File')).toBeInTheDocument();
  });

  test('validates file format', async () => {
    render(<CharacterFileUploader />);
    const fileInput = screen.getByLabelText('character-file-input');
    
    // Test with invalid file
    fireEvent.change(fileInput, {
      target: { files: [new File(['test'], 'test.txt', { type: 'text/plain' })] }
    });
    
    expect(screen.getByText('Please upload a JSON file')).toBeInTheDocument();
  });
});
```

---

## 🔄 Pull Request Process

### Before Submitting
1. **Run tests**: Ensure all tests pass
2. **Check linting**: Fix any ESLint/Prettier issues
3. **Test manually**: Verify your changes work as expected
4. **Update documentation**: Add/update relevant docs
5. **Review checklist**: Complete the PR template

### PR Guidelines

#### Title Format
```
[Type] Brief description (#issue-number)

Examples:
[Feature] Add Instagram Stories support (#123)
[Bugfix] Fix caption length validation (#456)
[Docs] Update API reference documentation
[Refactor] Improve character file parsing performance
```

#### Description Template
```markdown
## 🎯 Purpose
Brief description of what this PR does and why.

## 🔧 Changes Made
- [ ] Added new feature X
- [ ] Fixed bug Y
- [ ] Updated documentation Z

## 🧪 Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Visual regression tests (if UI changes)

## 📸 Screenshots
<!-- Add before/after screenshots for UI changes -->

## 🚨 Breaking Changes
<!-- List any breaking changes and migration steps -->

## 📚 Additional Notes
<!-- Any additional context, concerns, or discussion points -->
```

### Review Process
1. **Automated checks**: CI/CD pipeline runs tests and linting
2. **Code review**: Team members review code quality and functionality
3. **Manual testing**: Reviewers test the changes locally
4. **Documentation review**: Check if docs need updates
5. **Approval**: At least one maintainer approval required

---

## 🔌 Adding New Integrations

### Social Media Platform Integration

#### Step 1: Create Platform Configuration
```javascript
// src/config/platforms/newplatform.js
export const newPlatformConfig = {
  name: 'NewPlatform',
  displayName: 'New Platform',
  apiVersion: 'v1',
  authType: 'oauth2',
  scopes: ['read', 'write', 'publish'],
  endpoints: {
    auth: 'https://api.newplatform.com/oauth/authorize',
    token: 'https://api.newplatform.com/oauth/token',
    post: 'https://api.newplatform.com/v1/posts',
    user: 'https://api.newplatform.com/v1/me',
  },
  limits: {
    maxPostLength: 1000,
    maxImages: 4,
    supportedFormats: ['jpg', 'png', 'gif'],
  },
};
```

#### Step 2: Implement API Client
```javascript
// src/api/clients/newplatform.js
export class NewPlatformClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseURL = 'https://api.newplatform.com/v1';
  }

  async createPost(postData) {
    const response = await fetch(`${this.baseURL}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`New Platform API error: ${response.statusText}`);
    }

    return response.json();
  }
}
```

#### Step 3: Add OAuth Flow
```javascript
// src/auth/newplatform.js
export const newPlatformAuth = {
  getAuthURL(redirectUri) {
    const params = new URLSearchParams({
      client_id: process.env.NEWPLATFORM_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'read write publish',
    });
    
    return `https://api.newplatform.com/oauth/authorize?${params}`;
  },

  async exchangeCodeForToken(code, redirectUri) {
    const response = await fetch('https://api.newplatform.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.NEWPLATFORM_CLIENT_ID,
        client_secret: process.env.NEWPLATFORM_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    return response.json();
  },
};
```

#### Step 4: Create UI Components
```javascript
// src/components/platforms/NewPlatformConnect.jsx
import React from 'react';
import { usePlatformAuth } from '../../hooks/usePlatformAuth';

const NewPlatformConnect = () => {
  const { connectPlatform, isConnecting } = usePlatformAuth();

  const handleConnect = () => {
    connectPlatform('newplatform');
  };

  return (
    <div className="platform-connect">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-newplatform-color hover:bg-newplatform-color-dark"
      >
        {isConnecting ? 'Connecting...' : 'Connect New Platform'}
      </button>
    </div>
  );
};

export default NewPlatformConnect;
```

### AI Model Integration

#### Step 1: Create Model Configuration
```javascript
// src/config/ai/newmodel.js
export const newModelConfig = {
  name: 'NewModel',
  provider: 'NewProvider',
  apiVersion: 'v1',
  capabilities: ['text-generation', 'image-analysis'],
  limits: {
    maxTokens: 2000,
    rateLimitPerMinute: 60,
  },
  pricing: {
    inputTokens: 0.001,
    outputTokens: 0.002,
  },
};
```

#### Step 2: Implement API Client
```javascript
// src/api/ai/newmodel.js
export class NewModelClient {
  async generateCaption(imageData, characterProfile) {
    const response = await fetch('https://api.newprovider.com/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEWMODEL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'newmodel-latest',
        prompt: this.buildPrompt(imageData, characterProfile),
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    return response.json();
  }

  buildPrompt(imageData, characterProfile) {
    return `Generate a social media caption for this image.
    Brand voice: ${characterProfile.voice}
    Target audience: ${characterProfile.target_audience}
    Content themes: ${characterProfile.content_themes.join(', ')}
    
    Image description: ${imageData.description}`;
  }
}
```

---

## 🎨 UI/UX Contribution Guidelines

### Design System
- Follow the **purple/black luxury theme**
- Use consistent **spacing and typography**
- Ensure **accessibility** (WCAG 2.1 AA)
- Maintain **mobile-first responsive design**

### Color Palette
```css
/* Primary Colors */
--purple-900: #581c87
--purple-800: #6b21a8
--purple-700: #7c3aed
--purple-600: #8b5cf6

/* Accent Colors */
--black: #000000
--gray-900: #111827
--gray-800: #1f2937
--white: #ffffff
```

### Component Guidelines
- Use **consistent spacing** (Tailwind spacing scale)
- Implement **hover and focus states**
- Add **loading and error states**
- Include **accessibility attributes**

---

## 📊 Performance Guidelines

### Optimization Checklist
- [ ] **Lazy load** components and images
- [ ] **Minimize bundle size** with tree shaking
- [ ] **Cache API responses** where appropriate
- [ ] **Optimize images** for web
- [ ] **Use efficient data structures**

### Performance Monitoring
```javascript
// Add performance monitoring
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});

observer.observe({ entryTypes: ['measure'] });
```

---

## 🚨 Security Guidelines

### Security Checklist
- [ ] **Never commit API keys** or secrets
- [ ] **Validate all user inputs**
- [ ] **Use HTTPS** for all API calls
- [ ] **Implement rate limiting**
- [ ] **Follow OAuth 2.0 best practices**

### Secure Coding Practices
```javascript
// Input validation
function validateCharacterFile(file) {
  if (!file || file.type !== 'application/json') {
    throw new Error('Invalid file type');
  }
  
  if (file.size > 1024 * 1024) { // 1MB limit
    throw new Error('File too large');
  }
  
  return true;
}

// Safe JSON parsing
function parseCharacterFile(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return sanitizeCharacterData(data);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
}
```

---

## 📚 Documentation Standards

### Documentation Types
- **API Documentation**: Document all endpoints and parameters
- **Component Documentation**: Include props, examples, and usage
- **User Guides**: Step-by-step instructions for end users
- **Developer Guides**: Technical implementation details

### Documentation Format
```markdown
## Component Name

### Description
Brief description of what the component does.

### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | Yes | - | The title to display |
| isVisible | boolean | No | true | Controls visibility |

### Example
```jsx
<ComponentName 
  title="Hello World" 
  isVisible={true} 
/>
```

### Notes
- Any additional implementation details
- Known limitations or considerations
```

---

## 🏆 Recognition

### Contributor Recognition
- **Contributors** are listed in our README
- **Major contributors** get special Discord roles
- **Outstanding contributions** are featured in our blog
- **Regular contributors** may be invited to become maintainers

### Contribution Types
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation
- 🎨 Design improvements
- 🔧 DevOps and tooling
- 💡 Ideas and discussions

---

## 📞 Getting Help

### Community Support
- **Discord**: [Join our community](https://discord.gg/lulu-ai)
- **GitHub Discussions**: [Ask questions](https://github.com/your-username/lulu-ai/discussions)
- **Email**: contributing@lulu-ai.com

### Maintainer Contact
- **Technical questions**: @maintainer-username
- **Design questions**: @design-lead-username
- **Documentation**: @docs-lead-username

---

## 📋 Contributor Checklist

Before submitting your contribution:

### Code Quality
- [ ] Code follows style guidelines
- [ ] Tests are added/updated
- [ ] Documentation is updated
- [ ] No linting errors
- [ ] Performance impact considered

### Functionality
- [ ] Feature works as expected
- [ ] Edge cases handled
- [ ] Error states implemented
- [ ] Accessibility tested
- [ ] Mobile responsiveness verified

### Process
- [ ] Issue linked to PR
- [ ] PR template completed
- [ ] Branch name follows convention
- [ ] Commit messages are clear
- [ ] Ready for review

---

<div align="center">

**Thank you for contributing to Lulu AI! 🎉**

Together, we're building the future of AI-powered social media management.

[← Back to README](../README.md) | [Setup Guide →](setup.md)

</div> 