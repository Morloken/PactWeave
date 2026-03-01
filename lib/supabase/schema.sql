-- Create extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table if not exists
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  image TEXT,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pacts table if not exists
CREATE TABLE IF NOT EXISTS pacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  initiator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  counterparty_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft',
  custom_fields JSONB DEFAULT '[]'::jsonb,
  invite_token TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies and recreate
DROP POLICY IF EXISTS "Users can select own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can select own pacts" ON pacts;
DROP POLICY IF EXISTS "Users can insert own pacts" ON pacts;
DROP POLICY IF EXISTS "Users can update own pacts" ON pacts;
DROP POLICY IF EXISTS "Users can delete own pacts" ON pacts;

-- Create profiles policies
CREATE POLICY "Users can select own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create pacts policies
CREATE POLICY "Users can select own pacts" ON pacts FOR SELECT USING (initiator_id = auth.uid() OR counterparty_id = auth.uid());
CREATE POLICY "Users can insert own pacts" ON pacts FOR INSERT WITH CHECK (initiator_id = auth.uid());
CREATE POLICY "Users can update own pacts" ON pacts FOR UPDATE USING (initiator_id = auth.uid() OR counterparty_id = auth.uid());
CREATE POLICY "Users can delete own pacts" ON pacts FOR DELETE USING (initiator_id = auth.uid());

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_pacts_updated_at ON pacts;
CREATE TRIGGER update_pacts_updated_at
  BEFORE UPDATE ON pacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
