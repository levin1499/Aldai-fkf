import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { Player, Club, PlayerFormData, ClubFormData } from '../models/types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Test connection on module load
const testInitialConnection = async () => {
  try {
    const { error } = await supabase.from('players').select('id').limit(1).maybeSingle();
    if (error) console.warn('Initial connection test failed:', error);
  } catch (error) {
    console.warn('Database connection issue:', error);
  }
};
testInitialConnection();

// Helper function to generate league ID
const generateLeagueId = async () => {
  const { count } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error generating league ID:', error);
    throw new Error('Failed to generate league ID');
  }
  
  const nextNumber = ((count || 0) + 1).toString().padStart(3, '0');
  return `ALD${nextNumber}`;
};

// Helper function to convert database row to frontend format
const mapPlayerFromDB = (dbPlayer: any): Player => {
  if (!dbPlayer) {
    throw new Error('Invalid player data received from database');
  }
  
  return {
    id: dbPlayer.id,
    name: dbPlayer.name,
    leagueId: dbPlayer.league_id,
    dateOfBirth: dbPlayer.date_of_birth,
    position: dbPlayer.position,
    clubId: dbPlayer.club_id,
    verified: dbPlayer.verified || false,
    photoUrl: dbPlayer.photo_url || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: dbPlayer.status || 'active',
    createdAt: dbPlayer.created_at,
    updatedAt: dbPlayer.updated_at
  };
};

// Helper function to convert database row to frontend format
const mapClubFromDB = (dbClub: any): Club => {
  return {
    id: dbClub.id,
    name: dbClub.name,
    location: dbClub.location,
    foundedYear: dbClub.founded_year,
    logo: dbClub.logo || 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: dbClub.created_at,
    updatedAt: dbClub.updated_at
  };
};

// Helper function to convert frontend data to database format
const mapPlayerToDB = (player: PlayerFormData & { leagueId?: string; status?: string }) => {
  return {
    name: player.name,
    league_id: player.leagueId,
    date_of_birth: player.dateOfBirth,
    position: player.position,
    club_id: player.clubId,
    verified: player.verified || false,
    photo_url: player.photoUrl || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: player.status || 'active'
  };
};

// Helper function to convert frontend data to database format
const mapClubToDB = (club: ClubFormData) => {
  return {
    name: club.name,
    location: club.location,
    founded_year: club.foundedYear,
    logo: club.logo || 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400'
  };
};

// Player API Functions
export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    console.log('Fetching players...');
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching players:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    console.log('Players fetched successfully:', data?.length || 0);
    
    return (data || []).map(mapPlayerFromDB);
  } catch (error) {
    console.error('Error in fetchPlayers:', error);
    throw error;
  }
};

export const fetchActivePlayers = async (): Promise<Player[]> => {
  try {
    console.log('Fetching active players...');
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching active players:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    console.log('Active players fetched successfully:', data?.length || 0);
    
    return (data || []).map(mapPlayerFromDB);
  } catch (error) {
    console.error('Error in fetchActivePlayers:', error);
    throw error;
  }
};

