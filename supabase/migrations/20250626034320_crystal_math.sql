/*
  # Fix League Officials Signup RLS Policy

  1. Security Changes
    - Update the INSERT policy for `league_officials` table to allow authenticated users to insert their own profile
    - The policy now checks that the user is authenticated and the id matches their auth.uid()
    - This allows the signup process to work correctly while maintaining security

  2. Policy Updates
    - Modified "League officials can insert own profile" policy to work during signup
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "League officials can insert own profile" ON league_officials;

-- Create a new INSERT policy that allows authenticated users to insert their own profile
CREATE POLICY "League officials can insert own profile"
  ON league_officials
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);