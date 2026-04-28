import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly');
  };
  
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        { name: 'Basic project tracking', included: true },
        { name: 'Simple analytics', included: true },
        { name: 'Limited social features', included: true },
        { name: 'Standard dashboard access', included: true },
        { name: 'Up to 3 projects', included: true },
        { name: 'Basic GitHub integration', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Unlimited project tracking', included: false },
        { name: 'Enhanced social features', included: false },
        { name: 'Custom dashboard layouts', included: false },
        { name: 'Priority support', included: false },
        { name: 'Extended playlist sharing', included: false },
      ]
    },
    {
      name: 'Premium',
      description: 'For serious builders and creators',
      price: {
        monthly: 10,
        yearly: 8
      },
      features: [
        { name: 'Basic project tracking', included: true },
        { name: 'Simple analytics', included: true },
        { name: 'Limited social features', included: true },
        { name: 'Standard dashboard access', included: true },
        { name: 'Up to 3 projects', included: true },
        { name: 'Basic GitHub integration', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Unlimited project tracking', included: true },
        { name: 'Enhanced social features', included: true },
        { name: 'Custom dashboard layouts', included: true },
        { name: 'Priority support', included: true },
        { name: 'Extended playlist sharing', included: true },
      ]
    }
  ];
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
        </p>
        
        <div className="flex items-center justify-center mt-8">
          <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={toggleBillingPeriod}
            className="relative inline-flex h-6 w-11 mx-3 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            style={{ backgroundColor: billingPeriod === 'yearly' ? 'rgb(var(--color-primary))' : 'rgb(var(--color-primary-light))' }}
          >
            <span className="sr-only">Toggle billing period</span>
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                billingPeriod === 'yearly' ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Yearly <span className="text-xs text-success">Save 20%</span>
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl p-8 ${
              plan.name === 'Premium' 
                ? 'border-2 border-primary/30 relative overflow-hidden' 
                : 'border border-gray-200'
            }`}
          >
            {plan.name === 'Premium' && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-white text-xs font-bold py-1 px-3 transform rotate-45 translate-x-7 translate-y-2">
                  POPULAR
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="text-gray-500 mt-1">{plan.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">${plan.price[billingPeriod]}</span>
                <span className="text-lg text-gray-500 ml-2">/month</span>
              </div>
              {billingPeriod === 'yearly' && plan.price.yearly > 0 && (
                <p className="text-sm text-success mt-1">Billed annually (${plan.price.yearly * 12}/year)</p>
              )}
            </div>
            
            <div className="mb-8">
              <button className={`w-full py-3 rounded-lg font-medium ${
                plan.name === 'Premium' 
                  ? 'bg-primary text-white hover:bg-primary-light' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}>
                {plan.name === 'Free' ? 'Sign Up for Free' : 'Get Started'}
              </button>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">What's included:</h4>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`flex-shrink-0 mr-2 ${feature.included ? 'text-success' : 'text-gray-300'}`}>
                      {feature.included ? <Check size={18} /> : <X size={18} />}
                    </span>
                    <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 bg-gray-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Can I cancel my subscription?</h4>
            <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time. If you cancel, you'll have access to Premium features until the end of your billing period.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Is there a free trial for Premium?</h4>
            <p className="text-gray-600 text-sm">We offer a 14-day free trial for the Premium plan. No credit card required.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Can I change plans later?</h4>
            <p className="text-gray-600 text-sm">Absolutely! You can upgrade or downgrade your plan at any time.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">What payment methods do you accept?</h4>
            <p className="text-gray-600 text-sm">We accept all major credit cards and PayPal. Cryptocurrency payment options are coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;