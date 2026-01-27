/*
  # Create league_officials table

  1. New Tables
    - `league_officials`
      - `id` (uuid, primary key) - matches Supabase auth user ID
      - `email` (text, unique, not null) - official's email address
      - `name` (text, not null) - official's full name
      - `position` (text, not null) - official's position/role
      - `phone` (text, nullable) - optional phone number
      - `created_at` (timestamptz) - record creation timestamp
      - `updated_at` (timestamptz) - record update timestamp

  2. Security
    - Enable RLS on `league_officials` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to update their own data
    - Add policy for public read access (if needed for verification)

  3. Indexes
    - Index on email for faster lookups
    - Index on position for filtering by role
*/

-- Create the league_officials table
CREATE TABLE IF NOT EXISTS league_officials (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  position text NOT NULL CHECK (position IN (
    'League Chairman',
    'League Secretary',
    'League Treasurer',
    'Technical Director',
    'Referee Coordinator',
    'Disciplinary Committee Member',
    'Media Officer',
    'Youth Development Officer'
  )),
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE league_officials ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS league_officials_email_idx ON league_officials(email);
CREATE INDEX IF NOT EXISTS league_officials_position_idx ON league_officials(position);

-- Create RLS policies
CREATE POLICY "League officials can read own data"
  ON league_officials
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "League officials can update own data"
  ON league_officials
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users"
  ON league_officials
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_league_officials_updated_at'
  ) THEN
    CREATE TRIGGER update_league_officials_updated_at
      BEFORE UPDATE ON league_officials
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;