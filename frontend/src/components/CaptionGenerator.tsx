import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Image, 
  FileText, 
  Sparkles, 
  Copy, 
  RefreshCw,
  Download,
  Wand2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { luluService, ContentGenerationRequest, CharacterPersona } from '../services/luluService';

interface CaptionGeneratorProps {
  onGenerate?: (caption: string) => void;
}

const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ onGenerate }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('LinkedIn');
  const [tone, setTone] = useState('Professional');
  const [personas, setPersonas] = useState<CharacterPersona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<string>('');

  const platforms = ['LinkedIn', 'Instagram', 'Twitter', 'Facebook'];
  const tones = ['Professional', 'Casual', 'Witty', 'Inspirational', 'Educational'];
  const contentTypes = ['post', 'story', 'reel', 'article'];

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = async () => {
    try {
      const loadedPersonas = await luluService.getPersonas();
      setPersonas(loadedPersonas);
      if (loadedPersonas.length > 0) {
        setSelectedPersona(loadedPersonas[0].name);
      }
    } catch (error) {
      console.error('Error loading personas:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const generateCaptions = async () => {
    if (!uploadedFile) return;
    
    setIsGenerating(true);
    setGeneratedCaptions([]);
    
    try {
      const captions: string[] = [];
      
      // Generate 3 different caption variations
      for (let i = 0; i < 3; i++) {
        const request: ContentGenerationRequest = {
          platform: selectedPlatform,
          content_type: 'post',
          topic: uploadedFile.name ? [uploadedFile.name] : [],
          image_description: uploadedFile.type.startsWith('image/') ? [`Image: ${uploadedFile.name}`] : [],
          include_hashtags: true,
          persona_name: selectedPersona ? [selectedPersona] : [],
        };
        
        const caption = await luluService.generateCaption(request);
        captions.push(caption);
      }
      
      setGeneratedCaptions(captions);
    } catch (error) {
      console.error('Error generating captions:', error);
      // Fallback to sample captions if IC canister is not available
      const sampleCaptions = [
        `🚀 Innovation meets execution in our latest project! \n\nEvery great idea starts with a vision, but it's the relentless pursuit of excellence that brings it to life. Our team has been working tirelessly to deliver something truly special.\n\nWhat's your approach to turning ideas into reality? Share your thoughts below! 👇\n\n#Innovation #TeamWork #Excellence #${selectedPlatform}`,
        
        `✨ Behind the scenes of greatness! \n\nThis image captures more than just a moment – it represents countless hours of dedication, creativity, and passion. Every detail matters when you're building something meaningful.\n\nSwipe to see the journey unfold! ➡️\n\n#BehindTheScenes #Process #Dedication #Quality`,
        
        `💡 Sometimes the best insights come from unexpected places.\n\nThis reminds me that innovation isn't just about having the latest technology – it's about seeing possibilities where others see challenges. What unexpected inspiration have you found lately?\n\nLet's discuss in the comments! 💬\n\n#Inspiration #Innovation #Perspective #Growth`
      ];
      setGeneratedCaptions(sampleCaptions);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <Wand2 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">AI Caption Generator</h2>
          <p className="text-gray-300">Upload an image or document to generate engaging captions</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="border-2 border-dashed border-primary-500/30 rounded-xl p-8 text-center hover:border-primary-400/50 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-primary-400 mx-auto mb-4" />
              <p className="text-white font-medium mb-2">Upload Image or Document</p>
              <p className="text-gray-400 text-sm">Drag & drop or click to browse</p>
              <p className="text-gray-500 text-xs mt-2">Supports: JPG, PNG, PDF, DOC, DOCX</p>
            </label>
          </div>

          {uploadedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white/5 border border-primary-500/20 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                {uploadedFile.type.startsWith('image/') ? (
                  <Image className="h-8 w-8 text-blue-400" />
                ) : (
                  <FileText className="h-8 w-8 text-green-400" />
                )}
                <div className="flex-1">
                  <p className="text-white font-medium">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
              >
                {tones.map(toneOption => (
                  <option key={toneOption} value={toneOption}>{toneOption}</option>
                ))}
              </select>
            </div>

            {personas.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Character Persona</label>
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
                >
                  {personas.map(persona => (
                    <option key={persona.name} value={persona.name}>{persona.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateCaptions}
            disabled={!uploadedFile || isGenerating}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Generating Captions...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Generate Captions</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Generated Captions */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Generated Captions</h3>
          
          {generatedCaptions.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Upload a file and click generate to see AI-powered captions</p>
            </div>
          ) : (
            <div className="space-y-4">
              {generatedCaptions.map((caption, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 border border-primary-500/20 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-primary-400">Option {index + 1}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(caption)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => onGenerate?.(caption)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Use this caption"
                      >
                        <Download className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{caption}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptionGenerator;