import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { fetchPlayer, fetchClub } from '../../services/api';
import { Player, Club } from '../../models/types';
import toast from 'react-hot-toast';

const PlayerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [club, setClub] = useState<Club | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!id) {
          setError('Player ID is missing');
          return;
        }
        
        const playerData = await fetchPlayer(id);
        
        if (!playerData) {
          setError('Player not found');
          return;
        }

        // Don't show disabled players to public
        if (playerData.status === 'disabled') {
          setError('Player not found');
          return;
        }
        
        setPlayer(playerData);
        
        // Load club data
        if (playerData.clubId) {
          const clubData = await fetchClub(playerData.clubId);
          setClub(clubData || null);
        }
      } catch (err) {
        console.error('Error loading player:', err);
        setError('Failed to load player data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id]);
  
  // Format date of birth
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate age
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-qatar-gold"></div>
      </div>
    );
  }
  
  if (error || !player) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{error || 'Player not found'}</h2>
        <p className="text-gray-600 mb-6">We couldn't find the player you're looking for.</p>
        <Link
          to="/search"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Search
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to="/search"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Search
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 relative overflow-hidden">
            <div className="aspect-w-3 aspect-h-4 w-full">
              <img 
                src={player.photoUrl} 
                alt={player.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{player.name}</h1>
                <p className="text-lg text-gray-600 mt-1">{player.position}</p>
                {player.verified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                      Verified Player
                    </span>
                )}
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">League ID</p>
                  <p className="font-medium text-gray-900">{player.leagueId}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(player.dateOfBirth)} ({calculateAge(player.dateOfBirth)} years)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center md:col-span-2">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Club</p>
                  <p className="font-medium text-gray-900">{club?.name || 'Unassigned'}</p>
                </div>
              </div>
            </div>
            
            {club && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Club Information</h2>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <div className="h-16 w-16 flex-shrink-0 rounded-full overflow-hidden mr-4">
                    <img 
                      src={club.logo} 
                      alt={club.name} 
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{club.name}</h3>
                    <p className="text-sm text-gray-600">{club.location}</p>
                    <p className="text-sm text-gray-600 mt-1">Founded {club.foundedYear}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PlayerDetails;