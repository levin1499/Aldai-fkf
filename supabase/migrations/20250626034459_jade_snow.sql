/*
  # Fix League Officials Insert Policy

  1. Security Changes
    - Add policy to allow authenticated users to insert their own official profile
    - This resolves the RLS violation error during signup process
    
  2. Policy Details
    - Allows INSERT operations for authenticated users
    - Restricts insertion to only the user's own record (auth.uid() = id)
    - Maintains security by preventing users from creating profiles for others
*/

-- Add policy to allow authenticated users to insert their own official profile
CREATE POLICY "Allow authenticated users to insert their own official profile" 
ON public.league_officials 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);