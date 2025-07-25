import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import ContentCalendar from './pages/ContentCalendar';
import ContentLibrary from './components/ContentLibrary';
import CaptionGenerator from './components/CaptionGenerator';
import PostPreview from './components/PostPreview';

function App() {
  // Mock data for demo
  const mockPosts = [
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
      status: 'scheduled' as const,
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
  ];

  const handleApprove = (id: number) => {
    console.log('Approved post:', id);
  };

  const handleDecline = (id: number) => {
    console.log('Declined post:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit post:', id);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<ContentCalendar />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="library" element={<ContentLibrary />} />
          <Route path="generator" element={<CaptionGenerator />} />
          <Route 
            path="preview" 
            element={
              <div className="p-6">
                <PostPreview 
                  posts={mockPosts}
                  onApprove={handleApprove}
                  onDecline={handleDecline}
                  onEdit={handleEdit}
                />
              </div>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;