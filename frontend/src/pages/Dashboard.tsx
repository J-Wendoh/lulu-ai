import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Clock,
  ThumbsUp,
  Eye,
  Share2,
  Plus,
  Image,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Sparkles,
  Zap,
  Target,
  Folder,
  FileText,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import PostPreviewCard from '../components/PostPreviewCard';
import LuluChat from '../components/LuluChat';
import PauseResumeToggle from '../components/PauseResumeToggle';
import WeeklyAnalytics from '../components/WeeklyAnalytics';

const Dashboard: React.FC = () => {
  const [isLuluActive, setIsLuluActive] = useState(true);
  const [pendingPosts, setPendingPosts] = useState([
    {
      id: 1,
      platform: 'LinkedIn',
      content: "🚀 Excited to share insights from our latest product launch! The journey of building something meaningful never stops inspiring me. What's driving your passion this week?\n\n#Innovation #Startup #TechLeadership #ProductLaunch",
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      scheduledTime: '2024-01-15T10:00:00',
      status: 'pending' as const,
      aiGenerated: true,
      engagement: {
        likes: 234,
        comments: 45,
        shares: 67,
        views: 2100
      }
    },
    {
      id: 2,
      platform: 'Instagram',
      content: "Behind the scenes at our workspace 🏢✨ Building the future, one line of code at a time. The energy here is absolutely incredible!\n\n#TechLife #Innovation #WorkspaceVibes #TeamWork #BuildingTheFuture",
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      scheduledTime: '2024-01-15T15:30:00',
      status: 'pending' as const,
      aiGenerated: true,
      engagement: {
        likes: 189,
        comments: 23,
        shares: 34,
        views: 1850
      }
    },
    {
      id: 3,
      platform: 'Twitter',
      content: "Quick thread on productivity tips for startup founders 🧵\n\n1/ Time blocking is everything\n2/ Delegate ruthlessly\n3/ Focus on high-impact activities\n4/ Take breaks (seriously!)\n\nWhat's your #1 productivity hack? 👇",
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
      scheduledTime: '2024-01-15T18:00:00',
      status: 'pending' as const,
      aiGenerated: true,
      engagement: {
        likes: 156,
        comments: 34,
        shares: 89,
        views: 1650
      }
    }
  ]);

  const stats = [
    { 
      label: 'Total Reach', 
      value: '24.3K', 
      change: '+12%', 
      icon: Eye, 
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/20'
    },
    { 
      label: 'Engagement', 
      value: '3.2K', 
      change: '+18%', 
      icon: ThumbsUp, 
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/20'
    },
    { 
      label: 'Followers', 
      value: '1.8K', 
      change: '+5%', 
      icon: Users, 
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-purple-600/20'
    },
    { 
      label: 'Posts This Week', 
      value: '12', 
      change: '+2', 
      icon: MessageSquare, 
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-orange-600/20'
    }
  ];

  const quickActions = [
    { 
      icon: Folder, 
      label: 'Content Library', 
      description: 'Manage photos & documents',
      color: 'from-blue-500 to-blue-600',
      count: '247 items'
    },
    { 
      icon: Calendar, 
      label: 'Content Calendar', 
      description: 'Schedule & plan posts',
      color: 'from-green-500 to-green-600',
      count: '12 scheduled'
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      description: 'Performance insights',
      color: 'from-purple-500 to-purple-600',
      count: '+24% growth'
    },
    { 
      icon: Image, 
      label: 'AI Generator', 
      description: 'Create visual content',
      color: 'from-orange-500 to-orange-600',
      count: 'Generate now'
    }
  ];

  const aiInsights = [
    {
      icon: TrendingUp,
      title: "Peak Engagement Time",
      description: "Your LinkedIn posts perform 24% better at 10 AM",
      action: "Schedule more content",
      color: "text-green-400"
    },
    {
      icon: Target,
      title: "Content Opportunity",
      description: "Tech leadership posts are trending in your network",
      action: "Create content",
      color: "text-blue-400"
    },
    {
      icon: Sparkles,
      title: "Engagement Boost",
      description: "Add more questions to increase comments by 40%",
      action: "Apply suggestion",
      color: "text-purple-400"
    }
  ];

  const handleApprove = (postId: number) => {
    setPendingPosts(posts => 
      posts.map(post => 
        post.id === postId ? { ...post, status: 'approved' as const } : post
      )
    );
  };

  const handleDecline = (postId: number) => {
    setPendingPosts(posts => 
      posts.map(post => 
        post.id === postId ? { ...post, status: 'declined' as const } : post
      )
    );
  };

  const handleEdit = (postId: number) => {
    console.log('Edit post:', postId);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent mb-2">
            Welcome back! ✨
          </h1>
          <p className="text-xl text-gray-300">Here's what Lulu has been crafting for your brand</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl font-semibold shadow-lg shadow-primary-500/25 transition-all duration-200"
        >
          <Plus className="h-5 w-5" />
          <span>Create Post</span>
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden p-6 bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl border border-primary-500/20 rounded-2xl group hover:border-primary-400/40 transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-right">
                <span className="text-sm text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-300">{stat.label}</p>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-10 translate-x-10" />
          </motion.div>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Quick Actions Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-6 bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl hover:border-primary-400/40 transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{action.label}</h3>
                  <p className="text-gray-300 text-sm mb-3">{action.description}</p>
                  <p className="text-primary-400 text-sm font-medium">{action.count}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pending Posts */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Posts Awaiting Your Approval</h2>
                <p className="text-gray-300">Lulu has crafted these posts based on your brand voice</p>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 rounded-xl">
                <Sparkles className="h-4 w-4 text-primary-400" />
                <span className="text-primary-300 font-medium">
                  {pendingPosts.filter(p => p.status === 'pending').length} pending
                </span>
              </div>
            </div>
            
            <div className="grid gap-6">
              {pendingPosts.filter(post => post.status === 'pending').map(post => (
                <PostPreviewCard
                  key={post.id}
                  post={post}
                  onApprove={handleApprove}
                  onDecline={handleDecline}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>

          {/* Weekly Analytics */}
          <WeeklyAnalytics />

          {/* AI Insights */}
          <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">AI Insights & Recommendations</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 border border-primary-500/20 rounded-xl hover:border-primary-400/40 transition-all duration-200"
                >
                  <insight.icon className={`h-6 w-6 ${insight.color} mb-3`} />
                  <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
                  <p className="text-sm text-gray-300 mb-3">{insight.description}</p>
                  <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">
                    {insight.action} →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Lulu Status Toggle */}
          <PauseResumeToggle
            isActive={isLuluActive}
            onToggle={setIsLuluActive}
            pendingPosts={pendingPosts.filter(p => p.status === 'pending').length}
            nextPostTime="10:00 AM"
          />

          {/* Lulu Chat */}
          <LuluChat />

          {/* Today's Schedule */}
          <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary-400" />
              <span>Today's Schedule</span>
            </h3>
            <div className="space-y-4">
              {[
                { 
                  time: '10:00 AM', 
                  platform: 'LinkedIn', 
                  title: 'Weekly industry insights post',
                  status: 'scheduled',
                  engagement: 'High expected'
                },
                { 
                  time: '3:30 PM', 
                  platform: 'Instagram', 
                  title: 'Behind-the-scenes content',
                  status: 'scheduled',
                  engagement: 'Medium expected'
                },
                { 
                  time: '6:00 PM', 
                  platform: 'Twitter', 
                  title: 'Tech tips thread',
                  status: 'draft',
                  engagement: 'High expected'
                },
              ].map((post, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 border border-primary-500/20 rounded-xl hover:border-primary-400/40 transition-all duration-200"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-semibold text-white">{post.time}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'scheduled' 
                          ? 'bg-green-400/20 text-green-400' 
                          : 'bg-orange-400/20 text-orange-400'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mb-1">{post.platform}</p>
                    <p className="text-xs text-gray-400 truncate">{post.title}</p>
                    <p className="text-xs text-primary-400">{post.engagement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { 
                  action: 'Posted to LinkedIn', 
                  time: '2 hours ago', 
                  status: 'success',
                  engagement: '+24 likes, 8 comments'
                },
                { 
                  action: 'Instagram story published', 
                  time: '4 hours ago', 
                  status: 'success',
                  engagement: '156 views, 12 reactions'
                },
                { 
                  action: 'Generated new content', 
                  time: '6 hours ago', 
                  status: 'pending',
                  engagement: 'Awaiting approval'
                }
              ].map((activity, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-400' : 
                    activity.status === 'pending' ? 'bg-orange-400' : 'bg-blue-400'
                  } animate-pulse`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                    <p className="text-xs text-primary-400">{activity.engagement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;