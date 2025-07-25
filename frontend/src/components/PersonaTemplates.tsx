import React, { useState } from 'react';
import { 
  Crown, 
  Briefcase, 
  Heart, 
  Sparkles, 
  Check,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PersonaTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  tone: string[];
  humor: string;
  platforms: string[];
  frequency: number;
  contentStyle: string[];
  samplePost: string;
}

interface PersonaTemplatesProps {
  onSelectTemplate: (template: PersonaTemplate) => void;
  selectedTemplate?: string;
}

const PersonaTemplates: React.FC<PersonaTemplatesProps> = ({ onSelectTemplate, selectedTemplate }) => {
  const templates: PersonaTemplate[] = [
    {
      id: 'professional-founder',
      name: 'Professional Founder',
      description: 'Authoritative thought leader sharing industry insights and business wisdom',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      tone: ['Professional', 'Authoritative', 'Inspirational'],
      humor: 'Subtle and sophisticated',
      platforms: ['LinkedIn', 'Twitter'],
      frequency: 5,
      contentStyle: ['Long-form Content', 'Industry News', 'Educational Tips'],
      samplePost: '🚀 After 10 years in tech, here\'s what I\'ve learned about building sustainable startups:\n\n1. Product-market fit isn\'t a destination, it\'s a journey\n2. Your team is your most valuable asset\n3. Customer feedback > personal opinions\n\nWhat would you add to this list? 👇\n\n#Entrepreneurship #StartupLife #Leadership'
    },
    {
      id: 'luxury-brand',
      name: 'Luxury Brand',
      description: 'Sophisticated and exclusive brand voice with premium positioning',
      icon: Crown,
      color: 'from-purple-500 to-pink-600',
      tone: ['Sophisticated', 'Exclusive', 'Aspirational'],
      humor: 'Witty and refined',
      platforms: ['Instagram', 'LinkedIn'],
      frequency: 4,
      contentStyle: ['Behind-the-scenes', 'Visual Storytelling', 'Lifestyle Content'],
      samplePost: '✨ Craftsmanship meets innovation in our latest collection.\n\nEvery detail tells a story of dedication, precision, and timeless elegance. From the initial sketch to the final masterpiece, we believe luxury isn\'t just about the product—it\'s about the experience.\n\nDiscover the art of excellence. 🎨\n\n#LuxuryLifestyle #Craftsmanship #Excellence'
    },
    {
      id: 'playful-coach',
      name: 'Playful Coach',
      description: 'Energetic and motivational coach with a fun, approachable personality',
      icon: Heart,
      color: 'from-orange-500 to-red-600',
      tone: ['Playful', 'Motivational', 'Friendly'],
      humor: 'Fun and encouraging',
      platforms: ['Instagram', 'TikTok', 'Facebook'],
      frequency: 7,
      contentStyle: ['Short & Punchy', 'Question-based Posts', 'Motivational Content'],
      samplePost: '🔥 Monday Motivation Alert! 🔥\n\nYour comfort zone called... I didn\'t answer! 😂\n\nHere\'s your challenge for this week:\n✅ Try ONE thing that scares you\n✅ Celebrate small wins\n✅ Share your progress with me!\n\nRemember: You\'re stronger than your excuses! 💪\n\nWhat\'s your scary-but-exciting goal? Drop it below! 👇\n\n#MondayMotivation #GrowthMindset #YouGotThis'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Choose Your Persona Template</h3>
        <p className="text-gray-300">Select a pre-built character that matches your brand voice</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              selectedTemplate === template.id
                ? 'border-primary-400 bg-primary-500/10 shadow-lg'
                : 'border-primary-500/30 hover:border-primary-400/50 bg-white/5'
            }`}
            onClick={() => onSelectTemplate(template)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}

            <div className={`w-16 h-16 bg-gradient-to-r ${template.color} rounded-2xl flex items-center justify-center mb-4`}>
              <template.icon className="h-8 w-8 text-white" />
            </div>

            <h4 className="text-xl font-bold text-white mb-2">{template.name}</h4>
            <p className="text-gray-300 text-sm mb-4">{template.description}</p>

            <div className="space-y-3 mb-4">
              <div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Tone</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {template.tone.map((tone, index) => (
                    <span key={index} className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded">
                      {tone}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Platforms</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {template.platforms.map((platform, index) => (
                    <span key={index} className="px-2 py-1 bg-primary-500/20 text-xs text-primary-300 rounded">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Frequency</span>
                <p className="text-sm text-white mt-1">{template.frequency} posts/week</p>
              </div>
            </div>

            <div className="border-t border-primary-500/20 pt-4">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Sample Post</span>
              <div className="mt-2 p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-300 line-clamp-4">{template.samplePost}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-primary-400 font-medium">
                {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
              </span>
              <ArrowRight className="h-4 w-4 text-primary-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PersonaTemplates;