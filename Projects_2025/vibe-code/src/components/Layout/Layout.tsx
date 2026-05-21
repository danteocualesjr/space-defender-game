import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { 
  ChevronLeft, 
  ChevronRight, 
  Laptop, 
  Moon, 
  Sun
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getLayoutTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/goals':
        return 'Goals';
      case '/social':
        return 'Social';
      case '/pricing':
        return 'Pricing';
      default:
        return 'Vibe Mode';
    }
  };

  const themeIcons = {
    light: <Sun className="w-5 h-5" />,
    dark: <Moon className="w-5 h-5" />,
    system: <Laptop className="w-5 h-5" />
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={getLayoutTitle()} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 Vibe Mode. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
              
              <div className="flex items-center space-x-2 border rounded-lg p-1">
                {(['light', 'dark', 'system'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-1.5 rounded-md transition-colors ${
                      theme === t ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                    aria-label={`Switch to ${t} theme`}
                  >
                    {themeIcons[t]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;