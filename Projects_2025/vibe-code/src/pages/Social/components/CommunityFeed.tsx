import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Award, 
  Rocket,
  Music,
  Zap,
  GitCommit
} from 'lucide-react';

interface FeedItem {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  type: 'achievement' | 'project' | 'playlist' | 'milestone' | 'streak';
  content: string;
  details?: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
}

const CommunityFeed: React.FC = () => {
  const feedItems: FeedItem[] = [
    {
      id: 1,
      user: {
        name: 'Alex Johnson',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      type: 'project',
      content: 'Just launched my new portfolio site built with React and Three.js!',
      details: 'Check out the 3D animations and custom shaders I created.',
      image: 'https://images.pexels.com/photos/5926397/pexels-photo-5926397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 24,
      comments: 5,
      time: '2 hours ago'
    },
    {
      id: 2,
      user: {
        name: 'Morgan Lee',
        avatar: 'https://images.pexels.com/photos/1674666/pexels-photo-1674666.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      type: 'achievement',
      content: 'Just earned the "30-Day Coding Streak" achievement!',
      details: 'Consistency is key. Looking forward to the next milestone.',
      likes: 18,
      comments: 3,
      time: '5 hours ago'
    },
    {
      id: 3,
      user: {
        name: 'Jamie Chen',
        avatar: 'https://images.pexels.com/photos/1484810/pexels-photo-1484810.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      type: 'playlist',
      content: 'Sharing my favorite coding playlist - "Deep Focus Ambient"',
      details: 'Perfect for those late-night coding sessions.',
      image: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 32,
      comments: 7,
      time: '1 day ago'
    },
    {
      id: 4,
      user: {
        name: 'Taylor Smith',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      type: 'milestone',
      content: 'Just reached $500 MRR with my SaaS product!',
      details: 'Halfway to my first goal of $1,000 MRR. Thanks to everyone who supported me along the way.',
      likes: 45,
      comments: 12,
      time: '2 days ago'
    }
  ];
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award size={16} className="text-primary" />;
      case 'project':
        return <Rocket size={16} className="text-secondary" />;
      case 'playlist':
        return <Music size={16} className="text-accent" />;
      case 'milestone':
        return <Zap size={16} className="text-warning" />;
      case 'streak':
        return <GitCommit size={16} className="text-success" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      {feedItems.map((item) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border border-gray-200 rounded-lg p-4"
        >
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <img 
                src={item.user.avatar} 
                alt={item.user.name} 
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium text-gray-900">{item.user.name}</p>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                {getActivityIcon(item.type)}
                <p className="text-xs text-gray-500 capitalize">{item.type}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-gray-900">{item.content}</p>
            {item.details && (
              <p className="mt-1 text-sm text-gray-600">{item.details}</p>
            )}
          </div>
          
          {item.image && (
            <div className="mt-3">
              <img 
                src={item.image} 
                alt="Post" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                <ThumbsUp size={16} />
                <span className="text-sm">{item.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                <MessageSquare size={16} />
                <span className="text-sm">{item.comments}</span>
              </button>
            </div>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
              <Share2 size={16} />
              <span className="text-sm">Share</span>
            </button>
          </div>
          
          {item.comments > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button className="text-sm text-primary hover:underline">
                View all {item.comments} comments
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default CommunityFeed;