/*
  # Fix RLS policies for clubs and players

  1. Changes
    - Drop existing policies
    - Create new policies with explicit permissions for all operations
    - Ensure authenticated users can perform all CRUD operations
    - Maintain public read access

  2. Security
    - Maintain RLS enabled on all tables
    - Keep public read-only access
    - Grant full access to authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to clubs" ON clubs;
DROP POLICY IF EXISTS "Allow authenticated users to manage clubs" ON clubs;
DROP POLICY IF EXISTS "Allow public read access to players" ON players;
DROP POLICY IF EXISTS "Allow authenticated users to manage players" ON players;

-- Create new policies for clubs
CREATE POLICY "Allow public read access to clubs"
  ON clubs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to select clubs"
  ON clubs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert clubs"
  ON clubs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update clubs"
  ON clubs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete clubs"
  ON clubs FOR DELETE
  TO authenticated
  USING (true);

-- Create new policies for players
CREATE POLICY "Allow public read access to players"
  ON players FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to select players"
  ON players FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert players"
  ON players FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update players"
  ON players FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete players"
  ON players FOR DELETE
  TO authenticated
  USING (true);