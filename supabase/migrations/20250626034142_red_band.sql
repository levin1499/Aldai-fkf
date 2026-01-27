/*
  # Fix League Officials Insert Policy

  1. Security Updates
    - Drop existing INSERT policy that may be incorrectly configured
    - Create new INSERT policy that allows authenticated users to create their own profile
    - Ensure the policy allows users to insert records where the id matches their auth.uid()

  2. Policy Details
    - Allow INSERT operations for authenticated users
    - Restrict to only allow users to create profiles for their own user ID
    - This fixes the "new row violates row-level security policy" error during signup
*/

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON league_officials;

-- Create a new INSERT policy that properly allows profile creation
CREATE POLICY "League officials can insert own profile"
  ON league_officials
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure the SELECT policy allows users to read their own data
DROP POLICY IF EXISTS "League officials can read own data" ON league_officials;

CREATE POLICY "League officials can read own data"
  ON league_officials
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Ensure the UPDATE policy allows users to update their own data
DROP POLICY IF EXISTS "League officials can update own data" ON league_officials;

CREATE POLICY "League officials can update own data"
  ON league_officials
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);