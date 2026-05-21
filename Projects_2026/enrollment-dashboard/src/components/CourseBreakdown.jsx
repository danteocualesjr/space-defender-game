import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BookOpen, Users } from 'lucide-react';
import { courseData, formatNumber } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const CustomTooltip = ({ active, payload, isDark }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={`
        p-3 rounded-xl border shadow-2xl backdrop-blur-xl
        ${isDark 
          ? 'bg-slate-800/95 border-slate-700' 
          : 'bg-white/95 border-slate-200'
        }
      `}>
        <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.name}</p>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{formatNumber(data.students)} students</p>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{data.percentage}% of total</p>
      </div>
    );
  }
  return null;
};

const CourseBreakdown = () => {
  const { isDark } = useTheme();
  const totalStudents = courseData.reduce((sum, course) => sum + course.students, 0);

  return (
    <div className={`
      rounded-2xl p-6 animate-slide-up h-full
      transition-all duration-300
      ${isDark 
        ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5' 
        : 'bg-white border border-slate-200 shadow-lg'
      }
    `} style={{ animationDelay: '300ms' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`
          p-2.5 rounded-xl
          ${isDark 
            ? 'bg-gradient-to-br from-violet-500/20 to-purple-500/10' 
            : 'bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/25'
          }
        `}>
          <BookOpen className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-white'}`} />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Course Breakdown</h3>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Students by program</p>
        </div>
      </div>

      {/* Chart and Legend Container */}
      <div className="flex flex-col items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-44 h-44 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={courseData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="students"
                stroke="none"
              >
                {courseData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Stats */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Users className={`w-4 h-4 mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{formatNumber(totalStudents)}</span>
            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2">
          {courseData.map((course, index) => (
            <div 
              key={index}
              className={`
                flex items-center justify-between p-3 rounded-xl
                transition-all duration-200 group cursor-pointer
                ${isDark 
                  ? 'bg-slate-800/50 hover:bg-slate-700/50 border border-transparent hover:border-slate-600' 
                  : 'bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full ring-2 ring-offset-2 transition-transform group-hover:scale-125"
                  style={{ 
                    backgroundColor: course.color,
                    ringColor: `${course.color}40`,
                    ringOffsetColor: isDark ? '#1e293b' : '#f8fafc'
                  }}
                />
                <span className={`text-sm font-medium transition-colors ${isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>
                  {course.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {formatNumber(course.students)}
                </span>
                <span className={`text-xs w-10 text-right px-1.5 py-0.5 rounded ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>
                  {course.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseBreakdown;
