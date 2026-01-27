/*
  # Initialize Fixture Management System

  1. New Tables
    - `seasons`
      - `id` (uuid, primary key)
      - `name` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `fixtures`
      - `id` (uuid, primary key)
      - `season_id` (uuid, foreign key)
      - `matchday` (integer)
      - `home_team_id` (uuid, foreign key)
      - `away_team_id` (uuid, foreign key)
      - `match_date` (date)
      - `match_time` (time)
      - `venue` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `match_reports`
      - `id` (uuid, primary key)
      - `fixture_id` (uuid, foreign key)
      - `home_team_score` (integer)
      - `away_team_score` (integer)
      - `referee_name` (text)
      - `referee_phone` (text)
      - `match_duration` (integer)
      - `attendance` (integer)
      - `weather_conditions` (text)
      - `pitch_condition` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `match_lineups`
      - `id` (uuid, primary key)
      - `fixture_id` (uuid, foreign key)
      - `team_id` (uuid, foreign key)
      - `player_id` (uuid, foreign key)
      - `position` (text)
      - `is_starter` (boolean)
      - `jersey_number` (integer)
      - `created_at` (timestamp)
    
    - `match_substitutions`
      - `id` (uuid, primary key)
      - `fixture_id` (uuid, foreign key)
      - `team_id` (uuid, foreign key)
      - `player_out_id` (uuid, foreign key)
      - `player_in_id` (uuid, foreign key)
      - `minute` (integer)
      - `reason` (text)
      - `created_at` (timestamp)
    
    - `match_events`
      - `id` (uuid, primary key)
      - `fixture_id` (uuid, foreign key)
      - `team_id` (uuid, foreign key)
      - `player_id` (uuid, foreign key)
      - `event_type` (text)
      - `minute` (integer)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `player_cards`
      - `id` (uuid, primary key)
      - `player_id` (uuid, foreign key)
      - `fixture_id` (uuid, foreign key)
      - `card_type` (text)
      - `minute` (integer)
      - `reason` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
    - Add policies for public read access where appropriate

  3. Indexes
    - Add performance indexes on frequently queried columns
    - Add unique constraints where needed

  4. Triggers
    - Add updated_at triggers for tables that need them
*/

-- Create seasons table
CREATE TABLE IF NOT EXISTS seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create fixtures table
CREATE TABLE IF NOT EXISTS fixtures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id uuid NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  matchday integer NOT NULL,
  home_team_id uuid NOT NULL REFERENCES clubs(id) ON DELETE RESTRICT,
  away_team_id uuid NOT NULL REFERENCES clubs(id) ON DELETE RESTRICT,
  match_date date,
  match_time time,
  venue text,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'postponed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create match_reports table
CREATE TABLE IF NOT EXISTS match_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id uuid NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
  home_team_score integer NOT NULL DEFAULT 0,
  away_team_score integer NOT NULL DEFAULT 0,
  referee_name text NOT NULL,
  referee_phone text,
  match_duration integer DEFAULT 90,
  attendance integer,
  weather_conditions text,
  pitch_condition text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create match_lineups table
CREATE TABLE IF NOT EXISTS match_lineups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id uuid NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
  team_id uuid NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  position text NOT NULL,
  is_starter boolean DEFAULT true,
  jersey_number integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create match_substitutions table
CREATE TABLE IF NOT EXISTS match_substitutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id uuid NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
  team_id uuid NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  player_out_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  player_in_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  minute integer NOT NULL,
  reason text,
  created_at timestamptz DEFAULT now()
);

-- Create match_events table
CREATE TABLE IF NOT EXISTS match_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id uuid NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
  team_id uuid NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('goal', 'yellow_card', 'red_card', 'own_goal', 'penalty_goal', 'penalty_miss')),
  minute integer NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create player_cards table
CREATE TABLE IF NOT EXISTS player_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  fixture_id uuid NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
  card_type text NOT NULL CHECK (card_type IN ('yellow', 'red')),
  minute integer NOT NULL,
  reason text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS seasons_is_active_idx ON seasons(is_active);
CREATE INDEX IF NOT EXISTS fixtures_season_id_idx ON fixtures(season_id);
CREATE INDEX IF NOT EXISTS fixtures_matchday_idx ON fixtures(matchday);
CREATE INDEX IF NOT EXISTS fixtures_home_team_id_idx ON fixtures(home_team_id);
CREATE INDEX IF NOT EXISTS fixtures_away_team_id_idx ON fixtures(away_team_id);
CREATE INDEX IF NOT EXISTS fixtures_status_idx ON fixtures(status);
CREATE INDEX IF NOT EXISTS match_reports_fixture_id_idx ON match_reports(fixture_id);
CREATE INDEX IF NOT EXISTS match_lineups_fixture_id_idx ON match_lineups(fixture_id);
CREATE INDEX IF NOT EXISTS match_lineups_team_id_idx ON match_lineups(team_id);
CREATE INDEX IF NOT EXISTS match_lineups_player_id_idx ON match_lineups(player_id);
CREATE INDEX IF NOT EXISTS match_substitutions_fixture_id_idx ON match_substitutions(fixture_id);
CREATE INDEX IF NOT EXISTS match_events_fixture_id_idx ON match_events(fixture_id);
CREATE INDEX IF NOT EXISTS match_events_player_id_idx ON match_events(player_id);
CREATE INDEX IF NOT EXISTS player_cards_player_id_idx ON player_cards(player_id);
CREATE INDEX IF NOT EXISTS player_cards_fixture_id_idx ON player_cards(fixture_id);

-- Add unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS seasons_active_unique ON seasons(is_active) WHERE is_active = true;
CREATE UNIQUE INDEX IF NOT EXISTS match_reports_fixture_unique ON match_reports(fixture_id);
CREATE UNIQUE INDEX IF NOT EXISTS match_lineups_team_player_fixture_unique ON match_lineups(fixture_id, team_id, player_id);
CREATE UNIQUE INDEX IF NOT EXISTS match_lineups_team_jersey_fixture_unique ON match_lineups(fixture_id, team_id, jersey_number);

-- Enable Row Level Security
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE fixtures ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_lineups ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_substitutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_cards ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for seasons
CREATE POLICY "Allow public read access to seasons"
  ON seasons
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage seasons"
  ON seasons
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create RLS policies for fixtures
CREATE POLICY "Allow public read access to fixtures"
  ON fixtures
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage fixtures"
  ON fixtures
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create RLS policies for match_reports
CREATE POLICY "Allow public read access to match reports"
  ON match_reports
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage match reports"
  ON match_reports
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create RLS policies for match_lineups
CREATE POLICY "Allow public read access to match lineups"
  ON match_lineups
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage match lineups"
  ON match_lineups
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create RLS policies for match_substitutions
CREATE POLICY "Allow public read access to match substitutions"
  ON match_substitutions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage match substitutions"
  ON match_substitutions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create RLS policies for match_events
CREATE POLICY "Allow public read access to match events"
  ON match_events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage match events"
  ON match_events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create RLS policies for player_cards
CREATE POLICY "Allow public read access to player cards"
  ON player_cards
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage player cards"
  ON player_cards
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_seasons_updated_at') THEN
    CREATE TRIGGER update_seasons_updated_at
      BEFORE UPDATE ON seasons
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_fixtures_updated_at') THEN
    CREATE TRIGGER update_fixtures_updated_at
      BEFORE UPDATE ON fixtures
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_match_reports_updated_at') THEN
    CREATE TRIGGER update_match_reports_updated_at
      BEFORE UPDATE ON match_reports
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;