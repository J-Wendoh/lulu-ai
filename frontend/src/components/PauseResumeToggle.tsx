import React from 'react';
import { Play, Pause, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface PauseResumeToggleProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
  pendingPosts?: number;
  nextPostTime?: string;
}

const PauseResumeToggle: React.FC<PauseResumeToggleProps> = ({ 
  isActive, 
  onToggle, 
  pendingPosts = 0,
  nextPostTime 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-400/50">
            <img 
              src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
              alt="Lulu AI"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Lulu AI Status</h3>
            <p className="text-sm text-gray-300">
              {isActive ? 'Actively managing your social media' : 'Posting is currently paused'}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(!isActive)}
          className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
            isActive 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25' 
              : 'bg-gradient-to-r from-gray-600 to-gray-700'
          }`}
        >
          <motion.div
            animate={{ x: isActive ? 40 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 left-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            {isActive ? (
              <Play className="h-4 w-4 text-green-600" />
            ) : (
              <Pause className="h-4 w-4 text-gray-600" />
            )}
          </motion.div>
        </motion.button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white/5 rounded-xl">
          <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
            isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
          }`} />
          <p className="text-xs text-gray-400 mb-1">Status</p>
          <p className={`text-sm font-medium ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
            {isActive ? 'Active' : 'Paused'}
          </p>
        </div>

        <div className="text-center p-4 bg-white/5 rounded-xl">
          <Clock className="h-4 w-4 text-blue-400 mx-auto mb-2" />
          <p className="text-xs text-gray-400 mb-1">Next Post</p>
          <p className="text-sm font-medium text-white">
            {isActive && nextPostTime ? nextPostTime : '--:--'}
          </p>
        </div>

        <div className="text-center p-4 bg-white/5 rounded-xl">
          <CheckCircle className="h-4 w-4 text-orange-400 mx-auto mb-2" />
          <p className="text-xs text-gray-400 mb-1">Pending</p>
          <p className="text-sm font-medium text-white">{pendingPosts}</p>
        </div>
      </div>

      {!isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl"
        >
          <div className="flex items-center space-x-2">
            <Pause className="h-4 w-4 text-orange-400" />
            <p className="text-sm text-orange-300">
              Posting is paused. Your scheduled content will resume when you reactivate Lulu.
            </p>
          </div>
        </motion.div>
      )}

      {isActive && pendingPosts > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-blue-400" />
            <p className="text-sm text-blue-300">
              {pendingPosts} post{pendingPosts > 1 ? 's' : ''} waiting for your approval before publishing.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PauseResumeToggle;