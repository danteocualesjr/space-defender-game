import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New project milestone reached',
      description: 'You\'ve completed 50% of your current project.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Weekly coding goal update',
      description: 'You\'ve reached 80% of your weekly coding goal.',
      time: '1 day ago',
      read: false
    }
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <motion.div 
                animate={{ width: searchOpen ? '240px' : '40px' }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className={`input h-10 pr-10 transition-all ${
                    searchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-500 hover:text-gray-700"
                >
                  <Search size={18} />
                </button>
              </motion.div>
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-accent rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-10"
                >
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      <button className="text-xs text-primary hover:underline">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.read ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-900">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {notification.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <button className="text-sm text-primary hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <User size={16} />
                </div>
              </button>
              
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-10"
                >
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Jamie Chen</h4>
                        <p className="text-xs text-gray-500">jamie@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
                      Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
                      Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
                      Upgrade to Premium
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50">
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;