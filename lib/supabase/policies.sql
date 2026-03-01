-- Allow users to insert their own profile (needed for auto-creation)
CREATE POLICY "Allow self insert" ON profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow authenticated users to read all profiles (needed for pact participants)
CREATE POLICY "Authenticated users can read profiles" ON profiles 
  FOR SELECT USING (auth.role() = 'authenticated');
