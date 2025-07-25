import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Image, 
  Calendar,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  type: 'user' | 'lulu';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const LuluChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'lulu',
      content: "✨ Good morning! I've prepared 3 new posts for your approval. Your LinkedIn engagement is up 24% this week - shall we capitalize on this momentum with more thought leadership content?",
      timestamp: new Date(),
      suggestions: [
        "Show me the posts",
        "Create more LinkedIn content",
        "Weekly report please"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: Image, label: 'Generate Post', color: 'text-purple-400' },
    { icon: Calendar, label: 'Schedule Content', color: 'text-blue-400' },
    { icon: TrendingUp, label: 'Analytics', color: 'text-green-400' },
    { icon: MessageSquare, label: 'Reply Suggestions', color: 'text-orange-400' }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Lulu's response
    setTimeout(() => {
      const luluResponse: Message = {
        id: messages.length + 2,
        type: 'lulu',
        content: "I understand! Let me work on that for you. I'll analyze your recent performance and create content that matches your brand voice perfectly. ✨",
        timestamp: new Date(),
        suggestions: [
          "Perfect, proceed",
          "Adjust the tone",
          "Show me options"
        ]
      };
      setMessages(prev => [...prev, luluResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="h-full flex flex-col bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-primary-500/20 bg-gradient-to-r from-primary-500/10 to-purple-500/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-400/50">
              <img 
                src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
                alt="Lulu AI"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900 animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Lulu AI</h3>
            <p className="text-xs text-gray-300">Your Social Media Manager</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                {message.type === 'lulu' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-400/30 flex-shrink-0">
                    <img 
                      src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
                      alt="Lulu AI"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className={`px-4 py-3 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white/10 text-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-400/30">
                <img 
                  src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
                  alt="Lulu AI"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white/10 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-primary-500/20">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex items-center space-x-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-xs"
            >
              <action.icon className={`h-4 w-4 ${action.color}`} />
              <span className="text-gray-300">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Lulu anything..."
              className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none pr-12"
            />
            <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="p-3 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl transition-all duration-200"
          >
            <Send className="h-5 w-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LuluChat;