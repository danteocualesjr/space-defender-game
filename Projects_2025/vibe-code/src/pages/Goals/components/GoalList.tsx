import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Code, 
  Book, 
  DollarSign, 
  CheckCircle, 
  Clock,
  Target,
  Award
} from 'lucide-react';

interface Goal {
  id: number;
  name: string;
  description: string;
  progress: number;
  status: 'in_progress' | 'completed' | 'paused';
  type: 'coding' | 'learning' | 'revenue';
  deadline: string;
  icon: React.ReactNode;
}

const GoalList: React.FC = () => {
  const goals: Goal[] = [
    {
      id: 1,
      name: 'Code daily for 30 days',
      description: 'Build a consistent coding habit by coding every day for at least 1 hour.',
      progress: 70,
      status: 'in_progress',
      type: 'coding',
      deadline: '2025-03-15',
      icon: <Code size={18} />
    },
    {
      id: 2,
      name: 'Learn React Native',
      description: 'Complete the advanced React Native course and build a mobile app.',
      progress: 45,
      status: 'in_progress',
      type: 'learning',
      deadline: '2025-04-20',
      icon: <Book size={18} />
    },
    {
      id: 3,
      name: 'Reach $1,000 MRR',
      description: 'Achieve $1,000 in monthly recurring revenue through my SaaS product.',
      progress: 30,
      status: 'in_progress',
      type: 'revenue',
      deadline: '2025-06-30',
      icon: <DollarSign size={18} />
    },
    {
      id: 4,
      name: 'Complete Full-Stack Course',
      description: 'Finish the comprehensive full-stack web development course.',
      progress: 100,
      status: 'completed',
      type: 'learning',
      deadline: '2025-01-15',
      icon: <Award size={18} />
    }
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Clock size={16} className="text-primary" />;
      case 'completed':
        return <CheckCircle size={16} className="text-success" />;
      case 'paused':
        return <Clock size={16} className="text-warning" />;
      default:
        return null;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'coding':
        return 'bg-primary/10 text-primary';
      case 'learning':
        return 'bg-secondary/10 text-secondary';
      case 'revenue':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <motion.div 
          key={goal.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -2 }}
          className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="p-4">
            <div className="flex justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(goal.type)}`}>
                  {goal.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{goal.name}</h4>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                {getStatusIcon(goal.status)}
                <span className="capitalize">{goal.status.replace('_', ' ')}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    goal.status === 'completed' 
                      ? 'bg-success' 
                      : goal.type === 'coding'
                      ? 'bg-primary'
                      : goal.type === 'learning'
                      ? 'bg-secondary'
                      : 'bg-accent'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>Deadline: {goal.deadline}</span>
              </div>
              <button className="text-xs text-primary hover:underline">
                Edit Goal
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GoalList;