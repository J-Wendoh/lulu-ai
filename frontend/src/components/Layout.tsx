import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bot, 
  Menu, 
  X,
  Play,
  Pause
} from 'lucide-react';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLuluActive, setIsLuluActive] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
    { name: 'Content Calendar', href: '/app/calendar', icon: Calendar },
    { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-glass backdrop-blur-xl border-r border-primary-500/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-center px-6 border-b border-primary-500/20">
          <div className="w-32 h-8">
            <img 
              src="/ChatGPT Image Jul 2, 2025, 01_43_34 PM.png" 
              alt="Lulu AI Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white ml-auto"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 px-4 py-6">
          {/* Lulu Status */}
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-400/30">
                  <img 
                    src="/openart-image_gzKKZgBq_1751453052454_raw.jpg" 
                    alt="Lulu AI"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-300">Lulu Status</span>
              </div>
              <button
                onClick={() => setIsLuluActive(!isLuluActive)}
                className={`p-1 rounded-full transition-colors ${
                  isLuluActive 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {isLuluActive ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isLuluActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              }`} />
              <span className="text-xs text-gray-400">
                {isLuluActive ? 'Active & Posting' : 'Paused'}
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-primary-500/20 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="w-24 h-6">
            <img 
              src="/ChatGPT Image Jul 2, 2025, 01_43_34 PM.png" 
              alt="Lulu AI Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;