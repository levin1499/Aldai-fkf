import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle } from 'lucide-react';
import { useLeagueOfficialAuth } from '../../../contexts/LeagueOfficialAuthContext';
import { useForm } from 'react-hook-form';
import { LeagueOfficialLoginData } from '../../../models/types';

const OfficialLogin: React.FC = () => {
  const { login } = useLeagueOfficialAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LeagueOfficialLoginData>();
  
  const onSubmit = async (data: LeagueOfficialLoginData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await login(data);
      if (result.success) {
        navigate('/officials/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-qatar-gold">
        <div className="bg-qatar-gradient px-6 py-8 text-white text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-qatar-gold/10 to-transparent"></div>
          <div className="relative">
            <div className="h-16 w-16 bg-qatar-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-qatar-maroon" />
            </div>
            <h1 className="text-2xl font-bold">League Official Login</h1>
            <p className="mt-2 text-qatar-cream">Sign in to access the officials portal</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-qatar-black" />
              </div>
              <input
                id="email"
                type="email"
                className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-qatar-gold'} rounded-lg shadow-sm focus:ring-qatar-gold focus:border-qatar-gold transition-colors`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-qatar-black" />
              </div>
              <input
                id="password"
                type="password"
                className={`block w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-500' : 'border-qatar-gold'} rounded-lg shadow-sm focus:ring-qatar-gold focus:border-qatar-gold transition-colors`}
                {...register('password', { required: 'Password is required' })}
                autoComplete="current-password"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-qatar-maroon bg-gold-gradient hover:from-qatar-lightGold hover:to-qatar-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-qatar-gold transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-qatar-black">
              Don't have an account?{' '}
              <Link to="/officials/signup" className="text-qatar-maroon hover:text-qatar-darkMaroon font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
        
        <div className="px-6 py-4 bg-qatar-cream border-t border-qatar-gold">
          <p className="text-xs text-qatar-black text-center">
            Secure access to FKF Aldai officials portal
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OfficialLogin;