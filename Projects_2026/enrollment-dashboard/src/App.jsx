import { useState } from 'react';
import { Users, UserPlus, UserMinus, DollarSign } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import EnrollmentChart from './components/EnrollmentChart';
import CourseBreakdown from './components/CourseBreakdown';
import CohortTable from './components/CohortTable';
import ActivityFeed from './components/ActivityFeed';
import { summaryMetrics } from './data/mockData';

function DashboardContent() {
  const { isDark } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`
      min-h-screen transition-colors duration-300
      ${isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-slate-100 via-slate-50 to-white'
      }
    `}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`
          absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl
          ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'}
          animate-pulse
        `} style={{ animationDuration: '4s' }}></div>
        <div className={`
          absolute top-1/2 -left-40 w-80 h-80 rounded-full blur-3xl
          ${isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'}
          animate-pulse
        `} style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className={`
          absolute -bottom-40 right-1/3 w-80 h-80 rounded-full blur-3xl
          ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-500/5'}
          animate-pulse
        `} style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className={`
        fixed inset-0 pointer-events-none
        ${isDark ? 'opacity-30' : 'opacity-50'}
      `} style={{
        backgroundImage: `linear-gradient(${isDark ? 'rgba(59, 130, 246, 0.03)' : 'rgba(59, 130, 246, 0.02)'} 1px, transparent 1px), 
                         linear-gradient(90deg, ${isDark ? 'rgba(59, 130, 246, 0.03)' : 'rgba(59, 130, 246, 0.02)'} 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main Content */}
      <main className={`
        relative z-10 transition-all duration-300
        ${sidebarCollapsed ? 'ml-20' : 'ml-72'}
      `}>
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 mb-8 lg:mb-10">
            <MetricCard
              title="Total Enrollments"
              value={summaryMetrics.totalEnrollments}
              change={summaryMetrics.enrollmentChange}
              icon={UserPlus}
              accentColor="blue"
              delay={0}
            />
            <MetricCard
              title="Active Students"
              value={summaryMetrics.activeStudents}
              change={summaryMetrics.activeChange}
              icon={Users}
              accentColor="emerald"
              delay={100}
            />
            <MetricCard
              title="Withdrawal Rate"
              value={summaryMetrics.withdrawalRate}
              change={summaryMetrics.withdrawalChange}
              icon={UserMinus}
              accentColor="coral"
              isPercentage={true}
              invertChange={true}
              delay={200}
            />
            <MetricCard
              title="Monthly Revenue"
              value={summaryMetrics.monthlyRevenue}
              change={summaryMetrics.revenueChange}
              icon={DollarSign}
              accentColor="violet"
              isCurrency={true}
              delay={300}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6 mb-8 lg:mb-10">
            <div className="xl:col-span-2">
              <EnrollmentChart />
            </div>
            <div className="xl:col-span-1">
              <CourseBreakdown />
            </div>
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6">
            <div className="xl:col-span-2">
              <CohortTable />
            </div>
            <div className="xl:col-span-1">
              <ActivityFeed />
            </div>
          </div>

          {/* Footer */}
          <footer className={`
            mt-8 lg:mt-12 py-6 
            border-t transition-colors duration-300
            ${isDark ? 'border-slate-800' : 'border-slate-200'}
          `}>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                © 2026 BloomTech. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Dashboard v2.0
                </span>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>System Online</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}

export default App;
