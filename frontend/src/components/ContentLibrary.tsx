import React, { useState } from 'react';
import { 
  Upload, 
  Image, 
  FileText, 
  Video, 
  Folder,
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  Download,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MediaItem {
  id: number;
  type: 'image' | 'video' | 'document';
  name: string;
  url: string;
  size: string;
  uploadDate: string;
  tags: string[];
  aiGenerated?: boolean;
}

const ContentLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: 'image',
      name: 'Product Launch Event',
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      size: '2.4 MB',
      uploadDate: '2024-01-14',
      tags: ['event', 'product', 'launch'],
      aiGenerated: false
    },
    {
      id: 2,
      type: 'image',
      name: 'AI Generated Office Space',
      url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      size: '1.8 MB',
      uploadDate: '2024-01-13',
      tags: ['office', 'workspace', 'modern'],
      aiGenerated: true
    },
    {
      id: 3,
      type: 'image',
      name: 'Team Meeting',
      url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      size: '3.1 MB',
      uploadDate: '2024-01-12',
      tags: ['team', 'meeting', 'collaboration'],
      aiGenerated: false
    },
    {
      id: 4,
      type: 'document',
      name: 'Brand Guidelines.pdf',
      url: '#',
      size: '5.2 MB',
      uploadDate: '2024-01-10',
      tags: ['brand', 'guidelines', 'document'],
      aiGenerated: false
    },
    {
      id: 5,
      type: 'video',
      name: 'Product Demo Video',
      url: '#',
      size: '45.8 MB',
      uploadDate: '2024-01-09',
      tags: ['demo', 'product', 'video'],
      aiGenerated: false
    },
    {
      id: 6,
      type: 'image',
      name: 'AI Generated Abstract Art',
      url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      size: '2.1 MB',
      uploadDate: '2024-01-08',
      tags: ['abstract', 'art', 'creative'],
      aiGenerated: true
    }
  ];

  const folders = [
    { id: 'all', name: 'All Media', count: mediaItems.length },
    { id: 'images', name: 'Images', count: mediaItems.filter(item => item.type === 'image').length },
    { id: 'videos', name: 'Videos', count: mediaItems.filter(item => item.type === 'video').length },
    { id: 'documents', name: 'Documents', count: mediaItems.filter(item => item.type === 'document').length },
    { id: 'ai-generated', name: 'AI Generated', count: mediaItems.filter(item => item.aiGenerated).length }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'document':
        return FileText;
      default:
        return FileText;
    }
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesFolder = selectedFolder === 'all' || 
      (selectedFolder === 'images' && item.type === 'image') ||
      (selectedFolder === 'videos' && item.type === 'video') ||
      (selectedFolder === 'documents' && item.type === 'document') ||
      (selectedFolder === 'ai-generated' && item.aiGenerated);
    
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Content Library</h2>
          <p className="text-gray-300">Manage your media assets and AI-generated content</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none"
            />
          </div>
          
          <div className="flex items-center bg-white/5 border border-primary-500/30 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl transition-all duration-200"
          >
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </motion.button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Folders</h3>
            <div className="space-y-2">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                    selectedFolder === folder.id
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Folder className="h-4 w-4" />
                    <span className="text-sm">{folder.name}</span>
                  </div>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                    {folder.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Upload Zone */}
            <div className="mt-6 p-6 border-2 border-dashed border-primary-500/30 rounded-xl text-center hover:border-primary-400/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-primary-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300 mb-1">Drop files here</p>
              <p className="text-xs text-gray-400">or click to browse</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="lg:col-span-3">
          <div className="bg-glass backdrop-blur-xl border border-primary-500/20 rounded-2xl p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map(item => {
                  const FileIcon = getFileIcon(item.type);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group relative bg-white/5 border border-primary-500/20 rounded-xl overflow-hidden hover:border-primary-400/40 transition-all duration-200"
                    >
                      {item.type === 'image' ? (
                        <div className="aspect-square">
                          <img 
                            src={item.url} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-purple-500/20">
                          <FileIcon className="h-12 w-12 text-primary-400" />
                        </div>
                      )}
                      
                      {item.aiGenerated && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full">
                          <span className="text-xs font-medium text-white">AI</span>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                          <Eye className="h-4 w-4 text-white" />
                        </button>
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                          <Download className="h-4 w-4 text-white" />
                        </button>
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      
                      <div className="p-3">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.size}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map(item => {
                  const FileIcon = getFileIcon(item.type);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-4 p-4 bg-white/5 border border-primary-500/20 rounded-xl hover:border-primary-400/40 transition-all duration-200"
                    >
                      <div className="flex-shrink-0">
                        {item.type === 'image' ? (
                          <img 
                            src={item.url} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                            <FileIcon className="h-6 w-6 text-primary-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-white truncate">{item.name}</p>
                          {item.aiGenerated && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">AI</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span>{item.size}</span>
                          <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                          <div className="flex space-x-1">
                            {item.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-2 py-1 bg-white/10 rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLibrary;