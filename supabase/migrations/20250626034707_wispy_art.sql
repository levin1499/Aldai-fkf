/*
  # Disable Row Level Security for league_officials table

  1. Changes
    - Disable RLS on league_officials table
    - Drop all existing RLS policies
    - This allows unrestricted access to the table for all authenticated users

  2. Security
    - RLS is disabled - table will be accessible to all authenticated users
    - Public users will not have access unless explicitly granted
*/

-- Drop all existing policies for league_officials
DROP POLICY IF EXISTS "League officials can read own data" ON league_officials;
DROP POLICY IF EXISTS "League officials can update own data" ON league_officials;
DROP POLICY IF EXISTS "League officials can insert own profile" ON league_officials;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own official profile" ON league_officials;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON league_officials;

-- Disable Row Level Security
ALTER TABLE league_officials DISABLE ROW LEVEL SECURITY;