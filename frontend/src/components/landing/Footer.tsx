import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 px-4 py-8 lg:py-12 lg:px-8 border-t border-primary-500/20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4 lg:mb-6">
            <div className="w-48 h-12 lg:w-60 lg:h-14 xl:w-72 xl:h-16">
              <img 
                src="/ChatGPT Image Jul 2, 2025, 01_43_34 PM.png" 
                alt="Lulu AI Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-gray-400 mb-6 lg:mb-8 text-base lg:text-lg">
            The future of social media management. Intelligent. Automated. Luxurious.
          </p>
          <div className="flex justify-center space-x-6 lg:space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Support</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;