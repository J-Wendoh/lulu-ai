import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Clock, 
  Calendar,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
  id: number;
  platform: string;
  content: string;
  image: string;
  scheduledTime: string;
  status: 'pending' | 'approved' | 'declined' | 'scheduled';
  aiGenerated: boolean;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

interface PostPreviewProps {
  posts: Post[];
  onApprove: (id: number) => void;
  onDecline: (id: number) => void;
  onEdit: (id: number) => void;
}

const PostPreview: React.FC<PostPreviewProps> = ({ posts, onApprove, onDecline, onEdit }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'scheduled':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'declined':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'pending':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn':
        return 'text-blue-400 bg-blue-400/10';
      case 'Instagram':
        return 'text-pink-400 bg-pink-400/10';
      case 'Twitter':
        return 'text-sky-400 bg-sky-400/10';
      case 'Facebook':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Upcoming Scheduled Posts</h2>
          <p className="text-gray-300">Review and approve AI-generated content before it goes live</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 rounded-xl">
          <Sparkles className="h-4 w-4 text-primary-400" />
          <span className="text-primary-300 font-medium">
            {posts.filter(p => p.status === 'pending').length} pending approval
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}
              className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl overflow-hidden hover:border-primary-400/40 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {/* Header */}
              <div className="p-4 border-b border-primary-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(post.platform)}`}>
                      {post.platform}
                    </span>
                    {post.aiGenerated && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500/20 rounded-full">
                        <Sparkles className="h-3 w-3 text-purple-400" />
                        <span className="text-xs text-purple-300">AI</span>
                      </div>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(post.scheduledTime).toLocaleDateString()} at {new Date(post.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-4">
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="Post preview"
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Engagement Preview */}
              {post.engagement && (
                <div className="px-4 pb-4">
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-3 w-3" />
                      <span>{post.engagement.shares}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.engagement.views}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              {post.status === 'pending' && (
                <div className="p-4 border-t border-primary-500/20 bg-white/5">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove(post.id);
                      }}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors text-sm"
                    >
                      <CheckCircle className="h-3 w-3" />
                      <span>Approve</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(post.id);
                      }}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-3 w-3" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDecline(post.id);
                      }}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    >
                      <XCircle className="h-3 w-3" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detailed Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-900 border border-primary-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Post Preview</h3>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <XCircle className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlatformColor(selectedPost.platform)}`}>
                      {selectedPost.platform}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedPost.status)}`}>
                      {selectedPost.status}
                    </span>
                    {selectedPost.aiGenerated && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500/20 rounded-full">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-purple-300">AI Generated</span>
                      </div>
                    )}
                  </div>

                  {selectedPost.image && (
                    <img 
                      src={selectedPost.image} 
                      alt="Post preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Caption</h4>
                    <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                      {selectedPost.content}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Scheduled for {new Date(selectedPost.scheduledTime).toLocaleDateString()} at {new Date(selectedPost.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  {selectedPost.status === 'pending' && (
                    <div className="flex items-center space-x-3 pt-4 border-t border-primary-500/20">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onApprove(selectedPost.id);
                          setSelectedPost(null);
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve & Schedule</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onEdit(selectedPost.id);
                          setSelectedPost(null);
                        }}
                        className="px-4 py-3 bg-white/10 hover:bg-white/20 text-gray-300 rounded-xl transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onDecline(selectedPost.id);
                          setSelectedPost(null);
                        }}
                        className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors"
                      >
                        <XCircle className="h-4 w-4" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostPreview;