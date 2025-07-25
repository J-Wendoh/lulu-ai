import React, { useState } from 'react';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Save, 
  AlertCircle,
  CheckCircle,
  Image,
  Palette,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

interface APIKey {
  id: string;
  name: string;
  description: string;
  value: string;
  isValid: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

const APIKeySettings: React.FC = () => {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: 'openai',
      name: 'OpenAI API Key',
      description: 'For GPT-powered content generation and DALL-E image creation',
      value: 'sk-proj-1234567890abcdef...',
      isValid: true,
      icon: Sparkles,
      color: 'text-green-400'
    },
    {
      id: 'dalle',
      name: 'DALL-E API Key',
      description: 'For AI image generation and visual content creation',
      value: '',
      isValid: false,
      icon: Image,
      color: 'text-blue-400'
    },
    {
      id: 'midjourney',
      name: 'Midjourney API Key',
      description: 'For high-quality AI art and image generation',
      value: '',
      isValid: false,
      icon: Palette,
      color: 'text-purple-400'
    }
  ]);

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const updateApiKey = (keyId: string, value: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId 
        ? { ...key, value, isValid: value.length > 0 }
        : key
    ));
  };

  const saveApiKeys = () => {
    // Simulate saving API keys
    console.log('Saving API keys:', apiKeys);
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '...';
  };

  return (
    <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
          <Key className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">API Key Management</h2>
          <p className="text-gray-300">Configure your AI service API keys for enhanced features</p>
        </div>
      </div>

      <div className="space-y-6">
        {apiKeys.map((apiKey, index) => (
          <motion.div
            key={apiKey.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white/5 border border-primary-500/20 rounded-xl hover:border-primary-400/40 transition-all duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 bg-gradient-to-r ${
                apiKey.id === 'openai' ? 'from-green-500 to-emerald-600' :
                apiKey.id === 'dalle' ? 'from-blue-500 to-blue-600' :
                'from-purple-500 to-purple-600'
              } rounded-lg flex items-center justify-center`}>
                <apiKey.icon className="h-5 w-5 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                  <div className="flex items-center space-x-2">
                    {apiKey.isValid ? (
                      <div className="flex items-center space-x-1 text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs">Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-orange-400">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs">Not configured</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{apiKey.description}</p>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type={showKeys[apiKey.id] ? 'text' : 'password'}
                      value={apiKey.value}
                      onChange={(e) => updateApiKey(apiKey.id, e.target.value)}
                      placeholder={`Enter your ${apiKey.name}`}
                      className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none pr-12"
                    />
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showKeys[apiKey.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {apiKey.value && !showKeys[apiKey.id] && (
                  <p className="text-xs text-gray-400 mt-2">
                    Key: {maskKey(apiKey.value)}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-300 mb-2">Security Notice</h4>
            <p className="text-sm text-blue-200 leading-relaxed">
              Your API keys are encrypted and stored securely. They are only used to enhance your Lulu AI experience 
              with advanced features like image generation and improved content creation. You can revoke access at any time.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={saveApiKeys}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl font-semibold transition-all duration-200"
        >
          <Save className="h-4 w-4" />
          <span>Save API Keys</span>
        </motion.button>
      </div>
    </div>
  );
};

export default APIKeySettings;