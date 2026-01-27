/*
  # Initial Database Setup for FKF Team Management System

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
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS clubs CASCADE;

-- Create clubs table
CREATE TABLE clubs (
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
CREATE TABLE players (
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

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_clubs_updated_at
  BEFORE UPDATE ON clubs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Create policies for clubs
CREATE POLICY "Enable read access for all users" ON clubs
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON clubs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON clubs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON clubs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for players
CREATE POLICY "Enable read access for all users" ON players
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON players
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON players
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON players
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS players_club_id_idx ON players(club_id);
CREATE INDEX IF NOT EXISTS players_verified_idx ON players(verified);
CREATE INDEX IF NOT EXISTS clubs_name_idx ON clubs(name);