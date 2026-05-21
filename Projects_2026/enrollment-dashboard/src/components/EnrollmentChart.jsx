import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, BarChart3, Zap } from 'lucide-react';
import { monthlyData } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`
        p-4 rounded-xl border shadow-2xl backdrop-blur-xl
        ${isDark 
          ? 'bg-slate-800/95 border-slate-700' 
          : 'bg-white/95 border-slate-200'
        }
      `}>
        <p className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{entry.name}:</span>
            <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const EnrollmentChart = () => {
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState('12m');

  const ranges = [
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
    { value: '12m', label: '12M' },
  ];

  const getFilteredData = () => {
    const monthsMap = { '3m': 3, '6m': 6, '12m': 12 };
    return monthlyData.slice(-monthsMap[timeRange]);
  };

  return (
    <div className={`
      rounded-2xl p-6 animate-slide-up
      transition-all duration-300
      ${isDark 
        ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5' 
        : 'bg-white border border-slate-200 shadow-lg'
      }
    `} style={{ animationDelay: '200ms' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`
            p-2.5 rounded-xl
            ${isDark 
              ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/10' 
              : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25'
            }
          `}>
            <BarChart3 className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-white'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Enrollment Trends</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Monthly enrollments vs withdrawals</p>
          </div>
        </div>
        
        {/* Time Range Selector */}
        <div className={`
          flex items-center gap-1 p-1 rounded-xl
          ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-100 border border-slate-200'}
        `}>
          {ranges.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTimeRange(value)}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${timeRange === value
                  ? isDark 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-blue-600 shadow-md'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={getFilteredData()} 
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="withdrawalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#334155' : '#e2e8f0'} 
              vertical={false} 
            />
            <XAxis 
              dataKey="month" 
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#334155' : '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="enrollments"
              name="Enrollments"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#enrollmentGradient)"
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#3b82f6', fill: isDark ? '#0f172a' : '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="withdrawals"
              name="Withdrawals"
              stroke="#f97316"
              strokeWidth={2.5}
              fill="url(#withdrawalGradient)"
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#f97316', fill: isDark ? '#0f172a' : '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats */}
      <div className={`
        grid grid-cols-2 gap-4 mt-6 pt-6
        border-t ${isDark ? 'border-slate-700/50' : 'border-slate-200'}
      `}>
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}
          `}>
            <TrendingUp className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Peak Month</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Jan 2026 (289)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}
          `}>
            <Zap className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} />
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Avg. Monthly</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>202 enrollments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentChart;
