// Mock data for BloomTech Enrollment Dashboard

// Monthly enrollment and withdrawal data (last 12 months)
export const monthlyData = [
  { month: 'Feb 2025', enrollments: 145, withdrawals: 12, revenue: 435000 },
  { month: 'Mar 2025', enrollments: 168, withdrawals: 15, revenue: 504000 },
  { month: 'Apr 2025', enrollments: 152, withdrawals: 18, revenue: 456000 },
  { month: 'May 2025', enrollments: 189, withdrawals: 14, revenue: 567000 },
  { month: 'Jun 2025', enrollments: 201, withdrawals: 22, revenue: 603000 },
  { month: 'Jul 2025', enrollments: 178, withdrawals: 19, revenue: 534000 },
  { month: 'Aug 2025', enrollments: 234, withdrawals: 25, revenue: 702000 },
  { month: 'Sep 2025', enrollments: 256, withdrawals: 21, revenue: 768000 },
  { month: 'Oct 2025', enrollments: 243, withdrawals: 28, revenue: 729000 },
  { month: 'Nov 2025', enrollments: 198, withdrawals: 16, revenue: 594000 },
  { month: 'Dec 2025', enrollments: 167, withdrawals: 13, revenue: 501000 },
  { month: 'Jan 2026', enrollments: 289, withdrawals: 24, revenue: 867000 },
];

// Course/Program breakdown
export const courseData = [
  { 
    name: 'Full Stack Web Dev', 
    students: 847, 
    color: '#2aa5ff',
    percentage: 42 
  },
  { 
    name: 'Data Science', 
    students: 523, 
    color: '#10b981',
    percentage: 26 
  },
  { 
    name: 'Backend Development', 
    students: 412, 
    color: '#8b5cf6',
    percentage: 20 
  },
  { 
    name: 'iOS Development', 
    students: 234, 
    color: '#f97316',
    percentage: 12 
  },
];

// Cohort tracking data
export const cohortData = [
  {
    id: 'WEB-48',
    name: 'Web Development 48',
    program: 'Full Stack Web Dev',
    students: 32,
    startDate: '2025-11-04',
    endDate: '2026-05-04',
    completionRate: 94,
    status: 'active'
  },
  {
    id: 'WEB-49',
    name: 'Web Development 49',
    program: 'Full Stack Web Dev',
    students: 28,
    startDate: '2025-12-02',
    endDate: '2026-06-02',
    completionRate: 89,
    status: 'active'
  },
  {
    id: 'DS-22',
    name: 'Data Science 22',
    program: 'Data Science',
    students: 24,
    startDate: '2025-10-14',
    endDate: '2026-04-14',
    completionRate: 96,
    status: 'active'
  },
  {
    id: 'DS-23',
    name: 'Data Science 23',
    program: 'Data Science',
    students: 31,
    startDate: '2026-01-06',
    endDate: '2026-07-06',
    completionRate: 100,
    status: 'active'
  },
  {
    id: 'BE-15',
    name: 'Backend Dev 15',
    program: 'Backend Development',
    students: 22,
    startDate: '2025-09-08',
    endDate: '2026-03-08',
    completionRate: 91,
    status: 'active'
  },
  {
    id: 'IOS-12',
    name: 'iOS Development 12',
    program: 'iOS Development',
    students: 18,
    startDate: '2025-11-18',
    endDate: '2026-05-18',
    completionRate: 88,
    status: 'active'
  },
  {
    id: 'WEB-50',
    name: 'Web Development 50',
    program: 'Full Stack Web Dev',
    students: 35,
    startDate: '2026-01-13',
    endDate: '2026-07-13',
    completionRate: 100,
    status: 'active'
  },
  {
    id: 'BE-16',
    name: 'Backend Dev 16',
    program: 'Backend Development',
    students: 26,
    startDate: '2026-01-06',
    endDate: '2026-07-06',
    completionRate: 100,
    status: 'active'
  },
];

