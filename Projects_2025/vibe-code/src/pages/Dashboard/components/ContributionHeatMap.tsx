import React from 'react';
import { format, parse, subDays, eachDayOfInterval } from 'date-fns';

const generateFakeData = () => {
  const today = new Date();
  const startDate = subDays(today, 364);
  
  const dates = eachDayOfInterval({
    start: startDate,
    end: today
  });
  
  return dates.map(date => {
    // Generate a random value between 0 and 4, with more likelihood of 0
    const random = Math.random();
    let value = 0;
    
    if (random > 0.6) value = 1;
    if (random > 0.75) value = 2;
    if (random > 0.85) value = 3;
    if (random > 0.95) value = 4;
    
    return {
      date: format(date, 'yyyy-MM-dd'),
      value
    };
  });
};

const ContributionHeatMap: React.FC = () => {
  const contributions = generateFakeData();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Group contributions by week (for display)
  const weeks: Array<Array<{ date: string; value: number } | null>> = [];
  let currentWeek: Array<{ date: string; value: number } | null> = Array(7).fill(null);
  
  contributions.forEach(contribution => {
    const date = parse(contribution.date, 'yyyy-MM-dd', new Date());
    const dayOfWeek = date.getDay();
    
    currentWeek[dayOfWeek] = contribution;
    
    if (dayOfWeek === 6) {
      weeks.push([...currentWeek]);
      currentWeek = Array(7).fill(null);
    }
  });
  
  // Add the last incomplete week
  if (currentWeek.some(day => day !== null)) {
    weeks.push([...currentWeek]);
  }
  
  // Determine which months to display
  const monthLabels = [];
  let currentMonth = -1;
  
  contributions.forEach(contribution => {
    const date = parse(contribution.date, 'yyyy-MM-dd', new Date());
    const month = date.getMonth();
    
    if (month !== currentMonth) {
      monthLabels.push({
        month,
        weekIndex: Math.floor(monthLabels.length / 7)
      });
      currentMonth = month;
    }
  });
  
  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-max">
        <div className="flex mb-2">
          <div className="w-8"></div>
          <div className="flex space-x-2">
            {monthLabels.map((label, index) => (
              <div key={index} className="text-xs text-gray-500" style={{ marginLeft: index === 0 ? '0px' : '16px' }}>
                {months[label.month]}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex">
          <div className="flex flex-col h-full justify-between pr-2">
            {days.map((day, index) => (
              <div key={day} className="h-5 text-xs text-gray-500 flex items-center">
                {index % 2 === 0 ? day : ''}
              </div>
            ))}
          </div>
          
          <div className="grid grid-flow-col gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${
                      day
                        ? day.value === 0
                          ? 'bg-gray-100'
                          : day.value === 1
                          ? 'bg-primary/20'
                          : day.value === 2
                          ? 'bg-primary/40'
                          : day.value === 3
                          ? 'bg-primary/70'
                          : 'bg-primary'
                        : 'bg-gray-100'
                    }`}
                    title={day ? `${day.date}: ${day.value} contributions` : 'No contributions'}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-2 items-center">
          <div className="text-xs text-gray-500 mr-2">Less</div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/70"></div>
            <div className="w-3 h-3 rounded-sm bg-primary"></div>
          </div>
          <div className="text-xs text-gray-500 ml-2">More</div>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatMap;