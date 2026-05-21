import React from 'react';
import { format, formatDistance } from 'date-fns';
import { 
  GitCommit, 
  CheckSquare, 
  Star, 
  GitPullRequest, 
  MessageSquare,
  PlusCircle
} from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'commit' | 'task' | 'star' | 'pr' | 'comment' | 'new';
  project: string;
  description: string;
  time: Date;
}

const ActivityFeed: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'commit',
      project: 'Web3 Dashboard',
      description: 'Added new chart components',
      time: new Date(new Date().getTime() - 1000 * 60 * 25),
    },
    {
      id: 2,
      type: 'task',
      project: 'Mobile App',
      description: 'Completed UI redesign',
      time: new Date(new Date().getTime() - 1000 * 60 * 60 * 3),
    },
    {
      id: 3,
      type: 'star',
      project: 'Design System',
      description: 'Reached milestone',
      time: new Date(new Date().getTime() - 1000 * 60 * 60 * 5),
    },
    {
      id: 4,
      type: 'pr',
      project: 'Web3 Dashboard',
      description: 'Merged pull request #42',
      time: new Date(new Date().getTime() - 1000 * 60 * 60 * 8),
    },
    {
      id: 5,
      type: 'comment',
      project: 'Analytics Platform',
      description: 'Added feedback on report',
      time: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    },
  ];
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return <GitCommit size={16} className="text-primary" />;
      case 'task':
        return <CheckSquare size={16} className="text-success" />;
      case 'star':
        return <Star size={16} className="text-warning" />;
      case 'pr':
        return <GitPullRequest size={16} className="text-secondary" />;
      case 'comment':
        return <MessageSquare size={16} className="text-accent" />;
      case 'new':
        return <PlusCircle size={16} className="text-primary" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
      {activities.map((activity) => (
        <div key={activity.id} className="flex space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getActivityIcon(activity.type)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-gray-800">
              <span className="font-medium">{activity.project}</span>
              {' - '}
              <span>{activity.description}</span>
            </div>
            <div className="mt-0.5 text-xs text-gray-500">
              {formatDistance(activity.time, new Date(), { addSuffix: true })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;