import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initializeSupabase } from './lib/supabase';
import './index.css';

// Initialize Supabase connection and render app
const startApp = async () => {
  await initializeSupabase();
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

startApp();
