import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Calculator, AlertCircle } from 'lucide-react';

const RunwayCalculator: React.FC = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000);
  const [currentSavings, setCurrentSavings] = useState(30000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(2000);
  const [revenueGrowth, setRevenueGrowth] = useState(10);
  const [runway, setRunway] = useState(() => calculateRunway(monthlyExpenses, currentSavings, monthlyRevenue, revenueGrowth));
  const [isCalculating, setIsCalculating] = useState(false);
  
  function calculateRunway(expenses: number, savings: number, revenue: number, growth: number) {
    let months = 0;
    let currentSavings = savings;
    let currentRevenue = revenue;
    
    while (currentSavings > 0) {
      currentSavings -= (expenses - currentRevenue);
      currentRevenue += currentRevenue * (growth / 100);
      months++;
      
      if (currentRevenue >= expenses) {
        return { months, infinite: true };
      }
      
      if (months >= 36) {
        return { months: 36, infinite: false };
      }
    }
    
    return { months, infinite: false };
  }
  
  const handleUpdate = async () => {
    setIsCalculating(true);
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));
    setRunway(calculateRunway(monthlyExpenses, currentSavings, monthlyRevenue, revenueGrowth));
    setIsCalculating(false);
  };

  const InputField = ({ label, value, onChange, icon: Icon }: any) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">PHP</span>
        </div>
        <input
          type="number"
          value={value}
          onChange={onChange}
          className="input pl-12 pr-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Monthly Expenses (PHP)"
          value={monthlyExpenses}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyExpenses(Number(e.target.value))}
          icon={TrendingDown}
        />
        
        <InputField
          label="Current Savings (PHP)"
          value={currentSavings}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentSavings(Number(e.target.value))}
          icon={DollarSign}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Current Monthly Revenue (PHP)"
          value={monthlyRevenue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyRevenue(Number(e.target.value))}
          icon={TrendingUp}
        />
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue Growth (%)</label>
          <div className="relative">
            <input
              type="number"
              value={revenueGrowth}
              onChange={(e) => setRevenueGrowth(Number(e.target.value))}
              className="input pr-8 py-3 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={handleUpdate}
        disabled={isCalculating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn btn-primary py-4 relative overflow-hidden group"
      >
        <span className={`absolute inset-0 bg-white/20 transition-transform duration-300 transform origin-left ${isCalculating ? 'scale-x-100' : 'scale-x-0'}`}></span>
        <span className="relative flex items-center justify-center gap-2">
          <Calculator className={`h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
          {isCalculating ? 'Calculating...' : 'Update Calculation'}
        </span>
      </motion.button>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={runway.months + (runway.infinite ? 'infinite' : '')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="rounded-xl overflow-hidden"
        >
          <div className="p-6 gradient-bg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-white">Runway Calculation</h4>
              {runway.months < 6 && !runway.infinite && (
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                  <AlertCircle className="h-4 w-4 text-red-200" />
                  <span className="text-sm text-red-200">Critical</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-sm text-white/80">Estimated Runway</span>
                  <h3 className="text-2xl font-bold text-white">
                    {runway.infinite ? 'Infinite' : `${runway.months} months`}
                  </h3>
                </div>
              </div>
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`px-4 py-2 rounded-lg ${
                  runway.infinite 
                    ? 'bg-emerald-500/20 text-emerald-200' 
                    : runway.months < 6 
                    ? 'bg-red-500/20 text-red-200'
                    : 'bg-white/20 text-white'
                }`}
              >
                {runway.infinite ? (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium">Sustainable</span>
                  </div>
                ) : (
                  <span className="font-medium">
                    {runway.months < 6 ? 'At Risk' : 'Limited'}
                  </span>
                )}
              </motion.div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-white/80">
                {runway.infinite 
                  ? 'Your revenue growth will exceed expenses before running out of savings.'
                  : `Based on current savings and ${revenueGrowth}% monthly revenue growth.`}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default RunwayCalculator;