import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-dark-900/70 backdrop-blur-xl border-b border-primary-500/20 px-4 py-3 lg:px-8 lg:py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <div className="w-48 h-12 lg:w-60 lg:h-14 xl:w-72 xl:h-16">
            <img 
              src="/ChatGPT Image Jul 2, 2025, 01_43_34 PM.png" 
              alt="Lulu AI Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/onboarding"
            className="px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-primary-500/25 text-sm lg:text-base whitespace-nowrap"
          >
            Get Started Free
          </Link>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;