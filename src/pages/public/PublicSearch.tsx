import React, { useState, useEffect } from 'react';
import { Search, User, Calendar, MapPin, Shield, Users } from 'lucide-react';
import { fetchPlayers, fetchClubs } from '../../services/api';
import { Player, Club } from '../../models/types';
import { Link } from 'react-router-dom';

const PublicSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'all' | 'name' | 'club' | 'position'>('all');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [searchTerm, searchType, players]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [playersData, clubsData] = await Promise.all([
        fetchPlayers(),
        fetchClubs()
      ]);
      
      setPlayers(playersData || []);
      setClubs(clubsData || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load player data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterPlayers = () => {
    if (!searchTerm.trim()) {
      setFilteredPlayers([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const term = searchTerm.toLowerCase();
    const filtered = players.filter(player => {
      const club = clubs.find(c => c.id === player.clubId);
      
      switch (searchType) {
        case 'name':
          return player.name.toLowerCase().includes(term);
        case 'club':
          return club?.name.toLowerCase().includes(term);
        case 'position':
          return player.position.toLowerCase().includes(term);
        case 'all':
        default:
          return (
            player.name.toLowerCase().includes(term) ||
            player.position.toLowerCase().includes(term) ||
            club?.name.toLowerCase().includes(term) ||
            player.leagueId.toLowerCase().includes(term)
          );
      }
    });

    setFilteredPlayers(filtered);
  };

  const getClubName = (clubId: string | null) => {
    if (!clubId) return 'Free Agent';
    const club = clubs.find(c => c.id === clubId);
    return club?.name || 'Unknown Club';
  };

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

  const getPositionIcon = (position: string) => {
    switch (position.toLowerCase()) {
      case 'goalkeeper':
        return <Shield className="w-4 h-4" />;
      case 'defender':
        return <Users className="w-4 h-4" />;
      case 'midfielder':
        return <User className="w-4 h-4" />;
      case 'forward':
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading player database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={loadData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-gray to-theme-dark py-8 relative overflow-hidden">
      {/* Football Field Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-theme-accent to-transparent transform rotate-45"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-theme-primary rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-theme-primary rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-48 border-4 border-theme-primary opacity-30"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-48 border-4 border-theme-primary opacity-30"></div>
        {/* Field lines */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-theme-primary opacity-30 transform -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-theme-primary opacity-30 transform -translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-bold text-theme-primary mb-4 drop-shadow-lg">Player Search</h1>
          <p className="text-lg text-theme-primary/70">
            Search through our comprehensive player database
          </p>
        </div>

        {/* Search Controls */}
        <div className="bg-white/98 backdrop-blur-md rounded-lg shadow-strong p-6 mb-8 border border-theme-accent/30 relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-accent w-5 h-5" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-theme-accent/20 rounded-lg focus:ring-2 focus:ring-theme-accent focus:border-theme-accent text-gray-900 placeholder-gray-600 shadow-soft"
              />
            </div>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as any)}
              className="px-4 py-3 bg-white border border-theme-accent/20 rounded-lg focus:ring-2 focus:ring-theme-accent focus:border-theme-accent text-gray-900 shadow-soft"
            >
              <option value="all">All Fields</option>
              <option value="name">Name</option>
              <option value="club">Club</option>
              <option value="position">Position</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        {hasSearched && (
          <div className="mb-6 relative z-10">
            <p className="text-theme-primary font-medium drop-shadow">
              Showing {filteredPlayers.length} results for "{searchTerm}"
            </p>
          </div>
        )}

        {/* Player Grid */}
        {!hasSearched ? (
          <div className="text-center py-12 relative z-10">
            <div className="bg-white/98 backdrop-blur-md rounded-lg shadow-soft p-8 border border-theme-accent/30 max-w-md mx-auto">
              <User className="w-16 h-16 text-theme-accent mx-auto mb-4" />
              <h3 className="text-lg font-medium text-theme-primary mb-2 drop-shadow">Search for Players</h3>
              <p className="text-theme-primary/70">
              Use the search box above to find players by name, club, position, or league ID
            </p>
            </div>
          </div>
        ) : filteredPlayers.length === 0 ? (
          <div className="text-center py-12 relative z-10">
            <div className="bg-white/98 backdrop-blur-md rounded-lg shadow-soft p-8 border border-theme-accent/30 max-w-md mx-auto">
              <User className="w-16 h-16 text-theme-accent mx-auto mb-4" />
              <h3 className="text-lg font-medium text-theme-primary mb-2 drop-shadow">No players found</h3>
              <p className="text-theme-primary/70">
              Try adjusting your search terms
            </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {filteredPlayers.map((player) => (
              <Link
                key={player.id}
                to={`/player/${player.id}`}
                className="bg-white/98 backdrop-blur-md rounded-lg shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden border border-theme-accent/20 hover:scale-105 hover:bg-white hover:border-theme-accent/50"
              >
                <div className="p-6">
                  {/* Player Photo */}
                  <div className="flex items-center mb-4">
                    {player.photoUrl ? (
                      <img
                        src={player.photoUrl}
                        alt={player.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                      <p className="text-sm text-gray-600">ID: {player.leagueId}</p>
                    </div>
                  </div>

                  {/* Player Details */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      {getPositionIcon(player.position)}
                      <span className="ml-2">{player.position}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="ml-2">{getClubName(player.clubId)}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="ml-2">Age: {calculateAge(player.dateOfBirth)}</span>
                    </div>

                    {/* Verification Status */}
                    <div className="flex items-center justify-between mt-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        player.verified
                          ? 'bg-theme-accent/20 text-theme-primary border border-theme-accent/30'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {player.verified ? 'Verified' : 'Pending'}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        player.status === 'active'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {player.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicSearch;