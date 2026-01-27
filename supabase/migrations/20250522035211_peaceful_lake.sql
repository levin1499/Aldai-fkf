/*
  # Fix column naming consistency

  1. Changes
    - Ensure founded_year column is consistently named in snake_case
    - Add check constraint for valid years
    - Maintain existing data integrity
*/

-- Verify the column exists and is named correctly
DO $$ 
BEGIN
  -- Check if we need to rename the column (in case it was somehow created as foundedYear)
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'clubs' 
    AND column_name = 'foundedyear'
  ) THEN
    ALTER TABLE clubs RENAME COLUMN foundedyear TO founded_year;
  END IF;

  -- Ensure the column has the correct constraints
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'clubs' 
    AND column_name = 'founded_year'
  ) THEN
    -- Drop existing constraint if it exists
    ALTER TABLE clubs DROP CONSTRAINT IF EXISTS clubs_founded_year_check;
    
    -- Add the constraint back
    ALTER TABLE clubs 
    ADD CONSTRAINT clubs_founded_year_check 
    CHECK (founded_year >= 1800 AND founded_year <= extract(year from now()));
  END IF;
END $$;