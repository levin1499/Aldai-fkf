/*
  # Remove transfer functionality

  1. Changes
    - Drop transfers table completely
    - Remove all transfer-related indexes and constraints
    - Clean up any transfer-related policies

  2. Security
    - No security changes needed as table is being removed
*/

-- Drop transfers table if it exists
DROP TABLE IF EXISTS transfers CASCADE;

-- Drop any remaining transfer-related indexes (in case they exist)
DROP INDEX IF EXISTS transfers_player_id_idx;
DROP INDEX IF EXISTS transfers_from_club_id_idx;
DROP INDEX IF EXISTS transfers_to_club_id_idx;