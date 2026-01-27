export interface Player {
  id: string;
  name: string;
  leagueId: string;
  dateOfBirth: string;
  position: string;
  clubId: string;
  verified: boolean;
  photoUrl: string;
  status: 'active' | 'disabled';
  createdAt: string;
  updatedAt: string;
}

export interface Club {
  id: string;
  name: string;
  location: string;
  foundedYear: number;
  logo: string;
  createdAt: string;
  updatedAt: string;
  playerCount?: number;
}

export interface PlayerFormData {
  name: string;
  leagueId?: string; // Optional since it's system generated
  dateOfBirth: string;
  position: string;
  clubId: string;
  verified?: boolean;
  photoUrl?: string;
}

export interface ClubFormData {
  name: string;
  location: string;
  foundedYear: number;
  logo?: string;
}

export interface LeagueOfficial {
  id: string;
  email: string;
  name: string;
  position: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeagueOfficialSignupData {
  email: string;
  password: string;
  name: string;
  position: string;
  phone?: string;
}

export interface LeagueOfficialLoginData {
  email: string;
  password: string;
}

export type PlayerStatus = 'active' | 'disabled';

export const PLAYER_STATUSES: PlayerStatus[] = ['active', 'disabled'];

export const POSITIONS = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'] as const;

export type Position = typeof POSITIONS[number];

export const OFFICIAL_POSITIONS = [
  'League Secretary',
  'League Chairman',
  'Technical Director',
  'Referee Coordinator',
  'Youth Development Officer',
  'Competition Manager',
  'Media Officer'
] as const;

export type OfficialPosition = typeof OFFICIAL_POSITIONS[number];