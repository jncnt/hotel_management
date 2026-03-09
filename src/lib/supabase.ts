import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://svzvhwiinfdlittpnzxj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2enZod2lpbmZkbGl0dHBuenhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNDgyMzIsImV4cCI6MjA4NzkyNDIzMn0.30w0P-1o0oPxlCYMl5vA52ymGXYwTHGHwXkbqNmQRYI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
