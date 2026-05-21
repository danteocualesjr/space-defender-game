import { UserPlus, UserMinus, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { recentActivity, formatRelativeTime, programColors } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const ActivityFeed = () => {
  const { isDark } = useTheme();

  return (
    <div className={`
      rounded-2xl overflow-hidden animate-slide-up h-full
      transition-all duration-300
      ${isDark 
        ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5' 
        : 'bg-white border border-slate-200 shadow-lg'
      }
    `} style={{ animationDelay: '500ms' }}>
      {/* Header */}
      <div className={`
        flex items-center justify-between p-6 
        border-b ${isDark ? 'border-slate-700/50' : 'border-slate-200'}
      `}>
        <div className="flex items-center gap-3">
          <div className={`
            p-2.5 rounded-xl relative
            ${isDark 
              ? 'bg-gradient-to-br from-orange-500/20 to-rose-500/10' 
              : 'bg-gradient-to-br from-orange-500 to-rose-500 shadow-lg shadow-orange-500/25'
            }
          `}>
            <Clock className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-white'}`} />
            <Sparkles className={`w-3 h-3 absolute -top-1 -right-1 ${isDark ? 'text-yellow-400' : 'text-yellow-500'} animate-pulse`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Recent Activity</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Latest enrollments & withdrawals</p>
          </div>
        </div>
        <button className={`
          flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
          transition-all duration-300 group
          ${isDark 
            ? 'text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/20' 
            : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md'
          }
        `}>
          <span>View all</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Activity List */}
      <div className={`divide-y max-h-[480px] overflow-y-auto ${isDark ? 'divide-slate-700/30' : 'divide-slate-100'}`}>
        {recentActivity.map((activity, index) => (
          <div 
            key={activity.id}
            className={`
              flex items-start gap-4 p-4 group
              transition-all duration-300 cursor-pointer
              ${isDark ? 'hover:bg-slate-800/60 hover:border-l-2 border-blue-500/50' : 'hover:bg-slate-50/80 hover:border-l-2 border-blue-500/30'}
              border-l-2 border-transparent
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className={`
                w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold
                transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg
                ${activity.type === 'enrollment' 
                  ? isDark ? 'bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30' : 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200'
                  : isDark ? 'bg-rose-500/20 text-rose-400 group-hover:bg-rose-500/30' : 'bg-rose-100 text-rose-600 group-hover:bg-rose-200'
                }
              `}>
                {activity.avatar}
              </div>
              <div className={`
                absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full 
                flex items-center justify-center shadow-lg
                transition-all duration-300 group-hover:scale-110
                ${activity.type === 'enrollment' 
                  ? 'bg-emerald-500 ring-2 ring-slate-900' 
                  : 'bg-rose-500 ring-2 ring-slate-900'
                }
              `}>
                {activity.type === 'enrollment' 
                  ? <UserPlus className="w-2.5 h-2.5 text-white" />
                  : <UserMinus className="w-2.5 h-2.5 text-white" />
                }
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className={`font-semibold text-sm transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                    {activity.studentName}
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {activity.type === 'enrollment' ? 'Enrolled in' : 'Withdrew from'}{' '}
                    <span 
                      className="font-semibold transition-colors"
                      style={{ color: programColors[activity.program] }}
                    >
                      {activity.program}
                    </span>
                  </p>
                </div>
                <span className={`text-xs font-medium whitespace-nowrap px-2 py-1 rounded-lg ${isDark ? 'text-slate-500 bg-slate-800/50' : 'text-slate-400 bg-slate-100'}`}>
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
              
              {/* Additional Info */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className={`
                  text-xs px-2.5 py-1 rounded-lg font-medium
                  transition-all duration-200 group-hover:scale-105
                  ${isDark ? 'bg-slate-800/50 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-600 border border-slate-200'}
                `}>
                  {activity.cohort}
                </span>
                {activity.reason && (
                  <span className={`
                    text-xs px-2.5 py-1 rounded-lg font-medium
                    transition-all duration-200 group-hover:scale-105
                    ${isDark ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' : 'bg-rose-50 text-rose-600 border border-rose-200'}
                  `}>
                    {activity.reason}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className={`
        flex items-center justify-between p-4 
        border-t ${isDark ? 'border-slate-700/50 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}
      `}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {recentActivity.filter(a => a.type === 'enrollment').length} enrollments
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {recentActivity.filter(a => a.type === 'withdrawal').length} withdrawals
            </span>
          </div>
        </div>
        <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Last 48 hours</span>
      </div>
    </div>
  );
};

export default ActivityFeed;
