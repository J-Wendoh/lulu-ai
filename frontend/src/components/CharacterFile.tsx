import React, { useState } from 'react';
import { 
  Bot, 
  Edit, 
  Save, 
  Upload,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CharacterFileProps {
  character?: {
    name: string;
    description: string;
    tone: string[];
    humor: string;
    platforms: string[];
    frequency: number;
    contentStyle: string[];
    personality: string;
    expertise: string[];
    values: string[];
  };
  onUpdate?: (character: any) => void;
}

const CharacterFile: React.FC<CharacterFileProps> = ({ character, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState(character || {
    name: 'Lulu AI',
    description: 'Professional AI social media manager with expertise in content creation and audience engagement',
    tone: ['Professional', 'Friendly', 'Inspirational'],
    humor: 'Witty and encouraging',
    platforms: ['LinkedIn', 'Instagram', 'Twitter'],
    frequency: 5,
    contentStyle: ['Educational Tips', 'Behind-the-scenes', 'Industry News'],
    personality: 'Enthusiastic, detail-oriented, and always learning. I love helping brands find their authentic voice and connect with their audience in meaningful ways.',
    expertise: ['Content Strategy', 'Social Media Marketing', 'Brand Voice Development', 'Audience Engagement'],
    values: ['Authenticity', 'Quality over Quantity', 'Continuous Learning', 'Community Building']
  });

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedCharacter);
    }
    setIsEditing(false);
  };

  const addItem = (field: string, item: string) => {
    if (item.trim()) {
      setEditedCharacter(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), item.trim()]
      }));
    }
  };

  const removeItem = (field: string, index: number) => {
    setEditedCharacter(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-400/50">
            <img 
              src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
              alt="Lulu AI"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Character File</h2>
            <p className="text-gray-300">AI Personality & Preferences</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors"
        >
          {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          <span>{isEditing ? 'Save' : 'Edit'}</span>
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedCharacter.name}
                onChange={(e) => setEditedCharacter(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
              />
            ) : (
              <p className="text-white font-medium">{editedCharacter.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            {isEditing ? (
              <textarea
                value={editedCharacter.description}
                onChange={(e) => setEditedCharacter(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none resize-none"
              />
            ) : (
              <p className="text-gray-300">{editedCharacter.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Personality</label>
            {isEditing ? (
              <textarea
                value={editedCharacter.personality}
                onChange={(e) => setEditedCharacter(prev => ({ ...prev, personality: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none resize-none"
              />
            ) : (
              <p className="text-gray-300">{editedCharacter.personality}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Humor Style</label>
            {isEditing ? (
              <input
                type="text"
                value={editedCharacter.humor}
                onChange={(e) => setEditedCharacter(prev => ({ ...prev, humor: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
              />
            ) : (
              <p className="text-gray-300">{editedCharacter.humor}</p>
            )}
          </div>
        </div>

        {/* Preferences & Settings */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tone & Voice</label>
            <div className="flex flex-wrap gap-2">
              {editedCharacter.tone?.map((tone, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{tone}</span>
                  {isEditing && (
                    <button 
                      onClick={() => removeItem('tone', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Platform Preferences</label>
            <div className="flex flex-wrap gap-2">
              {editedCharacter.platforms?.map((platform, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{platform}</span>
                  {isEditing && (
                    <button 
                      onClick={() => removeItem('platforms', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Content Style</label>
            <div className="flex flex-wrap gap-2">
              {editedCharacter.contentStyle?.map((style, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{style}</span>
                  {isEditing && (
                    <button 
                      onClick={() => removeItem('contentStyle', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Posting Frequency</label>
            {isEditing ? (
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="21"
                  value={editedCharacter.frequency}
                  onChange={(e) => setEditedCharacter(prev => ({ ...prev, frequency: parseInt(e.target.value) }))}
                  className="flex-1 h-2 bg-primary-500/20 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-primary-400 font-bold">{editedCharacter.frequency}/week</span>
              </div>
            ) : (
              <p className="text-white font-medium">{editedCharacter.frequency} posts per week</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Areas of Expertise</label>
            <div className="flex flex-wrap gap-2">
              {editedCharacter.expertise?.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button 
                      onClick={() => removeItem('expertise', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Core Values</label>
            <div className="flex flex-wrap gap-2">
              {editedCharacter.values?.map((value, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{value}</span>
                  {isEditing && (
                    <button 
                      onClick={() => removeItem('values', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-8 pt-8 border-t border-primary-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary-400" />
          <span>Performance Insights</span>
        </h3>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300">Posts Created</span>
            </div>
            <p className="text-2xl font-bold text-white">247</p>
            <p className="text-xs text-green-400">+12% this month</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm text-gray-300">Avg Engagement</span>
            </div>
            <p className="text-2xl font-bold text-white">4.2%</p>
            <p className="text-xs text-green-400">+0.8% this month</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-300">Consistency</span>
            </div>
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="text-xs text-green-400">On schedule</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-gray-300">AI Accuracy</span>
            </div>
            <p className="text-2xl font-bold text-white">94%</p>
            <p className="text-xs text-green-400">Brand voice match</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterFile;