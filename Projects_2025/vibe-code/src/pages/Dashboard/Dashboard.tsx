import React from 'react';
import { motion } from 'framer-motion';
import ProjectList from './components/ProjectList';
import ContributionHeatMap from './components/ContributionHeatMap';
import ProjectSummary from './components/ProjectSummary';
import ActivityFeed from './components/ActivityFeed';
import { PlusCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  
  return (
    
    <div className="min-h-screen bg-gradient-to-tr from-[#f8fafc] via-[#f0f4ff] to-[#e0e7ff] py-10 px-2 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">Dashboard</h2>
            <p className="text-lg text-gray-600 font-medium mt-1">Track your progress and stay in your vibe</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 4px 20px 0 rgba(99,102,241,0.15)' }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary flex items-center gap-2 px-6 py-2 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-indigo-500 transition-all duration-200 border-0 outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <PlusCircle size={18} />
            New Project
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            <ProjectList />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            <ContributionHeatMap />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            <ProjectSummary />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            <ActivityFeed />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;