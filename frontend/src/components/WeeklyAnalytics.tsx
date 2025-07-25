import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Share2,
  Users,
  Calendar,
  Target,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

const WeeklyAnalytics: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', posts: 2, engagement: 145, reach: 1200, clicks: 34 },
    { day: 'Tue', posts: 1, engagement: 89, reach: 890, clicks: 23 },
    { day: 'Wed', posts: 3, engagement: 234, reach: 1450, clicks: 56 },
    { day: 'Thu', posts: 1, engagement: 123, reach: 980, clicks: 28 },
    { day: 'Fri', posts: 2, engagement: 189, reach: 1300, clicks: 45 },
    { day: 'Sat', posts: 1, engagement: 156, reach: 1100, clicks: 32 },
    { day: 'Sun', posts: 1, engagement: 98, reach: 750, clicks: 19 }
  ];

  const metrics = [
    {
      label: 'Total Reach',
      value: '8.67K',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-400'
    },
    {
      label: 'Engagement Rate',
      value: '4.2%',
      change: '+0.8%',
      trend: 'up',
      icon: ThumbsUp,
      color: 'text-green-400'
    },
    {
      label: 'New Followers',
      value: '47',
      change: '+23.1%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-400'
    },
    {
      label: 'Posts Published',
      value: '11',
      change: '+22.2%',
      trend: 'up',
      icon: Calendar,
      color: 'text-orange-400'
    }
  ];

  const topPosts = [
    {
      platform: 'LinkedIn',
      content: 'Sharing insights on the future of AI in social media...',
      engagement: 234,
      reach: 1450,
      date: 'Wed'
    },
    {
      platform: 'Instagram',
      content: 'Behind the scenes of our product development...',
      engagement: 189,
      reach: 1300,
      date: 'Fri'
    },
    {
      platform: 'Twitter',
      content: 'Quick thread on productivity tips for founders...',
      engagement: 156,
      reach: 1100,
      date: 'Sat'
    }
  ];

  const insights = [
    {
      icon: Target,
      title: 'Best Performing Day',
      description: 'Wednesday posts get 34% more engagement',
      action: 'Schedule more content on Wednesdays'
    },
    {
      icon: TrendingUp,
      title: 'Growing Audience',
      description: 'LinkedIn followers increased by 23% this week',
      action: 'Continue LinkedIn thought leadership'
    },
    {
      icon: Award,
      title: 'Content Quality',
      description: 'AI-generated posts have 18% higher engagement',
      action: 'Increase AI content ratio'
    }
  ];

  return (
    <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Weekly Analytics</h2>
          <p className="text-gray-300">Performance overview for the past 7 days</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Week of</p>
          <p className="text-white font-medium">Jan 8 - Jan 14, 2024</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white/5 border border-primary-500/20 rounded-xl hover:border-primary-400/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className={`h-8 w-8 ${metric.color}`} />
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
              <p className="text-sm text-gray-300">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Engagement Chart */}
        <div className="bg-white/5 border border-primary-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Daily Engagement</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
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
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Posts vs Reach */}
        <div className="bg-white/5 border border-primary-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Posts vs Reach</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #6C2DC7',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar dataKey="posts" fill="#6C2DC7" />
                <Bar dataKey="reach" fill="#A855F7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Performing Posts */}
        <div className="bg-white/5 border border-primary-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Posts</h3>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 border border-primary-500/20 rounded-lg hover:border-primary-400/40 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">
                      {post.platform}
                    </span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{post.engagement}</p>
                    <p className="text-xs text-gray-400">engagements</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 truncate">{post.content}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{post.reach}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{post.engagement}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white/5 border border-primary-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 border border-primary-500/20 rounded-lg hover:border-primary-400/40 transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <insight.icon className="h-5 w-5 text-primary-400 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-300 mb-2">{insight.description}</p>
                    <button className="text-xs text-primary-400 hover:text-primary-300 font-medium">
                      {insight.action} →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyAnalytics;