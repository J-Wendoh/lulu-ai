import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Edit,
  Trash2,
  Clock,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Sparkles,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const posts = [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00',
      platform: 'LinkedIn',
      title: 'Weekly industry insights - AI in Social Media',
      content: 'Exploring how AI is revolutionizing social media management...',
      status: 'scheduled',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
      expectedEngagement: 'High',
      aiGenerated: true
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '15:30',
      platform: 'Instagram',
      title: 'Behind-the-scenes workspace',
      content: 'Behind the scenes at our workspace 🚀 Building the future...',
      status: 'scheduled',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
      expectedEngagement: 'Medium',
      aiGenerated: false
    },
    {
      id: 3,
      date: '2024-01-16',
      time: '09:00',
      platform: 'Twitter',
      title: 'Tech tips thread',
      content: 'Quick thread on productivity tips for startup founders 🧵',
      status: 'draft',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
      expectedEngagement: 'High',
      aiGenerated: true
    },
    {
      id: 4,
      date: '2024-01-17',
      time: '14:00',
      platform: 'Facebook',
      title: 'Company milestone celebration',
      content: 'Celebrating our latest milestone with the amazing team...',
      status: 'scheduled',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300',
      expectedEngagement: 'Medium',
      aiGenerated: false
    }
  ];

  const platformIcons = {
    LinkedIn: Linkedin,
    Instagram: Instagram,
    Twitter: Twitter,
    Facebook: Facebook
  };

  const platformColors = {
    LinkedIn: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    Instagram: 'text-pink-400 bg-pink-400/10 border-pink-400/30',
    Twitter: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
    Facebook: 'text-blue-500 bg-blue-500/10 border-blue-500/30'
  };

  const statusColors = {
    scheduled: 'text-green-400 bg-green-400/10 border-green-400/30',
    draft: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    published: 'text-blue-400 bg-blue-400/10 border-blue-400/30'
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPostsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return posts.filter(post => post.date === dateString);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const selectedDatePosts = getPostsForDate(selectedDate);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent mb-2">
            Content Calendar ✨
          </h1>
          <p className="text-xl text-gray-300">Plan and schedule your social media content with AI precision</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white/5 border border-primary-500/30 rounded-xl p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'month' 
                  ? 'bg-primary-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'week' 
                  ? 'bg-primary-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Week
            </button>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl font-semibold shadow-lg shadow-primary-500/25 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Create Post</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6 shadow-2xl"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-primary-400" />
                <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              </h2>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateMonth('prev')}
                  className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateMonth('next')}
                  className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                >
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </motion.button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center text-sm font-semibold text-gray-300 bg-white/5 rounded-lg">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              <AnimatePresence>
                {days.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    onClick={() => day && setSelectedDate(day)}
                    className={`min-h-[140px] p-3 border border-primary-500/10 rounded-xl cursor-pointer transition-all duration-200 ${
                      day ? 'hover:bg-white/5 hover:border-primary-400/30' : ''
                    } ${
                      selectedDate && day && selectedDate.toDateString() === day.toDateString()
                        ? 'bg-gradient-to-br from-primary-500/20 to-purple-500/20 border-primary-400/50 shadow-lg'
                        : 'bg-white/5'
                    }`}
                  >
                    {day && (
                      <>
                        <div className="text-sm font-semibold text-white mb-3 flex items-center justify-between">
                          <span>{day.getDate()}</span>
                          {getPostsForDate(day).length > 0 && (
                            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                          )}
                        </div>
                        <div className="space-y-2">
                          {getPostsForDate(day).slice(0, 2).map(post => {
                            const PlatformIcon = platformIcons[post.platform as keyof typeof platformIcons];
                            return (
                              <motion.div
                                key={post.id}
                                whileHover={{ scale: 1.02 }}
                                className={`text-xs p-2 rounded-lg border ${platformColors[post.platform as keyof typeof platformColors]} backdrop-blur-sm`}
                              >
                                <div className="flex items-center space-x-2 mb-1">
                                  <PlatformIcon className="h-3 w-3" />
                                  <span className="font-medium">{post.time}</span>
                                  {post.aiGenerated && (
                                    <Sparkles className="h-3 w-3 text-purple-400" />
                                  )}
                                </div>
                                <p className="truncate text-gray-300">{post.title}</p>
                              </motion.div>
                            );
                          })}
                          {getPostsForDate(day).length > 2 && (
                            <div className="text-xs text-primary-400 px-2 py-1 bg-primary-400/10 rounded-lg">
                              +{getPostsForDate(day).length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Posts */}
          {selectedDate && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary-400" />
                <span>{selectedDate.toLocaleDateString()}</span>
              </h3>
              
              {selectedDatePosts.length > 0 ? (
                <div className="space-y-4">
                  {selectedDatePosts.map(post => {
                    const PlatformIcon = platformIcons[post.platform as keyof typeof platformIcons];
                    return (
                      <motion.div 
                        key={post.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white/5 border border-primary-500/20 rounded-xl hover:border-primary-400/40 transition-all duration-200"
                      >
                        <div className="flex items-start space-x-3">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <PlatformIcon className={`h-4 w-4 ${platformColors[post.platform as keyof typeof platformColors].split(' ')[0]}`} />
                              <span className="text-sm font-semibold text-white">{post.platform}</span>
                              {post.aiGenerated && (
                                <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500/20 rounded-full">
                                  <Sparkles className="h-3 w-3 text-purple-400" />
                                  <span className="text-xs text-purple-300">AI</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-300 mb-2 line-clamp-2">{post.title}</p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3 text-gray-400" />
                                  <span className="text-gray-400">{post.time}</span>
                                </div>
                                <span className={`px-2 py-1 rounded-full ${statusColors[post.status as keyof typeof statusColors]}`}>
                                  {post.status}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-3 w-3 text-primary-400" />
                                <span className="text-primary-400">{post.expectedEngagement}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-primary-500/20">
                          <button className="flex-1 flex items-center justify-center space-x-1 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                            <Edit className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-400">Edit</span>
                          </button>
                          <button className="flex-1 flex items-center justify-center space-x-1 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors">
                            <Trash2 className="h-3 w-3 text-red-400" />
                            <span className="text-xs text-red-400">Delete</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No posts scheduled</p>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Add a post
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary-400" />
              <span>This Month</span>
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Scheduled Posts', value: '24', icon: Calendar, color: 'text-blue-400' },
                { label: 'Published', value: '18', icon: Eye, color: 'text-green-400' },
                { label: 'Drafts', value: '6', icon: Edit, color: 'text-orange-400' },
                { label: 'AI Generated', value: '12', icon: Sparkles, color: 'text-purple-400' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-sm text-gray-300">{stat.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Content Suggestions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary-400" />
              <span>AI Suggestions</span>
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Industry trend post',
                  description: 'Perfect for LinkedIn engagement',
                  platform: 'LinkedIn',
                  confidence: 'High'
                },
                {
                  title: 'Behind-the-scenes story',
                  description: 'Great for Instagram stories',
                  platform: 'Instagram',
                  confidence: 'Medium'
                },
                {
                  title: 'Quick tip thread',
                  description: 'Ideal for Twitter engagement',
                  platform: 'Twitter',
                  confidence: 'High'
                }
              ].map((suggestion, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 border border-primary-500/20 rounded-xl hover:border-primary-400/40 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-white group-hover:text-primary-300 transition-colors">
                      {suggestion.title}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      suggestion.confidence === 'High' 
                        ? 'bg-green-400/20 text-green-400' 
                        : 'bg-orange-400/20 text-orange-400'
                    }`}>
                      {suggestion.confidence}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{suggestion.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary-400">{suggestion.platform}</span>
                    <button className="text-xs text-primary-400 hover:text-primary-300 font-medium">
                      Create →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;