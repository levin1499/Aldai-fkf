/*
  # Create admin logins table

  1. New Tables
    - `adminlogins`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password` (text)
      - `role` (text, default 'admin')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `adminlogins` table
    - Add policy for authenticated users to read admin data

  3. Sample Data
    - Creates default admin account with username 'admin' and password 'password'
*/

-- Create admin logins table
CREATE TABLE IF NOT EXISTS adminlogins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE adminlogins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users"
  ON adminlogins
  FOR SELECT
  TO authenticated
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_adminlogins_updated_at'
  ) THEN
    CREATE TRIGGER update_adminlogins_updated_at
      BEFORE UPDATE ON adminlogins
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert default admin credentials
INSERT INTO adminlogins (username, password, role) 
VALUES ('admin', 'password', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert additional admin accounts for testing
INSERT INTO adminlogins (username, password, role) 
VALUES 
  ('fkfadmin', 'aldai2024', 'admin'),
  ('secretary', 'secretary123', 'admin')
ON CONFLICT (username) DO NOTHING;