// Recent activity feed
export const recentActivity = [
  {
    id: 1,
    type: 'enrollment',
    studentName: 'Sarah Chen',
    program: 'Full Stack Web Dev',
    cohort: 'WEB-50',
    timestamp: '2026-01-17T09:45:00',
    avatar: 'SC'
  },
  {
    id: 2,
    type: 'enrollment',
    studentName: 'Marcus Johnson',
    program: 'Data Science',
    cohort: 'DS-23',
    timestamp: '2026-01-17T09:32:00',
    avatar: 'MJ'
  },
  {
    id: 3,
    type: 'withdrawal',
    studentName: 'Emily Rodriguez',
    program: 'Backend Development',
    cohort: 'BE-15',
    reason: 'Personal circumstances',
    timestamp: '2026-01-17T08:15:00',
    avatar: 'ER'
  },
  {
    id: 4,
    type: 'enrollment',
    studentName: 'David Kim',
    program: 'Full Stack Web Dev',
    cohort: 'WEB-50',
    timestamp: '2026-01-17T07:58:00',
    avatar: 'DK'
  },
  {
    id: 5,
    type: 'enrollment',
    studentName: 'Aisha Patel',
    program: 'iOS Development',
    cohort: 'IOS-12',
    timestamp: '2026-01-16T16:42:00',
    avatar: 'AP'
  },
  {
    id: 6,
    type: 'enrollment',
    studentName: 'James Wilson',
    program: 'Data Science',
    cohort: 'DS-23',
    timestamp: '2026-01-16T15:20:00',
    avatar: 'JW'
  },
  {
    id: 7,
    type: 'withdrawal',
    studentName: 'Lisa Thompson',
    program: 'Full Stack Web Dev',
    cohort: 'WEB-49',
    reason: 'Found employment',
    timestamp: '2026-01-16T14:05:00',
    avatar: 'LT'
  },
  {
    id: 8,
    type: 'enrollment',
    studentName: 'Michael Brown',
    program: 'Backend Development',
    cohort: 'BE-16',
    timestamp: '2026-01-16T11:30:00',
    avatar: 'MB'
  },
  {
    id: 9,
    type: 'enrollment',
    studentName: 'Jennifer Garcia',
    program: 'Full Stack Web Dev',
    cohort: 'WEB-50',
    timestamp: '2026-01-16T10:15:00',
    avatar: 'JG'
  },
  {
    id: 10,
    type: 'enrollment',
    studentName: 'Robert Martinez',
    program: 'Data Science',
    cohort: 'DS-23',
    timestamp: '2026-01-16T09:45:00',
    avatar: 'RM'
  },
];

// Summary metrics
export const summaryMetrics = {
  totalEnrollments: 2420,
  enrollmentChange: 12.5, // percentage change from last month
  activeStudents: 2016,
  activeChange: 8.3,
  totalWithdrawals: 227,
  withdrawalRate: 9.4, // percentage
  withdrawalChange: -2.1, // negative means improvement
  monthlyRevenue: 867000,
  revenueChange: 15.2,
  averageCompletionRate: 93.2,
  totalCohorts: 8,
  graduatesThisYear: 1847,
};

// Weekly enrollment data for sparklines
export const weeklyEnrollments = [
  { week: 'W1', value: 42 },
  { week: 'W2', value: 38 },
  { week: 'W3', value: 55 },
  { week: 'W4', value: 48 },
  { week: 'W5', value: 62 },
  { week: 'W6', value: 58 },
  { week: 'W7', value: 71 },
  { week: 'W8', value: 65 },
];

// Program colors map
export const programColors = {
  'Full Stack Web Dev': '#2aa5ff',
  'Data Science': '#10b981',
  'Backend Development': '#8b5cf6',
  'iOS Development': '#f97316',
};

// Format currency
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format number with commas
export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Format relative time
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
};
