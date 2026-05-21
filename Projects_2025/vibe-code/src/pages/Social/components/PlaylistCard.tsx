import React from 'react';
import { motion } from 'framer-motion';
import { Play, Music, Clock, Share2 } from 'lucide-react';

interface PlaylistCardProps {
  title: string;
  description: string;
  tracks: number;
  duration: string;
  image: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ 
  title, 
  description, 
  tracks, 
  duration, 
  image 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg"
        >
          <Play size={20} fill="currentColor" />
        </motion.button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
            Spotify
          </span>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Music size={14} />
            <span>{tracks} tracks</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <button className="text-xs text-primary hover:underline flex items-center gap-1">
            <Share2 size={12} />
            Share
          </button>
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">+8</div>
            <div className="w-6 h-6 rounded-full bg-primary/20"></div>
            <div className="w-6 h-6 rounded-full bg-secondary/20"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistCard;