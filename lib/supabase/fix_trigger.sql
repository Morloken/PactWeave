-- Drop the trigger that creates profiles automatically
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Keep RLS policies but allow self-insert for authenticated users
DROP POLICY IF EXISTS "Allow self insert" ON profiles;
CREATE POLICY "Allow self insert" ON profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow authenticated users to read profiles
DROP POLICY IF EXISTS "Authenticated users can read profiles" ON profiles;
CREATE POLICY "Authenticated users can read profiles" ON profiles 
  FOR SELECT USING (auth.role() = 'authenticated');
