import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Power
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/goals', label: 'Goals', icon: <Target size={20} /> },
    { path: '/social', label: 'Social', icon: <Users size={20} /> },
    { path: '/pricing', label: 'Pricing', icon: <CreditCard size={20} /> },
  ];
  
  const secondaryMenuItems = [
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
    { path: '/help', label: 'Help & Support', icon: <HelpCircle size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.aside
      initial={{ width: isOpen ? 240 : 80 }}
      animate={{ width: isOpen ? 240 : 80 }}
      className="bg-white border-r border-gray-200 h-screen overflow-y-auto overflow-x-hidden transition-all"
    >
      <div className="p-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-6 rounded-full bg-gray-200 cursor-pointer group">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 16 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute left-0 w-6 h-6 rounded-full gradient-bg shadow-lg flex items-center justify-center"
            >
              <Power size={14} className="text-white" />
            </motion.div>
            <div className="absolute inset-0 rounded-full group-hover:ring-2 ring-primary/20 transition-all"></div>
          </div>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="font-bold text-lg text-gray-900">Vibe Mode</span>
            </motion.div>
          )}
        </Link>
      </div>
      
      <div className="px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="ml-3 overflow-hidden whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="px-3 pt-2 pb-4 mt-auto">
        <div className="border-t border-gray-200 pt-4">
          <nav className="space-y-1">
            {secondaryMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="ml-3 overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            ))}
            
            <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <span className="flex-shrink-0">
                <LogOut size={20} />
              </span>
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="ml-3 overflow-hidden whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;