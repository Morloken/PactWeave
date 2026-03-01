import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type CustomFieldType = 'text' | 'number' | 'date' | 'boolean' | 'currency';

export interface CustomField {
  fieldId: string;
  name: string;
  type: CustomFieldType;
  value: unknown;
  isRequired: boolean;
}

export type PactStatus = 'Draft' | 'Pending' | 'Signed' | 'Disputed' | 'Resolved' | 'Cancelled';

export interface Pact {
  id: string;
  initiator_id: string;
  counterparty_id: string | null;
  title: string;
  status: PactStatus;
  custom_fields: CustomField[];
  invite_token: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  email_verified: boolean;
  created_at: string;
}
