import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Share2,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const engagementData = [
    { name: 'Mon', posts: 4, engagement: 240, reach: 1200 },
    { name: 'Tue', posts: 3, engagement: 180, reach: 980 },
    { name: 'Wed', posts: 5, engagement: 320, reach: 1450 },
    { name: 'Thu', posts: 2, engagement: 150, reach: 800 },
    { name: 'Fri', posts: 4, engagement: 280, reach: 1300 },
    { name: 'Sat', posts: 3, engagement: 200, reach: 1100 },
    { name: 'Sun', posts: 2, engagement: 120, reach: 750 }
  ];

  const platformData = [
    { name: 'LinkedIn', value: 35, color: '#0077B5' },
    { name: 'Instagram', value: 28, color: '#E4405F' },
    { name: 'Twitter', value: 22, color: '#1DA1F2' },
    { name: 'Facebook', value: 15, color: '#1877F2' }
  ];

  const topPosts = [
    {
      id: 1,
      platform: 'LinkedIn',
      content: 'Sharing insights on the future of AI in social media management...',
      metrics: { likes: 234, comments: 45, shares: 67, reach: 2100 },
      date: '2024-01-14'
    },
    {
      id: 2,
      platform: 'Instagram',
      content: 'Behind the scenes of our product development process 🚀',
      metrics: { likes: 189, comments: 23, shares: 34, reach: 1850 },
      date: '2024-01-13'
    },
    {
      id: 3,
      platform: 'Twitter',
      content: 'Quick thread on productivity tips for startup founders...',
      metrics: { likes: 156, comments: 34, shares: 89, reach: 1650 },
      date: '2024-01-12'
    }
  ];

  const stats = [
    {
      label: 'Total Reach',
      value: '24.3K',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-400'
    },
    {
      label: 'Engagement Rate',
      value: '4.2%',
      change: '+0.8%',
      icon: ThumbsUp,
      color: 'text-green-400'
    },
    {
      label: 'New Followers',
      value: '142',
      change: '+23.1%',
      icon: Users,
      color: 'text-purple-400'
    },
    {
      label: 'Posts Published',
      value: '28',
      change: '+16.7%',
      icon: MessageSquare,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-300">Track your social media performance and insights</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-primary-500/30 text-white rounded-xl focus:border-primary-400 focus:outline-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-primary-500/30 text-white rounded-xl focus:border-primary-400 focus:outline-none"
          >
            <option value="all">All Platforms</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
          </select>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <span className="text-sm text-green-400 font-medium">{stat.change}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-300">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Engagement Trends */}
        <div className="lg:col-span-2">
          <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Engagement Trends</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                  <span className="text-gray-300">Engagement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Reach</span>
                </div>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #6C2DC7',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#6C2DC7" 
                    strokeWidth={3}
                    dot={{ fill: '#6C2DC7', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reach" 
                    stroke="#A855F7" 
                    strokeWidth={3}
                    dot={{ fill: '#A855F7', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="space-y-6">
          <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Platform Distribution</h2>
            
            <div className="h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #6C2DC7',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {platformData.map((platform, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="text-sm text-gray-300">{platform.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{platform.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Performing Time */}
          <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Best Times to Post</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">Weekdays</p>
                  <p className="text-xs text-gray-400">9:00 AM - 11:00 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-400">+24%</p>
                  <p className="text-xs text-gray-400">engagement</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">Weekends</p>
                  <p className="text-xs text-gray-400">2:00 PM - 4:00 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-400">+18%</p>
                  <p className="text-xs text-gray-400">engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Top Performing Posts</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-500/20">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Content</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Platform</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Engagement</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Reach</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, index) => (
                <tr key={post.id} className="border-b border-primary-500/10">
                  <td className="py-4 px-4">
                    <p className="text-sm text-white truncate max-w-xs">{post.content}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">
                      {post.platform}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-4 text-xs text-gray-300">
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{post.metrics.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.metrics.comments}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Share2 className="h-3 w-3" />
                        <span>{post.metrics.shares}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-white">{post.metrics.reach.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-300">{new Date(post.date).toLocaleDateString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;