import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  PencilRuler, 
  Layers, 
  LineChart, 
  CheckCircle, 
  Clock,
  Database
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  techStack: string[];
  icon: React.ReactNode;
}

const ProjectList: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      name: 'Web3 Dashboard',
      description: 'A dashboard for tracking blockchain transactions and NFT assets.',
      progress: 75,
      status: 'active',
      techStack: ['React', 'TypeScript', 'Tailwind'],
      icon: <Code size={18} />
    },
    {
      id: 2,
      name: 'Design System',
      description: 'A comprehensive design system for consistent UI across products.',
      progress: 45,
      status: 'active',
      techStack: ['Figma', 'Storybook', 'React'],
      icon: <PencilRuler size={18} />
    },
    {
      id: 3,
      name: 'Mobile App',
      description: 'Cross-platform mobile application for productivity tracking.',
      progress: 30,
      status: 'active',
      techStack: ['React Native', 'Firebase', 'Redux'],
      icon: <Layers size={18} />
    },
    {
      id: 4,
      name: 'Analytics Platform',
      description: 'Data visualization platform for marketing metrics.',
      progress: 100,
      status: 'completed',
      techStack: ['Vue', 'D3.js', 'Node.js'],
      icon: <LineChart size={18} />
    }
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock size={16} className="text-primary" />;
      case 'completed':
        return <CheckCircle size={16} className="text-success" />;
      case 'paused':
        return <Clock size={16} className="text-warning" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -2 }}
          className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="p-4">
            <div className="flex justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {project.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                {getStatusIcon(project.status)}
                <span className="capitalize">{project.status}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    project.status === 'completed' 
                      ? 'bg-success' 
                      : 'bg-primary'
                  }`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <button className="text-xs text-primary hover:underline">
                View Details
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectList;