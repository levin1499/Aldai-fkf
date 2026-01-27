/*
  # Add player status functionality

  1. Changes
    - Add `status` column to players table with default 'active'
    - Add check constraint for valid status values
    - Update existing players to have 'active' status

  2. Security
    - Maintain existing RLS policies
    - No additional security changes needed
*/

-- Add status column to players table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'players' AND column_name = 'status'
  ) THEN
    ALTER TABLE players ADD COLUMN status text DEFAULT 'active' NOT NULL;
  END IF;
END $$;

-- Add check constraint for valid status values
ALTER TABLE players DROP CONSTRAINT IF EXISTS players_status_check;
ALTER TABLE players ADD CONSTRAINT players_status_check 
  CHECK (status IN ('active', 'disabled'));

-- Update existing players to have active status
UPDATE players SET status = 'active' WHERE status IS NULL;

-- Add index for status queries
CREATE INDEX IF NOT EXISTS players_status_idx ON players(status);