import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProjectSummary: React.FC = () => {
  const projectData = [
    {
      name: 'Week 1',
      commits: 12,
      tasks: 8,
      completion: 15,
    },
    {
      name: 'Week 2',
      commits: 19,
      tasks: 10,
      completion: 35,
    },
    {
      name: 'Week 3',
      commits: 25,
      tasks: 18,
      completion: 55,
    },
    {
      name: 'Week 4',
      commits: 30,
      tasks: 22,
      completion: 75,
    },
  ];

  const statsData = [
    {
      name: 'Projects',
      value: 8,
      change: '+2',
      trend: 'up',
    },
    {
      name: 'Avg. Commits',
      value: 22,
      change: '+8',
      trend: 'up',
    },
    {
      name: 'Tasks Completed',
      value: 58,
      change: '+12',
      trend: 'up',
    },
    {
      name: 'Code Quality',
      value: '92%',
      change: '+5%',
      trend: 'up',
    },
  ];
  
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">{stat.name}</p>
            <div className="flex items-baseline mt-1">
              <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
              <span className={`ml-2 text-xs font-medium ${
                stat.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={projectData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="commits" name="Commits" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tasks" name="Tasks" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completion" name="Completion %" fill="#ffc658" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectSummary;