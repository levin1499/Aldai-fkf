import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.x',
    },
  },
  db: {
    schema: 'public',
  },
  realtime: { params: { eventsPerSecond: 10 } }
});

export const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Missing');
    
    // Test basic connectivity first
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: { 'apikey': supabaseAnonKey }
    });
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables. Please check your .env file.');
    }
    
    if (!supabaseUrl.startsWith('https://')) {
      throw new Error('Invalid Supabase URL format. Should start with https://');
    }
    
    if (!response.ok) {
      console.error('Supabase API not accessible:', response.status, response.statusText);
      throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
    }
    
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Supabase connection error:', error);
      throw error;
    }
    
    console.log('Supabase connection successful:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network connection failed. Please check:\n1. Your internet connection\n2. Supabase URL and API key in .env file\n3. Supabase project status');
    }
    
    throw new Error(
      error instanceof Error 
        ? `Supabase connection error: ${error.message}`
        : 'Failed to connect to Supabase'
    );
  }
};

// Initialize connection test on app start
export const initializeSupabase = async () => {
  try {
    await testConnection();
    console.log('✅ Supabase connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    toast.error('Database connection failed. Please check your internet connection.');
    return false;
  }
};

// Export a function to check if we have valid environment variables
export const hasValidConfig = () => {
  return !!(supabaseUrl && supabaseAnonKey && 
    supabaseUrl.startsWith('https://') && 
    supabaseAnonKey.length > 20);
};