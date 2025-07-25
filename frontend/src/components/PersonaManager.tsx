import React, { useState, useEffect } from 'react';
import { UserPlus, Save, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { luluService, CharacterPersona, PlatformStyle } from '../services/luluService';

const PersonaManager: React.FC = () => {
  const [personas, setPersonas] = useState<CharacterPersona[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPersona, setNewPersona] = useState<CharacterPersona>({
    name: '',
    tone: '',
    personality_traits: [],
    communication_style: '',
    platform_styles: [],
  });

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = async () => {
    try {
      const loadedPersonas = await luluService.getPersonas();
      setPersonas(loadedPersonas);
    } catch (error) {
      console.error('Error loading personas:', error);
    }
  };

  const handleCreatePersona = async () => {
    if (!newPersona.name || !newPersona.tone) return;

    try {
      await luluService.createPersona(newPersona);
      await loadPersonas();
      setIsCreating(false);
      setNewPersona({
        name: '',
        tone: '',
        personality_traits: [],
        communication_style: '',
        platform_styles: [],
      });
    } catch (error) {
      console.error('Error creating persona:', error);
    }
  };

  const handleAddPlatformStyle = () => {
    setNewPersona({
      ...newPersona,
      platform_styles: [
        ...newPersona.platform_styles,
        {
          platform: 'LinkedIn',
          focus: '',
          content_types: [],
          caption_style: '',
        },
      ],
    });
  };

  return (
    <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Character Personas</h2>
            <p className="text-gray-300">Manage your brand voice and personalities</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreating(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-semibold transition-all duration-200"
        >
          Create New Persona
        </motion.button>
      </div>

      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-white/5 border border-primary-500/20 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Create New Persona</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={newPersona.name}
                onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
                placeholder="e.g., Professional Lulu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
              <input
                type="text"
                value={newPersona.tone}
                onChange={(e) => setNewPersona({ ...newPersona, tone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
                placeholder="e.g., Professional yet approachable"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Communication Style</label>
              <textarea
                value={newPersona.communication_style}
                onChange={(e) => setNewPersona({ ...newPersona, communication_style: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
                rows={3}
                placeholder="e.g., Clear, direct, and inspiring with a touch of futuristic flair"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Personality Traits (comma-separated)
              </label>
              <input
                type="text"
                value={newPersona.personality_traits.join(', ')}
                onChange={(e) =>
                  setNewPersona({
                    ...newPersona,
                    personality_traits: e.target.value.split(',').map((t) => t.trim()),
                  })
                }
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
                placeholder="e.g., Sophisticated, Tech-savvy, Empowering"
              />
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreatePersona}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-semibold transition-all duration-200"
              >
                <Save className="h-5 w-5" />
                <span>Save Persona</span>
              </motion.button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white/5 border border-primary-500/20 rounded-xl hover:bg-white/10 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{persona.name}</h3>
            <p className="text-sm text-gray-300 mb-3">{persona.tone}</p>
            <p className="text-sm text-gray-400 mb-3">{persona.communication_style}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {persona.personality_traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs"
                >
                  {trait}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Edit2 className="h-4 w-4 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Trash2 className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PersonaManager;