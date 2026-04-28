import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const GoalProgress: React.FC = () => {
  const progressData = [
    {
      name: 'Week 1',
      coding: 10,
      learning: 15,
      revenue: 5,
    },
    {
      name: 'Week 2',
      coding: 25,
      learning: 20,
      revenue: 15,
    },
    {
      name: 'Week 3',
      coding: 45,
      learning: 30,
      revenue: 20,
    },
    {
      name: 'Week 4',
      coding: 60,
      learning: 40,
      revenue: 25,
    },
    {
      name: 'Week 5',
      coding: 75,
      learning: 55,
      revenue: 30,
    },
    {
      name: 'Week 6',
      coding: 80,
      learning: 60,
      revenue: 35,
    },
  ];

  const goalStats = [
    {
      name: 'Coding Goals',
      value: '70%',
      description: 'Average progress',
      change: '+5%',
      trend: 'up',
    },
    {
      name: 'Learning Goals',
      value: '45%',
      description: 'Average progress',
      change: '+10%',
      trend: 'up',
    },
    {
      name: 'Revenue Goals',
      value: '30%',
      description: 'Average progress',
      change: '+8%',
      trend: 'up',
    },
    {
      name: 'Goal Completion',
      value: '1/4',
      description: 'Completed goals',
      change: '+1',
      trend: 'up',
    },
  ];
  
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {goalStats.map((stat, index) => (
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
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={progressData}
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
            <Line 
              type="monotone" 
              dataKey="coding" 
              name="Coding" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="learning" 
              name="Learning" 
              stroke="#82ca9d" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              name="Revenue" 
              stroke="#ffc658" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GoalProgress;