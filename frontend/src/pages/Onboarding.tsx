import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  User, 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  Upload,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Crown,
  Sparkles
} from 'lucide-react';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    plan: 'free',
    brandType: '',
    name: '',
    description: '',
    tone: [] as string[],
    frequency: 3,
    platforms: [] as string[],
    style: [] as string[]
  });

  const steps = [
    { id: 1, title: 'Choose Plan', description: 'Select your pricing tier' },
    { id: 2, title: 'Brand Type', description: 'Tell us about your brand' },
    { id: 3, title: 'Profile Setup', description: 'Create your character profile' },
    { id: 4, title: 'Preferences', description: 'Set your posting preferences' },
    { id: 5, title: 'Platforms', description: 'Connect your social accounts' },
    { id: 6, title: 'Complete', description: 'Finalize your setup' }
  ];

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        '1 platform connection',
        '3 scheduled posts per week',
        'Basic AI support',
        'Content approval workflow',
        'Community support'
      ],
      highlight: 'No credit card required',
      color: 'from-green-500 to-emerald-600',
      icon: Sparkles
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      description: 'Perfect for individual creators',
      features: [
        '2 platform connections',
        '7 scheduled posts per week',
        'Enhanced AI support',
        'Email support',
        'Basic analytics'
      ],
      color: 'from-blue-500 to-blue-600',
      icon: User
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 79,
      description: 'Ideal for growing businesses',
      features: [
        '5 platform connections',
        '21 posts per week',
        'AI image generation',
        'Advanced analytics',
        'Priority support'
      ],
      popular: true,
      color: 'from-primary-500 to-purple-600',
      icon: Crown
    }
  ];

  const toneOptions = [
    'Professional', 'Witty', 'Friendly', 'Authoritative', 
    'Playful', 'Inspirational', 'Educational', 'Humorous'
  ];

  const styleOptions = [
    'Short & Punchy', 'Long-form Content', 'Question-based Posts',
    'Behind-the-scenes', 'Educational Tips', 'Industry News'
  ];

  const platforms = [
    { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-400' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-400' },
    { name: 'Twitter', icon: Twitter, color: 'text-sky-400' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-500' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/app');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSelection = (value: string, field: 'tone' | 'platforms' | 'style') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const getFrequencyLimit = () => {
    switch (formData.plan) {
      case 'free': return 3;
      case 'starter': return 7;
      case 'growth': return 21;
      default: return 3;
    }
  };

  const getPlatformLimit = () => {
    switch (formData.plan) {
      case 'free': return 1;
      case 'starter': return 2;
      case 'growth': return 5;
      default: return 1;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
              <p className="text-gray-300">Start free and upgrade anytime as you grow</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setFormData(prev => ({ ...prev, plan: plan.id }))}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                    formData.plan === plan.id
                      ? 'border-primary-400 bg-primary-500/10 scale-105'
                      : 'border-primary-500/30 hover:border-primary-400/50'
                  } ${plan.popular ? 'ring-2 ring-primary-400/50' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full text-xs font-semibold text-white">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  {plan.id === 'free' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-xs font-semibold text-white">
                        Free Forever
                      </div>
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-300">/month</span>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                  
                  {plan.highlight && (
                    <p className="text-sm text-green-400 font-medium mb-4">{plan.highlight}</p>
                  )}
                  
                  <ul className="space-y-2 text-sm text-gray-300">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">What type of brand are you setting up?</h2>
              <p className="text-gray-300">This helps Lulu understand your voice and audience</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={() => setFormData(prev => ({ ...prev, brandType: 'personal' }))}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                  formData.brandType === 'personal'
                    ? 'border-primary-400 bg-primary-500/10'
                    : 'border-primary-500/30 hover:border-primary-400/50'
                }`}
              >
                <User className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Personal Brand</h3>
                <p className="text-gray-300">For creators, influencers, and personal brands</p>
              </button>
              
              <button
                onClick={() => setFormData(prev => ({ ...prev, brandType: 'business' }))}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                  formData.brandType === 'business'
                    ? 'border-primary-400 bg-primary-500/10'
                    : 'border-primary-500/30 hover:border-primary-400/50'
                }`}
              >
                <Building2 className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Business Brand</h3>
                <p className="text-gray-300">For companies, startups, and organizations</p>
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Create Your Character Profile</h2>
              <p className="text-gray-300">Help Lulu understand your unique voice and style</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {formData.brandType === 'personal' ? 'Your Name' : 'Company Name'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none transition-colors"
                  placeholder={formData.brandType === 'personal' ? 'Enter your name' : 'Enter company name'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none transition-colors resize-none"
                  placeholder={`Describe your ${formData.brandType === 'personal' ? 'background, expertise, and what you share' : 'company, mission, and what you offer'}...`}
                />
              </div>
              
              <div className="p-6 border-2 border-dashed border-primary-500/30 rounded-xl text-center hover:border-primary-400/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-primary-400 mx-auto mb-2" />
                <p className="text-gray-300">Upload additional documents or media</p>
                <p className="text-sm text-gray-400 mt-1">Drag & drop files or click to browse</p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Set Your Posting Preferences</h2>
              <p className="text-gray-300">Customize how Lulu creates and schedules content</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Tone & Voice</h3>
                <div className="grid grid-cols-2 gap-3">
                  {toneOptions.map(tone => (
                    <button
                      key={tone}
                      onClick={() => toggleSelection(tone, 'tone')}
                      className={`p-3 rounded-xl border transition-all duration-200 ${
                        formData.tone.includes(tone)
                          ? 'border-primary-400 bg-primary-500/20 text-primary-300'
                          : 'border-primary-500/30 text-gray-300 hover:border-primary-400/50'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Content Style</h3>
                <div className="space-y-3">
                  {styleOptions.map(style => (
                    <button
                      key={style}
                      onClick={() => toggleSelection(style, 'style')}
                      className={`w-full p-3 rounded-xl border text-left transition-all duration-200 ${
                        formData.style.includes(style)
                          ? 'border-primary-400 bg-primary-500/20 text-primary-300'
                          : 'border-primary-500/30 text-gray-300 hover:border-primary-400/50'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Posting Frequency</h3>
              <div className="p-6 bg-glass backdrop-blur-xl border border-primary-500/20 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">Posts per week</span>
                  <span className="text-2xl font-bold text-primary-400">{formData.frequency}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={getFrequencyLimit()}
                  value={formData.frequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, frequency: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-primary-500/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>1</span>
                  <span>{getFrequencyLimit()}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  {formData.plan === 'free' && 'Upgrade to increase posting frequency'}
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Connect Your Platforms</h2>
              <p className="text-gray-300">Choose which social media accounts Lulu should manage</p>
              <p className="text-sm text-primary-400 mt-2">
                Your {formData.plan} plan allows {getPlatformLimit()} platform{getPlatformLimit() > 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {platforms.map(platform => {
                const isSelected = formData.platforms.includes(platform.name);
                const canSelect = formData.platforms.length < getPlatformLimit() || isSelected;
                
                return (
                  <div
                    key={platform.name}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-primary-400 bg-primary-500/10'
                        : canSelect
                        ? 'border-primary-500/30 hover:border-primary-400/50'
                        : 'border-gray-600/30 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => canSelect && toggleSelection(platform.name, 'platforms')}
                  >
                    <div className="flex items-center space-x-4">
                      <platform.icon className={`h-8 w-8 ${platform.color}`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                        <p className="text-sm text-gray-400">
                          {isSelected ? 'Selected' : canSelect ? 'Click to connect' : 'Upgrade to connect'}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">
                You can add more platforms later by upgrading your plan
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8 max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-4 border-primary-400/50">
              <img 
                src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
                alt="Lulu AI"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to Lulu AI!</h2>
              <p className="text-xl text-gray-300 mb-8">
                Your AI social media manager is ready to start creating amazing content for you.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-glass backdrop-blur-xl border border-primary-500/20 rounded-xl">
                <h3 className="font-semibold text-white mb-2">Your Plan</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Plan: {formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)}</li>
                  <li>• Posts: {formData.frequency}/week</li>
                  <li>• Platforms: {formData.platforms.length} connected</li>
                </ul>
              </div>
              
              <div className="p-6 bg-glass backdrop-blur-xl border border-primary-500/20 rounded-xl">
                <h3 className="font-semibold text-white mb-2">Next Steps</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Review your first scheduled posts</li>
                  <li>• Upload media to your content library</li>
                  <li>• Set up your content calendar</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900/20 px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-center mb-8">
          <div className="w-32 h-8">
            <img 
              src="/ChatGPT Image Jul 2, 2025, 01_43_34 PM.png" 
              alt="Lulu AI Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= step.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/10 text-gray-400'
              }`}>
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-primary-500' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h1 className="text-lg font-medium text-gray-300">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
          </h1>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-6xl mx-auto">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto mt-12 flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            currentStep === 1
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-300 hover:text-white border border-primary-500/30 hover:border-primary-400/50'
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={
            (currentStep === 1 && !formData.plan) ||
            (currentStep === 2 && !formData.brandType) ||
            (currentStep === 3 && (!formData.name || !formData.description)) ||
            (currentStep === 4 && formData.tone.length === 0) ||
            (currentStep === 5 && formData.platforms.length === 0)
          }
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-200"
        >
          <span>{currentStep === steps.length ? 'Complete Setup' : 'Continue'}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;