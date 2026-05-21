import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  DollarSign,
  Bell,
  LogOut
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { 
    section: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', active: true, badge: null },
      { icon: Users, label: 'Students', active: false, badge: '2.4k' },
      { icon: GraduationCap, label: 'Cohorts', active: false, badge: '8' },
      { icon: BookOpen, label: 'Courses', active: false, badge: null },
    ]
  },
  {
    section: 'Analytics',
    items: [
      { icon: BarChart3, label: 'Reports', active: false, badge: null },
      { icon: DollarSign, label: 'Revenue', active: false, badge: null },
    ]
  },
  {
    section: 'System',
    items: [
      { icon: Bell, label: 'Notifications', active: false, badge: '3' },
      { icon: Settings, label: 'Settings', active: false, badge: null },
      { icon: HelpCircle, label: 'Help Center', active: false, badge: null },
    ]
  }
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { isDark } = useTheme();
  
  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen z-40
        transition-all duration-300 ease-out
        ${collapsed ? 'w-20' : 'w-72'}
        ${isDark 
          ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-white/5' 
          : 'bg-gradient-to-b from-white via-slate-50 to-slate-100 border-r border-slate-200 shadow-xl'
        }
      `}
    >
      {/* Logo Section */}
      <div className={`
        h-20 flex items-center px-6 
        border-b transition-colors duration-300
        ${isDark ? 'border-white/5' : 'border-slate-200'}
      `}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
          </div>
          <div className={`transition-all duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <h1 className={`text-lg font-bold tracking-tight whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Bloom<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Tech</span>
            </h1>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Enrollment Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto h-[calc(100vh-180px)]">
        {navItems.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            {!collapsed && (
              <p className={`
                px-3 mb-3 text-xs font-semibold uppercase tracking-wider
                ${isDark ? 'text-slate-500' : 'text-slate-400'}
              `}>
                {group.section}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item, index) => (
                <li key={index}>
                  <button
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                      transition-all duration-200 group relative
                      ${item.active 
                        ? isDark 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/10 text-white shadow-lg shadow-blue-500/10' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : isDark
                          ? 'text-slate-400 hover:text-white hover:bg-white/5'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }
                    `}
                  >
                    {item.active && (
                      <div className={`
                        absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full
                        ${isDark ? 'bg-blue-400' : 'bg-white'}
                      `}></div>
                    )}
                    <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${!item.active && 'group-hover:scale-110'}`} />
                    <span className={`flex-1 text-left text-sm font-medium whitespace-nowrap transition-all duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                      {item.label}
                    </span>
                    {item.badge && !collapsed && (
                      <span className={`
                        px-2 py-0.5 text-xs font-semibold rounded-full
                        ${item.active 
                          ? isDark ? 'bg-blue-400/20 text-blue-300' : 'bg-white/20 text-white'
                          : isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className={`
        absolute bottom-0 left-0 right-0 p-4
        border-t transition-colors duration-300
        ${isDark ? 'border-white/5 bg-slate-900/50' : 'border-slate-200 bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>Admin User</p>
              <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>admin@bloomtech.com</p>
            </div>
          )}
          {!collapsed && (
            <button className={`
              p-2 rounded-lg transition-colors
              ${isDark ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'}
            `}>
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`
          absolute -right-3 top-24 w-6 h-6 rounded-full
          flex items-center justify-center
          transition-all duration-200 z-50
          ${isDark 
            ? 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700' 
            : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 shadow-md'
          }
        `}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
};

export default Sidebar;
