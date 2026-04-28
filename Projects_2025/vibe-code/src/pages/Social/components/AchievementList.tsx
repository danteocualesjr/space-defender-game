import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Zap, 
  Flame, 
  Target, 
  Rocket, 
  Trophy,
  Calendar,
  Star
} from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  category: 'coding' | 'goals' | 'streak' | 'milestone';
  unlocked: boolean;
}

const AchievementList: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: '7-Day Streak',
      description: 'Coded for 7 consecutive days',
      date: '2025-02-12',
      icon: <Flame size={16} />,
      category: 'streak',
      unlocked: true
    },
    {
      id: 2,
      title: 'First Project',
      description: 'Created your first project',
      date: '2025-01-25',
      icon: <Rocket size={16} />,
      category: 'milestone',
      unlocked: true
    },
    {
      id: 3,
      title: 'Goal Setter',
      description: 'Created 5 goals',
      date: '2025-02-05',
      icon: <Target size={16} />,
      category: 'goals',
      unlocked: true
    },
    {
      id: 4,
      title: 'Code Warrior',
      description: 'Completed 10,000 lines of code',
      date: '2025-03-01',
      icon: <Zap size={16} />,
      category: 'coding',
      unlocked: false
    },
    {
      id: 5,
      title: 'Trophy Hunter',
      description: 'Unlocked 10 achievements',
      date: '2025-03-10',
      icon: <Trophy size={16} />,
      category: 'milestone',
      unlocked: false
    }
  ];
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'coding':
        return 'bg-primary/10 text-primary';
      case 'goals':
        return 'bg-secondary/10 text-secondary';
      case 'streak':
        return 'bg-warning/10 text-warning';
      case 'milestone':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
      {achievements.map((achievement) => (
        <motion.div 
          key={achievement.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`p-3 border rounded-lg transition-all ${
            achievement.unlocked 
              ? 'border-gray-200 hover:shadow-sm'
              : 'border-dashed border-gray-300 bg-gray-50 opacity-70'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getCategoryColor(achievement.category)} flex items-center justify-center`}>
              {achievement.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className={`font-medium ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                  {achievement.title}
                </h4>
                {achievement.unlocked && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="bg-success/10 text-success rounded-full p-1"
                  >
                    <Star size={12} fill="currentColor" />
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
              {achievement.unlocked && (
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Calendar size={12} className="mr-1" />
                  <span>Unlocked on {achievement.date}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementList;