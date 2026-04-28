import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-sm p-8"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
              <Music className="text-white" size={24} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Vibe Mode</h2>
          <p className="mt-2 text-sm text-gray-600">Vibe, Build, Connect</p>
        </div>

        <h3 className="text-xl font-semibold text-center mb-6">Sign in to your account</h3>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10 py-3"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10 pr-10 py-3"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={16} className="text-gray-400" />
                ) : (
                  <Eye size={16} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-light">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary py-3"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4393 21.879V14.89H7.89931V12H10.4393V9.797C10.4393 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1923C13.9503 8.562 13.5613 9.333 13.5613 10.124V12H16.3363L15.8933 14.89H13.5613V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" />
              </svg>
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.55016 21.7502C16.6045 21.7502 21.5583 14.2469 21.5583 7.74211C21.5583 7.53117 21.5536 7.31554 21.5442 7.10461C22.5079 6.40755 23.3395 5.54397 24 4.5552C23.1025 4.9546 22.1496 5.21538 21.1739 5.32888C22.2013 4.71297 22.9705 3.74558 23.3391 2.60598C22.3726 3.17237 21.3156 3.58327 20.2134 3.80898C19.4708 3.01301 18.489 2.48936 17.4197 2.31363C16.3504 2.13789 15.2532 2.32115 14.2977 2.83271C13.3423 3.34427 12.5818 4.15477 12.1338 5.14137C11.6859 6.12798 11.5754 7.23468 11.8195 8.29036C9.86249 8.19215 7.94794 7.68375 6.19998 6.79785C4.45203 5.91196 2.90969 4.66944 1.67297 3.14952C1.0444 4.23324 0.852057 5.51565 1.13503 6.73609C1.418 7.95654 2.15506 9.02345 3.19641 9.71999C2.41463 9.69517 1.64998 9.48468 0.965625 9.10598V9.1702C0.964925 10.3044 1.3581 11.4048 2.07831 12.287C2.79852 13.1693 3.80132 13.7842 4.91625 14.025C4.19206 14.2215 3.43198 14.2503 2.69484 14.1092C3.00945 15.0952 3.62157 15.9531 4.44577 16.5722C5.26997 17.1914 6.26512 17.5489 7.29234 17.5702C5.54842 18.9381 3.39417 19.6737 1.17656 19.6702C0.783287 19.6697 0.390399 19.6461 0 19.5992C2.25286 21.042 4.87353 21.7516 7.55016 21.7502Z" />
              </svg>
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.0002 2C6.47715 2 2 6.47715 2 12C2 16.4183 4.94288 20.1559 9 21.4865V15H7V12H9V9.79617C9 7.48401 10.4865 6 12.5268 6C13.5042 6 14.5 6.2 14.5 6.2V8H13.4677C12.4419 8 12 8.53485 12 9.4V12H14.4L14 15H12V21.4865C16.0571 20.1559 19 16.4183 19 12C19 6.47715 14.5228 2 9.00015 2H12.0002Z" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary-light">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;