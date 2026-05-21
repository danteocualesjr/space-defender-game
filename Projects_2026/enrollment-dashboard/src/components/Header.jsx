import { Bell, Settings, Calendar, Sun, Moon, Search, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className={`
      sticky top-0 z-30 
      backdrop-blur-xl 
      border-b transition-all duration-300
      ${isDark 
        ? 'bg-slate-900/80 border-white/5' 
        : 'bg-white/80 border-slate-200'
      }
    `}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 py-4">
        {/* Left side - Title and breadcrumb */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
            <h1 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Dashboard
            </h1>
          </div>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Welcome back! Here's your enrollment overview.
          </p>
        </div>

        {/* Right side - Search, Date and Actions */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className={`
            hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl
            transition-all duration-300 group
            ${isDark 
              ? 'bg-slate-800/50 border border-slate-700/50 focus-within:border-blue-500/50 focus-within:bg-slate-800 focus-within:shadow-lg focus-within:shadow-blue-500/20' 
              : 'bg-slate-100 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-md'
            }
          `}>
            <Search className={`w-4 h-4 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-slate-400 group-focus-within:text-blue-500'}`} />
            <input 
              type="text"
              placeholder="Search students, cohorts..."
              className={`
                bg-transparent text-sm w-48 outline-none
                ${isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'}
              `}
            />
            <kbd className={`
              hidden xl:inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold
              transition-all duration-200
              ${isDark ? 'bg-slate-700/80 text-slate-300 border border-slate-600' : 'bg-slate-200 text-slate-600 border border-slate-300'}
            `}>
              ⌘K
            </kbd>
          </div>

          {/* Date Display */}
          <div className={`
            hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-xl
            transition-all duration-200 hover:scale-105
            ${isDark 
              ? 'bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30' 
              : 'bg-slate-100 border border-slate-200 hover:border-blue-500/30'
            }
          `}>
            <Calendar className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
            <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{currentDate}</span>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`
              relative p-2.5 rounded-xl overflow-hidden
              transition-all duration-300 group
              ${isDark 
                ? 'bg-slate-800 border border-slate-700 hover:border-yellow-500/50' 
                : 'bg-slate-100 border border-slate-200 hover:border-blue-500/50'
              }
            `}
          >
            <div className="relative z-10">
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400 transition-transform group-hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-blue-500 transition-transform group-hover:-rotate-12" />
              )}
            </div>
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
              ${isDark 
                ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10' 
                : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
              }
            `}></div>
          </button>

          {/* Notification Button */}
          <button className={`
            relative p-2.5 rounded-xl
            transition-all duration-200 group
            ${isDark 
              ? 'bg-slate-800 border border-slate-700 hover:border-blue-500/50' 
              : 'bg-slate-100 border border-slate-200 hover:border-blue-500/50'
            }
          `}>
            <Bell className={`w-5 h-5 transition-colors ${isDark ? 'text-slate-400 group-hover:text-blue-400' : 'text-slate-500 group-hover:text-blue-500'}`} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
            <span className="absolute top-1 right-1 w-3 h-3 bg-rose-500/30 rounded-full animate-ping"></span>
          </button>

          {/* Settings Button */}
          <button className={`
            p-2.5 rounded-xl
            transition-all duration-200 group
            ${isDark 
              ? 'bg-slate-800 border border-slate-700 hover:border-blue-500/50' 
              : 'bg-slate-100 border border-slate-200 hover:border-blue-500/50'
            }
          `}>
            <Settings className={`w-5 h-5 transition-all ${isDark ? 'text-slate-400 group-hover:text-blue-400' : 'text-slate-500 group-hover:text-blue-500'} group-hover:rotate-90`} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
