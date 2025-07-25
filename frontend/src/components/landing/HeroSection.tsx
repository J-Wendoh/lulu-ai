import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Instagram, Linkedin, Twitter, Facebook, Youtube, MessageCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Lulu AI';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
          setTypedText('');
        }, 2000);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const socialIcons = [
    { Icon: Instagram, color: 'text-pink-400', delay: 0 },
    { Icon: Linkedin, color: 'text-blue-400', delay: 0.5 },
    { Icon: Twitter, color: 'text-sky-400', delay: 1 },
    { Icon: Facebook, color: 'text-blue-500', delay: 1.5 },
    { Icon: Youtube, color: 'text-red-400', delay: 2 },
    { Icon: MessageCircle, color: 'text-green-400', delay: 2.5 }
  ];

  return (
    <section className="relative z-10 px-4 py-8 lg:py-16 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Image and Title Side by Side with Separation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 mb-12 lg:mb-20">
          {/* Left - Lulu AI Image with Floating Icons */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex-shrink-0 order-2 lg:order-1 lg:w-2/5 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Main Lulu AI Image */}
              <div className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary-400/30 shadow-2xl">
                <img 
                  src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
                  alt="Lulu AI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent"></div>
              </div>

              {/* Chat Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6, type: "spring", stiffness: 200 }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 z-30"
              >
                <div className="relative">
                  <div className="bg-white rounded-2xl px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 shadow-2xl border border-gray-200 max-w-[280px] sm:max-w-xs lg:max-w-sm">
                    <p className="text-gray-800 font-medium text-xs sm:text-sm lg:text-base text-center leading-relaxed break-words">
                      Hey! I'm Lulu, ready to start our AI adventure? 🚀
                    </p>
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                  </div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0"
                  />
                </div>
              </motion.div>

              {/* Lulu AI Text Below Chat Bubble */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-28 sm:-bottom-32 lg:-bottom-36 left-1/2 transform -translate-x-1/2 text-center"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-400 flex items-center justify-center">
                  <span className="relative">
                    {typedText}
                    <span className="animate-pulse text-primary-300">|</span>
                  </span>
                </div>
              </motion.div>

              {/* Floating Social Media Icons */}
              {socialIcons.map(({ Icon, color, delay }, index) => {
                const positions = [
                  { top: '10%', left: '80%' },
                  { top: '25%', right: '85%' },
                  { top: '45%', left: '85%' },
                  { bottom: '35%', right: '80%' },
                  { bottom: '15%', left: '75%' },
                  { top: '60%', right: '90%' }
                ];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      delay: delay,
                      duration: 0.6,
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    className="absolute z-20 hidden sm:block"
                    style={positions[index]}
                  >
                    <div className="relative group">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-glass backdrop-blur-xl border border-primary-500/30 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <Icon className={`h-5 w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 ${color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Glowing Aura Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>
          </motion.div>

          {/* Fancy Separation Line */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="hidden lg:flex flex-col items-center justify-center h-80 xl:h-96 mx-4 xl:mx-8 order-2"
          >
            <div className="relative">
              <div className="w-1 h-80 xl:h-96 bg-gradient-to-b from-transparent via-primary-400 to-transparent relative">
                <div className="absolute inset-0 w-1 bg-gradient-to-b from-transparent via-primary-400 to-transparent blur-sm"></div>
                <div className="absolute inset-0 w-2 bg-gradient-to-b from-transparent via-primary-400/50 to-transparent blur-md transform -translate-x-0.5"></div>
                
                <motion.div
                  animate={{ y: [0, 320, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-3 h-3 bg-primary-400 rounded-full shadow-lg transform -translate-x-1"
                >
                  <div className="absolute inset-0 bg-primary-400 rounded-full blur-sm animate-pulse"></div>
                </motion.div>
                
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-primary-400 rounded-full"></div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="h-6 w-6 text-primary-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Title with Rocket */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-right order-1 lg:order-3 lg:w-2/5 flex justify-center lg:justify-end"
          >
            <div className="max-w-2xl">
              <div className="flex items-center justify-center lg:justify-end space-x-2 mb-4 lg:mb-6">
                <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-primary-400 flex-shrink-0" />
                <span className="px-2 py-1 lg:px-3 lg:py-1 xl:px-4 xl:py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300 text-xs lg:text-sm font-medium whitespace-nowrap">
                  Free Forever Plan Available
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-6 lg:mb-8 break-words">
                <span className="text-white">Where </span>
                <span className="relative block lg:inline">
                  <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Digital Marketing
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 opacity-20 blur-xl animate-pulse"></div>
                </span>
                <br />
                <span className="text-white">is a </span>
                <span className="relative block lg:inline">
                  <span className="bg-gradient-to-r from-purple-400 to-primary-400 bg-clip-text text-transparent">
                    Super Power
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-primary-400 opacity-30 blur-lg"></div>
                </span>
                <span className="ml-2 lg:ml-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">🚀</span>
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Content and Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center space-y-6 lg:space-y-8"
        >
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto px-4 break-words">
            Lulu AI creates, schedules, and manages your social media presence with 
            <span className="text-primary-400 font-semibold"> character-driven personalization</span>. 
            Start free and let luxury-grade AI handle the posting while you focus on building your empire.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center px-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/onboarding"
                className="group px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl font-semibold text-sm lg:text-base xl:text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl shadow-primary-500/25 whitespace-nowrap"
              >
                <span>Start Free Forever</span>
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Link>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-6 py-3 lg:px-8 lg:py-4 border-2 border-primary-500/50 hover:border-primary-400 rounded-xl font-semibold text-sm lg:text-base xl:text-lg transition-all duration-300 flex items-center justify-center space-x-3 backdrop-blur-sm whitespace-nowrap"
            >
              <Play className="h-4 w-4 lg:h-5 lg:w-5 text-primary-400 flex-shrink-0" />
              <span>Watch Demo</span>
            </motion.button>
            
            {/* Bolt.new Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl font-semibold text-sm lg:text-base xl:text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl shadow-orange-500/25 whitespace-nowrap"
              >
                <Zap className="h-4 w-4 lg:h-5 lg:w-5 text-white flex-shrink-0" />
                <span>Built on bolt.new</span>
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </a>
            </motion.div>
          </div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative max-w-5xl mx-auto mt-12 lg:mt-16 px-4"
          >
            <div className="relative bg-glass backdrop-blur-xl border border-primary-500/20 rounded-3xl p-4 lg:p-6 xl:p-8 shadow-2xl">
              <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
                {/* Sample Post Preview */}
                <div className="md:col-span-2 bg-white/5 border border-primary-500/20 rounded-2xl p-4 lg:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs lg:text-sm font-bold">in</span>
                    </div>
                    <span className="text-xs lg:text-sm font-medium text-white">LinkedIn</span>
                    <span className="px-2 py-1 bg-green-400/20 text-green-400 rounded-full text-xs whitespace-nowrap">Scheduled</span>
                  </div>
                  <img 
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" 
                    alt="Sample post"
                    className="w-full h-24 lg:h-32 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-300 text-xs lg:text-sm leading-relaxed break-words">
                    🚀 Excited to share insights from our latest product launch! The journey of building something meaningful never stops inspiring me...
                  </p>
                </div>
                
                {/* AI Chat Preview */}
                <div className="bg-white/5 border border-primary-500/20 rounded-2xl p-3 lg:p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
                        alt="Lulu AI"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs lg:text-sm font-medium text-white">Lulu AI</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-primary-500/20 p-2 lg:p-3 rounded-lg">
                      <p className="text-xs text-gray-300 break-words">✨ I've prepared 3 posts for approval. Your engagement is up 24% this week!</p>
                    </div>
                    <div className="bg-white/10 p-2 lg:p-3 rounded-lg">
                      <p className="text-xs text-gray-300 break-words">Show me the posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;