import React from 'react';
import { Bot, Calendar, BarChart3, Shield, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI Character Profiles',
      description: 'Create personalized AI that matches your brand voice and personality with luxury-grade precision'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Automated posting with intelligent timing and platform optimization for maximum engagement'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Deep insights into engagement, reach, and audience behavior with beautiful visualizations'
    },
    {
      icon: Shield,
      title: 'Approval Workflow',
      description: 'Review and approve all content before it goes live with elegant preview interfaces'
    },
    {
      icon: Users,
      title: 'Multi-Platform',
      description: 'Manage LinkedIn, Instagram, X, Facebook, and more from one luxurious dashboard'
    },
    {
      icon: Zap,
      title: 'AI-Generated Content',
      description: 'Create engaging posts, captions, and visuals automatically with cutting-edge AI'
    }
  ];

  return (
    <section className="relative z-10 px-4 py-16 lg:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to automate and optimize your social media presence with luxury-grade precision
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 lg:p-8 bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl hover:border-primary-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <div className="mb-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                  <feature.icon className="h-6 w-6 lg:h-8 lg:w-8 text-primary-400" />
                </div>
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-4 text-white group-hover:text-primary-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;