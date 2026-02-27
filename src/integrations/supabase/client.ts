import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bjjhqjlqrtkrqcphgmii.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqamhxamxxcnRrcnFjcGhnbWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxODM0NjAsImV4cCI6MjA4Nzc1OTQ2MH0.PbbHPLskZquoyNwJYSTHQ8qGb9Xjf_zD784t13IO9IU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  global: {
    headers: {
      'x-supabase-client-platform': 'web',
      'x-supabase-client-platform-version': '1.0.0',
    },
  },
});
