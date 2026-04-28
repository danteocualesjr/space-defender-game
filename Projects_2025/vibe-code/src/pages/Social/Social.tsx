import React from 'react';
import { motion } from 'framer-motion';
import PlaylistCard from './components/PlaylistCard';
import AchievementList from './components/AchievementList';
import CommunityFeed from './components/CommunityFeed';
import { Music, Share2, Users } from 'lucide-react';

const Social: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Social</h2>
          <p className="text-gray-600">Connect with the community and share your progress</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline flex items-center gap-2"
          >
            <Share2 size={16} />
            Share Project
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary flex items-center gap-2"
          >
            <Music size={16} />
            Link Spotify
          </motion.button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Community Feed</h3>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Recent Activity</option>
              <option>Popular</option>
              <option>Following</option>
            </select>
          </div>
          <CommunityFeed />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <button className="text-sm text-primary hover:underline">
              View All
            </button>
          </div>
          <AchievementList />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Coding Playlists</h3>
          <div className="flex gap-2">
            <select className="border rounded px-2 py-1 text-sm">
              <option>All Genres</option>
              <option>Lo-fi</option>
              <option>Electronic</option>
              <option>Ambient</option>
            </select>
            <button className="text-sm text-primary hover:underline">
              Add Playlist
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PlaylistCard 
            title="Coding Focus" 
            description="Lo-fi beats for deep work sessions"
            tracks={42}
            duration="3h 12m"
            image="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <PlaylistCard 
            title="Productivity Mix" 
            description="Electronic tunes to boost productivity"
            tracks={28}
            duration="2h 45m"
            image="https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <PlaylistCard 
            title="Ambient Flow" 
            description="Ambient sounds for creative coding"
            tracks={36}
            duration="4h 05m"
            image="https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Social;