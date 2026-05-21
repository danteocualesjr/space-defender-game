import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('bloomtech-theme');
    return saved ? saved === 'dark' : true; // Default to dark
  });

  useEffect(() => {
    localStorage.setItem('bloomtech-theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('light-mode', !isDark);
    document.documentElement.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
