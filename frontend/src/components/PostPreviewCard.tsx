import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Edit3,
  Clock,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PostPreviewCardProps {
  post: {
    id: number;
    platform: string;
    content: string;
    image: string;
    scheduledTime: string;
    status: 'pending' | 'approved' | 'declined';
    engagement?: {
      likes: number;
      comments: number;
      shares: number;
      views: number;
    };
  };
  onApprove: (id: number) => void;
  onDecline: (id: number) => void;
  onEdit: (id: number) => void;
}

const PostPreviewCard: React.FC<PostPreviewCardProps> = ({ 
  post, 
  onApprove, 
  onDecline, 
  onEdit 
}) => {
  const getStatusIcon = () => {
    switch (post.status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'declined':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-orange-400" />;
    }
  };

  const getStatusColor = () => {
    switch (post.status) {
      case 'approved':
        return 'border-green-400/50 bg-green-400/5';
      case 'declined':
        return 'border-red-400/50 bg-red-400/5';
      default:
        return 'border-primary-400/50 bg-primary-400/5';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl border-2 ${getStatusColor()} backdrop-blur-xl`}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
        {getStatusIcon()}
        <span className="text-xs font-medium text-white capitalize">{post.status}</span>
      </div>

      {/* Platform Badge */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-primary-500/80 backdrop-blur-sm rounded-full">
        <span className="text-xs font-semibold text-white">{post.platform}</span>
      </div>

      {/* Post Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={post.image} 
          alt="Post preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Post Content */}
      <div className="p-6">
        {/* Caption */}
        <div className="mb-4">
          <p className="text-gray-200 leading-relaxed text-sm">
            {post.content}
          </p>
        </div>

        {/* Engagement Preview */}
        {post.engagement && (
          <div className="flex items-center space-x-6 mb-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{post.engagement.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.engagement.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Share2 className="h-4 w-4" />
              <span>{post.engagement.shares}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{post.engagement.views.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Scheduled Time */}
        <div className="flex items-center space-x-2 mb-4 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          <span>Scheduled for {new Date(post.scheduledTime).toLocaleDateString()} at {new Date(post.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Action Buttons */}
        {post.status === 'pending' && (
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onApprove(post.id)}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-200 font-medium"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Approve</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onEdit(post.id)}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-primary-500/30 hover:border-primary-400/50 rounded-xl transition-all duration-200"
            >
              <Edit3 className="h-4 w-4 text-gray-300" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDecline(post.id)}
              className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-400/50 rounded-xl transition-all duration-200"
            >
              <XCircle className="h-4 w-4 text-red-400" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PostPreviewCard;