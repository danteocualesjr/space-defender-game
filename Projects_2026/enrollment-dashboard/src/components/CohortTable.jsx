import { useState } from 'react';
import { Users, Calendar, ChevronUp, ChevronDown, GraduationCap, ArrowUpRight } from 'lucide-react';
import { cohortData, formatDate, programColors } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const CohortTable = () => {
  const { isDark } = useTheme();
  const [sortField, setSortField] = useState('startDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedCohorts = [...cohortData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'startDate' || sortField === 'endDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  const getProgressColor = (rate) => {
    if (rate >= 95) return isDark ? 'bg-emerald-500' : 'bg-emerald-500';
    if (rate >= 85) return isDark ? 'bg-blue-500' : 'bg-blue-500';
    if (rate >= 70) return isDark ? 'bg-yellow-500' : 'bg-yellow-500';
    return isDark ? 'bg-rose-500' : 'bg-rose-500';
  };

  const getProgressBg = (rate) => {
    if (rate >= 95) return isDark ? 'bg-emerald-500/20' : 'bg-emerald-100';
    if (rate >= 85) return isDark ? 'bg-blue-500/20' : 'bg-blue-100';
    if (rate >= 70) return isDark ? 'bg-yellow-500/20' : 'bg-yellow-100';
    return isDark ? 'bg-rose-500/20' : 'bg-rose-100';
  };

  return (
    <div className={`
      rounded-2xl overflow-hidden animate-slide-up
      transition-all duration-300
      ${isDark 
        ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5' 
        : 'bg-white border border-slate-200 shadow-lg'
      }
    `} style={{ animationDelay: '400ms' }}>
      {/* Header */}
      <div className={`
        flex items-center justify-between p-6 
        border-b ${isDark ? 'border-slate-700/50' : 'border-slate-200'}
      `}>
        <div className="flex items-center gap-3">
          <div className={`
            p-2.5 rounded-xl
            ${isDark 
              ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10' 
              : 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25'
            }
          `}>
            <GraduationCap className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-white'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Active Cohorts</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{cohortData.length} cohorts currently running</p>
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
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDark ? 'border-slate-700/50' : 'border-slate-200'}`}>
              <th className={`text-left px-6 py-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <button 
                  onClick={() => handleSort('name')}
                  className={`
                    flex items-center gap-2 font-semibold text-xs uppercase tracking-wider
                    transition-all duration-200 group
                    ${isDark 
                      ? 'hover:text-white hover:bg-slate-800/50' 
                      : 'hover:text-slate-900 hover:bg-slate-100'
                    }
                    ${sortField === 'name' ? (isDark ? 'text-blue-400' : 'text-blue-600') : ''}
                    px-2 py-1.5 -mx-2 -my-1.5 rounded-lg
                  `}
                >
                  Cohort 
                  <SortIcon field="name" />
                </button>
              </th>
              <th className={`text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Program
              </th>
              <th className={`text-left px-6 py-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <button 
                  onClick={() => handleSort('students')}
                  className={`
                    flex items-center gap-2 font-semibold text-xs uppercase tracking-wider
                    transition-all duration-200 group
                    ${isDark 
                      ? 'hover:text-white hover:bg-slate-800/50' 
                      : 'hover:text-slate-900 hover:bg-slate-100'
                    }
                    ${sortField === 'students' ? (isDark ? 'text-blue-400' : 'text-blue-600') : ''}
                    px-2 py-1.5 -mx-2 -my-1.5 rounded-lg
                  `}
                >
                  Students 
                  <SortIcon field="students" />
                </button>
              </th>
              <th className={`text-left px-6 py-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <button 
                  onClick={() => handleSort('startDate')}
                  className={`
                    flex items-center gap-2 font-semibold text-xs uppercase tracking-wider
                    transition-all duration-200 group
                    ${isDark 
                      ? 'hover:text-white hover:bg-slate-800/50' 
                      : 'hover:text-slate-900 hover:bg-slate-100'
                    }
                    ${sortField === 'startDate' ? (isDark ? 'text-blue-400' : 'text-blue-600') : ''}
                    px-2 py-1.5 -mx-2 -my-1.5 rounded-lg
                  `}
                >
                  Start Date 
                  <SortIcon field="startDate" />
                </button>
              </th>
              <th className={`text-left px-6 py-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <button 
                  onClick={() => handleSort('completionRate')}
                  className={`
                    flex items-center gap-2 font-semibold text-xs uppercase tracking-wider
                    transition-all duration-200 group
                    ${isDark 
                      ? 'hover:text-white hover:bg-slate-800/50' 
                      : 'hover:text-slate-900 hover:bg-slate-100'
                    }
                    ${sortField === 'completionRate' ? (isDark ? 'text-blue-400' : 'text-blue-600') : ''}
                    px-2 py-1.5 -mx-2 -my-1.5 rounded-lg
                  `}
                >
                  Retention 
                  <SortIcon field="completionRate" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCohorts.map((cohort, index) => (
              <tr 
                key={cohort.id}
                className={`
                  border-b transition-all duration-200 cursor-pointer group
                  ${isDark 
                    ? 'border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-700/50' 
                    : 'border-slate-100 hover:bg-slate-50/80 hover:border-slate-200'
                  }
                `}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold
                        transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg
                        ${isDark ? 'shadow-md' : 'shadow-sm'}
                      `}
                      style={{ 
                        backgroundColor: `${programColors[cohort.program]}15`,
                        color: programColors[cohort.program],
                        boxShadow: `0 4px 12px ${programColors[cohort.program]}20`
                      }}
                    >
                      {cohort.id.split('-')[0]}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                        {cohort.name}
                      </p>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{cohort.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span 
                    className={`
                      inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold
                      transition-all duration-200 group-hover:scale-105
                      ${isDark ? 'shadow-sm' : 'shadow-xs'}
                    `}
                    style={{ 
                      backgroundColor: `${programColors[cohort.program]}15`,
                      color: programColors[cohort.program],
                      boxShadow: `0 2px 8px ${programColors[cohort.program]}15`
                    }}
                  >
                    {cohort.program}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2.5">
                    <div className={`
                      p-1.5 rounded-lg transition-all duration-200
                      ${isDark ? 'bg-slate-800/50 group-hover:bg-slate-700/50' : 'bg-slate-100 group-hover:bg-slate-200'}
                    `}>
                      <Users className={`w-4 h-4 ${isDark ? 'text-slate-400 group-hover:text-blue-400' : 'text-slate-500 group-hover:text-blue-600'} transition-colors`} />
                    </div>
                    <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{cohort.students}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2.5">
                    <div className={`
                      p-1.5 rounded-lg transition-all duration-200
                      ${isDark ? 'bg-slate-800/50 group-hover:bg-slate-700/50' : 'bg-slate-100 group-hover:bg-slate-200'}
                    `}>
                      <Calendar className={`w-4 h-4 ${isDark ? 'text-slate-400 group-hover:text-blue-400' : 'text-slate-500 group-hover:text-blue-600'} transition-colors`} />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{formatDate(cohort.startDate)}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`flex-1 h-2.5 rounded-full overflow-hidden max-w-[120px] ${getProgressBg(cohort.completionRate)} relative`}>
                      <div 
                        className={`
                          h-full ${getProgressColor(cohort.completionRate)} rounded-full 
                          transition-all duration-700 ease-out relative
                          group-hover:shadow-lg
                        `}
                        style={{ 
                          width: `${cohort.completionRate}%`,
                          boxShadow: cohort.completionRate >= 95 
                            ? '0 0 12px rgba(16, 185, 129, 0.4)' 
                            : cohort.completionRate >= 85
                            ? '0 0 12px rgba(59, 130, 246, 0.4)'
                            : 'none'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                    <span className={`font-bold text-sm w-14 text-right ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {cohort.completionRate}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CohortTable;
