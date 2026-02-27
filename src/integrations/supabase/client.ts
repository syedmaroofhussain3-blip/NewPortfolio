import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bjjhqjlqrtkrqcphgmii.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_1oVm9YyCinj3-gE6J-Ut7g_0FlDuD6X';

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
