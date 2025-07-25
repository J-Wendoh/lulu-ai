import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        '1 platform connection',
        '3 scheduled posts per week',
        'Basic AI support',
        'Content approval workflow',
        'Community support',
        '7-day content history'
      ],
      cta: 'Start Free',
      popular: false,
      highlight: 'No credit card required'
    },
    {
      name: 'Starter',
      price: 29,
      description: 'Perfect for individual creators',
      features: [
        '2 platform connections',
        '7 scheduled posts per week',
        'Enhanced AI support',
        'Content approval workflow',
        'Email support',
        '30-day content history',
        'Basic analytics'
      ],
      cta: 'Start 14-Day Trial',
      popular: false
    },
    {
      name: 'Growth',
      price: 79,
      description: 'Ideal for growing businesses',
      features: [
        '5 platform connections',
        '21 posts per week',
        'AI image generation',
        'Advanced analytics',
        'Priority support',
        'Custom brand voice',
        'Unlimited content history',
        'Comment reply suggestions'
      ],
      popular: true,
      cta: 'Start 14-Day Trial'
    },
    {
      name: 'Enterprise',
      price: 199,
      description: 'For agencies and large teams',
      features: [
        'Unlimited platforms',
        'Unlimited posts',
        'Team collaboration',
        'White-label option',
        'Dedicated support',
        'Custom integrations',
        'Advanced AI features',
        'Custom reporting'
      ],
      cta: 'Contact Sales'
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
            Simple Pricing
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our luxury AI features.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`relative p-6 lg:p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-primary-500/10 to-purple-500/10 border-primary-400/50 scale-105 shadow-2xl' 
                  : plan.name === 'Free'
                  ? 'bg-gradient-to-b from-green-500/10 to-emerald-500/10 border-green-400/50 shadow-xl'
                  : 'bg-glass backdrop-blur-xl border-primary-500/20 hover:border-primary-400/40 shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 lg:px-6 lg:py-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full text-xs lg:text-sm font-semibold text-white shadow-lg whitespace-nowrap">
                    Most Popular
                  </div>
                </div>
              )}

              {plan.name === 'Free' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 lg:px-6 lg:py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-xs lg:text-sm font-semibold text-white shadow-lg whitespace-nowrap">
                    Free Forever
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-4 lg:mb-6 text-sm lg:text-base">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-3xl lg:text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-300 text-base lg:text-lg">/month</span>
                </div>
                {plan.highlight && (
                  <p className="text-xs lg:text-sm text-green-400 font-medium">{plan.highlight}</p>
                )}
              </div>

              <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="h-4 w-4 lg:h-5 lg:w-5 text-primary-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm lg:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/onboarding"
                className={`block w-full py-3 lg:py-4 px-4 lg:px-6 rounded-xl font-semibold text-center transition-all duration-200 text-sm lg:text-base ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white shadow-lg'
                    : plan.name === 'Free'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-primary-500/30 hover:border-primary-400/50'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Free Plan Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full">
            <Check className="h-4 w-4 lg:h-5 lg:w-5 text-green-400 flex-shrink-0" />
            <span className="text-green-300 font-medium text-sm lg:text-base">
              No credit card required • Upgrade anytime • Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;