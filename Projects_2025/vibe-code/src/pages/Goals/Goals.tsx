import React from 'react';
import { motion } from 'framer-motion';
import GoalList from './components/GoalList';
import RunwayCalculator from './components/RunwayCalculator';
import GoalProgress from './components/GoalProgress';
import { Target, PlusCircle } from 'lucide-react';

const Goals: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Goals</h2>
          <p className="text-gray-600">Track your milestones and measure your progress</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusCircle size={16} />
          New Goal
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Goal Progress</h3>
            <select className="border rounded px-2 py-1 text-sm">
              <option>All Goals</option>
              <option>Coding</option>
              <option>Learning</option>
              <option>Revenue</option>
            </select>
          </div>
          <GoalProgress />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Runway Calculator</h3>
            <div className="text-xs px-2 py-1 bg-gray-100 rounded-full">For Solopreneurs</div>
          </div>
          <RunwayCalculator />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Goals</h3>
          <div className="flex gap-2">
            <select className="border rounded px-2 py-1 text-sm">
              <option>All Types</option>
              <option>Coding</option>
              <option>Learning</option>
              <option>Revenue</option>
            </select>
            <select className="border rounded px-2 py-1 text-sm">
              <option>All Status</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        <GoalList />
      </motion.div>
    </div>
  );
};

export default Goals;