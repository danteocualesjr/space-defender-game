import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatNumber, formatCurrency } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeLabel = 'vs last month',
  icon: Icon, 
  accentColor = 'blue',
  isCurrency = false,
  isPercentage = false,
  invertChange = false,
  delay = 0 
}) => {
  const { isDark } = useTheme();
  
  const colorMap = {
    blue: {
      iconBg: isDark ? 'from-blue-500/20 to-cyan-500/10' : 'from-blue-500 to-cyan-500',
      iconColor: isDark ? 'text-blue-400' : 'text-white',
      accent: '#3b82f6',
      glow: 'shadow-blue-500/20',
      gradient: isDark ? 'from-blue-500/10 via-transparent to-transparent' : 'from-blue-500/5 via-transparent to-transparent',
    },
    emerald: {
      iconBg: isDark ? 'from-emerald-500/20 to-teal-500/10' : 'from-emerald-500 to-teal-500',
      iconColor: isDark ? 'text-emerald-400' : 'text-white',
      accent: '#10b981',
      glow: 'shadow-emerald-500/20',
      gradient: isDark ? 'from-emerald-500/10 via-transparent to-transparent' : 'from-emerald-500/5 via-transparent to-transparent',
    },
    coral: {
      iconBg: isDark ? 'from-orange-500/20 to-rose-500/10' : 'from-orange-500 to-rose-500',
      iconColor: isDark ? 'text-orange-400' : 'text-white',
      accent: '#f97316',
      glow: 'shadow-orange-500/20',
      gradient: isDark ? 'from-orange-500/10 via-transparent to-transparent' : 'from-orange-500/5 via-transparent to-transparent',
    },
    violet: {
      iconBg: isDark ? 'from-violet-500/20 to-purple-500/10' : 'from-violet-500 to-purple-500',
      iconColor: isDark ? 'text-violet-400' : 'text-white',
      accent: '#8b5cf6',
      glow: 'shadow-violet-500/20',
      gradient: isDark ? 'from-violet-500/10 via-transparent to-transparent' : 'from-violet-500/5 via-transparent to-transparent',
    }
  };

  const colors = colorMap[accentColor] || colorMap.blue;
  
  const isPositive = invertChange ? change < 0 : change > 0;
  const isNeutral = change === 0;
  
  const formattedValue = isCurrency 
    ? formatCurrency(value) 
    : isPercentage 
      ? `${value}%` 
      : formatNumber(value);

  return (
    <div 
      className={`
        group relative overflow-hidden rounded-2xl p-6
        transition-all duration-500 ease-out
        hover:-translate-y-1.5 hover:scale-[1.02]
        animate-slide-up
        ${isDark 
          ? `bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 border border-white/5 hover:border-white/10 ${colors.glow}` 
          : `bg-white border border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-2xl`
        }
      `}
      style={{ 
        '--accent-color': colors.accent,
        animationDelay: `${delay}ms`
      }}
    >
      {/* Top accent line with gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        style={{ 
          background: `linear-gradient(90deg, ${colors.accent} 0%, ${colors.accent}80 50%, transparent 100%)`,
          boxShadow: `0 0 8px ${colors.accent}40`
        }}
      />
      
      {/* Background gradient effect */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-radial ${colors.gradient} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700`}></div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className={`
            p-3.5 rounded-xl bg-gradient-to-br ${colors.iconBg} 
            transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
            ${!isDark && 'shadow-lg'}
            relative overflow-hidden
          `}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Icon className={`w-5 h-5 ${colors.iconColor} relative z-10`} />
          </div>
          
          {/* Enhanced Sparkline */}
          <div className={`flex items-end gap-0.5 h-10 ${isDark ? 'opacity-30 group-hover:opacity-50' : 'opacity-20 group-hover:opacity-40'} transition-opacity duration-300`}>
            {[40, 65, 45, 70, 55, 80, 60, 75].map((h, i) => (
              <div 
                key={i} 
                className="w-1.5 rounded-full transition-all duration-500 group-hover:scale-y-110"
                style={{ 
                  height: `${h}%`, 
                  backgroundColor: colors.accent,
                  transitionDelay: `${i * 50}ms`,
                  boxShadow: `0 0 4px ${colors.accent}30`
                }}
              />
            ))}
          </div>
        </div>
        
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'} group-hover:scale-105 transition-transform duration-300 inline-block`}>
            {formattedValue}
          </p>
          
          {/* Enhanced Change indicator */}
          <div className="flex items-center gap-2.5">
            <div className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold
              transition-all duration-300 group-hover:scale-105
              ${isNeutral 
                ? isDark ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-100 text-slate-500'
                : isPositive 
                  ? isDark ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : isDark ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' : 'bg-rose-50 text-rose-600 border border-rose-200'
              }
            `}>
              {isNeutral ? (
                <Minus className="w-3.5 h-3.5" />
              ) : isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>{change > 0 ? '+' : ''}{change}%</span>
            </div>
            <span className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {changeLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
