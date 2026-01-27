-- Fix RLS policies for seasons table to allow authenticated users

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to manage seasons" ON seasons;
DROP POLICY IF EXISTS "Allow public read access to seasons" ON seasons;

-- Create proper RLS policies for seasons table
CREATE POLICY "Allow authenticated users to manage seasons"
  ON seasons
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to seasons"
  ON seasons
  FOR SELECT
  TO public
  USING (true);

-- Ensure RLS is enabled on seasons table
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;

-- Also fix other fixture-related tables to have proper policies
-- Fixtures table
DROP POLICY IF EXISTS "Allow authenticated users to manage fixtures" ON fixtures;
DROP POLICY IF EXISTS "Allow public read access to fixtures" ON fixtures;

CREATE POLICY "Allow authenticated users to manage fixtures"
  ON fixtures
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to fixtures"
  ON fixtures
  FOR SELECT
  TO public
  USING (true);

-- Match reports table
DROP POLICY IF EXISTS "Allow authenticated users to manage match reports" ON match_reports;
DROP POLICY IF EXISTS "Allow public read access to match reports" ON match_reports;

CREATE POLICY "Allow authenticated users to manage match reports"
  ON match_reports
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to match reports"
  ON match_reports
  FOR SELECT
  TO public
  USING (true);

-- Match lineups table
DROP POLICY IF EXISTS "Allow authenticated users to manage match lineups" ON match_lineups;
DROP POLICY IF EXISTS "Allow public read access to match lineups" ON match_lineups;

CREATE POLICY "Allow authenticated users to manage match lineups"
  ON match_lineups
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to match lineups"
  ON match_lineups
  FOR SELECT
  TO public
  USING (true);

-- Match substitutions table
DROP POLICY IF EXISTS "Allow authenticated users to manage match substitutions" ON match_substitutions;
DROP POLICY IF EXISTS "Allow public read access to match substitutions" ON match_substitutions;

CREATE POLICY "Allow authenticated users to manage match substitutions"
  ON match_substitutions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to match substitutions"
  ON match_substitutions
  FOR SELECT
  TO public
  USING (true);

-- Match events table
DROP POLICY IF EXISTS "Allow authenticated users to manage match events" ON match_events;
DROP POLICY IF EXISTS "Allow public read access to match events" ON match_events;

CREATE POLICY "Allow authenticated users to manage match events"
  ON match_events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to match events"
  ON match_events
  FOR SELECT
  TO public
  USING (true);

-- Player cards table
DROP POLICY IF EXISTS "Allow authenticated users to manage player cards" ON player_cards;
DROP POLICY IF EXISTS "Allow public read access to player cards" ON player_cards;

CREATE POLICY "Allow authenticated users to manage player cards"
  ON player_cards
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to player cards"
  ON player_cards
  FOR SELECT
  TO public
  USING (true);