import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://qmvrpspsflqyvclpjqpe.supabase.co'
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtdnJwc3BzZmxxeXZjbHBqcXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NTA2MTgsImV4cCI6MjA1MzAyNjYxOH0.JHHu0zmL4JBlFO4Ifs0-o4kNR6ZW0Fpi3kAsKnRUWtQ';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
