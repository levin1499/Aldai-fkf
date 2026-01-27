/*
  # Initial schema setup for FKF Team Management System

  1. New Tables
    - `clubs`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `location` (text)
      - `founded_year` (integer)
      - `logo` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `players`
      - `id` (uuid, primary key)
      - `name` (text)
      - `league_id` (text, unique)
      - `date_of_birth` (date)
      - `position` (text)
      - `club_id` (uuid, foreign key)
      - `verified` (boolean)
      - `photo_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
    - Add policies for public users to read data

  3. Indexes
    - Add indexes for frequently queried columns
    - Add indexes for foreign key relationships
*/

-- Create clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  founded_year integer NOT NULL,
  logo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT clubs_name_key UNIQUE (name),
  CONSTRAINT clubs_founded_year_check CHECK (founded_year >= 1800 AND founded_year <= extract(year from now()))
);

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  league_id text NOT NULL,
  date_of_birth date NOT NULL,
  position text NOT NULL,
  club_id uuid REFERENCES clubs(id) ON DELETE RESTRICT,
  verified boolean DEFAULT false,
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT players_league_id_key UNIQUE (league_id),
  CONSTRAINT players_position_check CHECK (position IN ('Goalkeeper', 'Defender', 'Midfielder', 'Forward'))
);

-- Enable Row Level Security
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Create policies for clubs
DROP POLICY IF EXISTS "Allow public read access to clubs" ON clubs;
DROP POLICY IF EXISTS "Allow authenticated users to manage clubs" ON clubs;

CREATE POLICY "Allow public read access to clubs"
  ON clubs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage clubs"
  ON clubs TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for players
DROP POLICY IF EXISTS "Allow public read access to players" ON players;
DROP POLICY IF EXISTS "Allow authenticated users to manage players" ON players;

CREATE POLICY "Allow public read access to players"
  ON players FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage players"
  ON players TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_clubs_updated_at ON clubs;
DROP TRIGGER IF EXISTS update_players_updated_at ON players;

CREATE TRIGGER update_clubs_updated_at
  BEFORE UPDATE ON clubs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS players_club_id_idx ON players(club_id);
CREATE INDEX IF NOT EXISTS players_verified_idx ON players(verified);