export const fetchPlayersByClub = async (clubId: string): Promise<Player[]> => {
  try {
    console.log('Fetching players by club:', clubId);
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('club_id', clubId);
    
    if (error) {
      console.error('Error fetching players by club:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    console.log('Club players fetched successfully:', data?.length || 0);
    
    return (data || []).map(mapPlayerFromDB);
  } catch (error) {
    console.error('Error in fetchPlayersByClub:', error);
    throw error;
  }
};

export const fetchPlayer = async (id: string): Promise<Player | undefined> => {
  try {
    console.log('Fetching player:', id);
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching player:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    console.log('Player fetched successfully:', data?.name);
    
    return data ? mapPlayerFromDB(data) : undefined;
  } catch (error) {
    console.error('Error in fetchPlayer:', error);
    throw error;
  }
};

export const createPlayer = async (playerData: PlayerFormData): Promise<Player> => {
  const leagueId = await generateLeagueId();
  
  const dbData = mapPlayerToDB({ ...playerData, leagueId, status: 'active' });
  
  const { data, error } = await supabase
    .from('players')
    .insert([dbData])
    .select()
    .single();
    
  if (error) throw error;
  return mapPlayerFromDB(data);
};

export const updatePlayer = async (id: string, playerData: PlayerFormData): Promise<Player> => {
  const dbData = mapPlayerToDB(playerData);
  // Remove league_id from updates since it's system generated
  delete dbData.league_id;
  
  const { data, error } = await supabase
    .from('players')
    .update(dbData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return mapPlayerFromDB(data);
};

export const togglePlayerStatus = async (id: string, status: 'active' | 'disabled'): Promise<Player> => {
  const { data, error } = await supabase
    .from('players')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return mapPlayerFromDB(data);
};

export const deletePlayer = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('players')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
};

// Club API Functions
export const fetchClubs = async (): Promise<Club[]> => {
  try {
    console.log('Fetching clubs...');
    
    // Get clubs with player count
    const { data: clubsData, error: clubsError } = await supabase
      .from('clubs')
      .select('*')
      .order('name');
      
    if (clubsError) {
      console.error('Error fetching clubs:', clubsError);
      throw clubsError;
    }
    
    if (!clubsData) {
      console.warn('No data returned from clubs query');
      return [];
    }
    
    console.log('Clubs fetched successfully:', clubsData.length);
    
    // Get player counts for each club
    const clubsWithCounts = await Promise.all(
      clubsData.map(async (club) => {
        const { count, error: countError } = await supabase
          .from('players')
          .select('*', { count: 'exact', head: true })
          .eq('club_id', club.id);
          
        if (countError) {
          console.error('Error fetching player count for club:', club.name, countError);
          throw countError;
        }
        
        return {
          ...mapClubFromDB(club),
          playerCount: count || 0
        };
      })
    );
    
    return clubsWithCounts;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network error while fetching clubs');
      throw new Error('Cannot connect to database. Please check your internet connection and Supabase configuration.');
    }
    throw error;
  }
};

export const fetchClub = async (id: string): Promise<Club | undefined> => {
  try {
    console.log('Fetching club:', id);
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching club:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    console.log('Club fetched successfully:', data?.name);
    
    if (!data) return undefined;
    
    // Get player count for this club
    const { count, error: countError } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })
      .eq('club_id', id);
      
    if (countError) throw countError;
    
    return {
      ...mapClubFromDB(data),
      playerCount: count || 0
    };
  } catch (error) {
    console.error('Error in fetchClub:', error);
    throw error;
  }
};

export const createClub = async (clubData: ClubFormData): Promise<Club> => {
  const dbData = mapClubToDB(clubData);
  
  const { data, error } = await supabase
    .from('clubs')
    .insert([dbData])
    .select()
    .single();
    
  if (error) throw error;
  return { ...mapClubFromDB(data), playerCount: 0 };
};

export const updateClub = async (id: string, clubData: ClubFormData): Promise<Club> => {
  const dbData = mapClubToDB(clubData);
  
  const { data, error } = await supabase
    .from('clubs')
    .update(dbData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return mapClubFromDB(data);
};

export const deleteClub = async (id: string): Promise<boolean> => {
  // Check if club has any players
  const { count, error: countError } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })
    .eq('club_id', id);
    
  if (countError) throw countError;
  
  if (count && count > 0) {
    throw new Error('Cannot delete club with active players. Please transfer or remove all players first.');
  }
  
  const { error } = await supabase
    .from('clubs')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
};

// Search function
export const searchPlayers = async (query: string): Promise<Player[]> => {
  console.log('Searching players with query:', query);
  
  if (!query) return fetchActivePlayers(); // Only return active players for public search
  
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('status', 'active') // Only search active players for public
    .or(`name.ilike.%${query}%,league_id.ilike.%${query}%`)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error searching players:', error);
    throw new Error(`Search failed: ${error.message}`);
  }
  
  console.log('Search completed, found:', data?.length || 0, 'players');
  
  return (data || []).map(mapPlayerFromDB);
};