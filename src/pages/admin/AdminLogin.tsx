import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';

type FormData = {
  username: string;
  password: string;
};

const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const success = await login(data.username, data.password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid username or password');
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
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="mt-2 text-qatar-cream">Sign in to access the admin dashboard</p>
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
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-qatar-black" />
              </div>
              <input
                id="username"
                type="text"
                className={`block w-full pl-10 pr-3 py-3 border ${errors.username ? 'border-red-500' : 'border-qatar-gold'} rounded-lg shadow-sm focus:ring-qatar-gold focus:border-qatar-gold transition-colors`}
                {...register('username', { required: 'Username is required' })}
                autoComplete="username"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
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
        </form>
        
        <div className="px-6 py-4 bg-qatar-cream border-t border-qatar-gold">
          <p className="text-xs text-qatar-black text-center">
            Secure access to FKF Aldai management system
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminLogin;