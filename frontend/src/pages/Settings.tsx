import React, { useState } from 'react';
import { 
  User, 
  Bot, 
  Bell, 
  Shield, 
  CreditCard, 
  Palette,
  Globe,
  Save,
  Upload,
  Trash2,
  Edit,
  Plus,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Check,
  X,
  Key,
  Sparkles
} from 'lucide-react';
import PersonaTemplates from '../components/PersonaTemplates';
import CharacterFile from '../components/CharacterFile';
import APIKeySettings from '../components/APIKeySettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    postApprovals: true,
    weeklyReports: true,
    engagementAlerts: false,
    systemUpdates: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'character', label: 'AI Character', icon: Bot },
    { id: 'personas', label: 'Persona Templates', icon: Sparkles },
    { id: 'platforms', label: 'Platforms', icon: Globe },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const platforms = [
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      connected: true, 
      color: 'text-blue-400',
      account: '@john.smith'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      connected: true, 
      color: 'text-pink-400',
      account: '@johnsmith'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      connected: false, 
      color: 'text-sky-400',
      account: null
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      connected: false, 
      color: 'text-blue-500',
      account: null
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-400/50">
                  <img 
                    src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Edit className="h-3 w-3 text-white" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">John Smith</h3>
                <p className="text-gray-300">Personal Brand</p>
                <button className="mt-2 text-sm text-primary-400 hover:text-primary-300">
                  Change Avatar
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="John Smith"
                  className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  defaultValue="Entrepreneur and tech enthusiast passionate about AI and innovation. Building the future one product at a time."
                  className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-xl text-white focus:border-primary-400 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 'character':
        return <CharacterFile />;

      case 'personas':
        return (
          <PersonaTemplates 
            onSelectTemplate={(template) => console.log('Selected template:', template)}
          />
        );

      case 'platforms':
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              {platforms.map(platform => (
                <div key={platform.name} className="p-6 bg-white/5 border border-primary-500/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <platform.icon className={`h-8 w-8 ${platform.color}`} />
                      <div>
                        <h3 className="font-semibold text-white">{platform.name}</h3>
                        {platform.connected ? (
                          <p className="text-sm text-gray-300">{platform.account}</p>
                        ) : (
                          <p className="text-sm text-gray-400">Not connected</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {platform.connected ? (
                        <>
                          <div className="flex items-center space-x-2 text-green-400">
                            <Check className="h-4 w-4" />
                            <span className="text-sm">Connected</span>
                          </div>
                          <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-primary-500/50 hover:border-primary-400 text-gray-300 hover:text-white rounded-xl transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Platform</span>
            </button>
          </div>
        );

      case 'api-keys':
        return <APIKeySettings />;

      case 'notifications':
        return (
          <div className="space-y-6">
            {Object.entries({
              'Post Approvals': 'Get notified when posts need your approval',
              'Weekly Reports': 'Receive weekly performance summaries',
              'Engagement Alerts': 'Alert when posts get high engagement',
              'System Updates': 'Notifications about new features and updates'
            }).map(([title, description], index) => {
              const key = title.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '') as keyof typeof notifications;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-primary-500/20 rounded-xl">
                  <div>
                    <h3 className="font-medium text-white">{title}</h3>
                    <p className="text-sm text-gray-300">{description}</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[key] ? 'bg-primary-500' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications[key] ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              );
            })}
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Growth Plan</h3>
                  <p className="text-gray-300">$79/month • Next billing: Jan 15, 2024</p>
                </div>
                <button className="px-4 py-2 border border-primary-500/50 hover:border-primary-400 text-gray-300 hover:text-white rounded-xl transition-colors">
                  Change Plan
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Platforms</p>
                  <p className="text-white font-medium">3 connected</p>
                </div>
                <div>
                  <p className="text-gray-400">Posts per week</p>
                  <p className="text-white font-medium">15</p>
                </div>
                <div>
                  <p className="text-gray-400">AI Features</p>
                  <p className="text-white font-medium">All included</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white/5 border border-primary-500/20 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-5 bg-blue-500 rounded"></div>
                  <div>
                    <p className="text-white">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-400">Expires 12/25</p>
                  </div>
                </div>
                <button className="text-primary-400 hover:text-primary-300">
                  Update
                </button>
              </div>
            </div>
            
            <div className="p-6 bg-white/5 border border-primary-500/20 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Invoices</h3>
              <div className="space-y-3">
                {[
                  { date: 'Dec 15, 2023', amount: '$79.00', status: 'Paid' },
                  { date: 'Nov 15, 2023', amount: '$79.00', status: 'Paid' },
                  { date: 'Oct 15, 2023', amount: '$79.00', status: 'Paid' }
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{invoice.date}</span>
                    <span className="text-white">{invoice.amount}</span>
                    <span className="text-green-400">{invoice.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-gradient-to-br from-dark-900 to-primary-900/20 border-2 border-primary-400 rounded-xl">
                  <div className="aspect-video bg-gradient-to-br from-dark-800 to-primary-800/30 rounded-lg mb-3"></div>
                  <p className="text-sm font-medium text-white">Dark (Current)</p>
                </button>
                <button className="p-4 bg-white border-2 border-gray-300 rounded-xl">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-purple-100 rounded-lg mb-3"></div>
                  <p className="text-sm font-medium text-gray-800">Light</p>
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Accent Color</h3>
              <div className="flex space-x-3">
                {[
                  { color: '#6C2DC7', name: 'Purple (Current)' },
                  { color: '#3B82F6', name: 'Blue' },
                  { color: '#10B981', name: 'Green' },
                  { color: '#F59E0B', name: 'Orange' }
                ].map((option, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 rounded-full border-2 ${
                      index === 0 ? 'border-white' : 'border-transparent hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: option.color }}
                    title={option.name}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-300">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-8">
              {renderTabContent()}
              
              {/* Save Button */}
              {activeTab !== 'character' && activeTab !== 'personas' && activeTab !== 'api-keys' && (
                <div className="flex justify-end mt-8 pt-6 border-t border-primary-500/20">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;