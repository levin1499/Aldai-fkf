import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Search, Edit, Trash2, AlertCircle, UserX, UserCheck, Filter } from 'lucide-react';
import { fetchPlayers, fetchClubs, deletePlayer, togglePlayerStatus } from '../../services/api';
import { Player, Club } from '../../models/types';
import toast from 'react-hot-toast';

const PlayerManagement: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'disabled'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingPlayerId, setDeletingPlayerId] = useState<string | null>(null);
  const [togglingStatusId, setTogglingStatusId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [playersData, clubsData] = await Promise.all([
          fetchPlayers(),
          fetchClubs()
        ]);
        
        setPlayers(playersData);
        setFilteredPlayers(playersData);
        setClubs(clubsData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load players and clubs');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  useEffect(() => {
    let filtered = players;
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(player => player.status === statusFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(lowercaseQuery) ||
        player.leagueId.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredPlayers(filtered);
  }, [searchQuery, statusFilter, players]);
  
  const handleTogglePlayerStatus = async (playerId: string, currentStatus: 'active' | 'disabled') => {
    setTogglingStatusId(playerId);
    const newStatus = currentStatus === 'active' ? 'disabled' : 'active';
    
    try {
      const updatedPlayer = await togglePlayerStatus(playerId, newStatus);
      
      if (updatedPlayer) {
        setPlayers(players.map(player => 
          player.id === playerId ? { ...player, status: newStatus } : player
        ));
        
        const action = newStatus === 'disabled' ? 'disabled' : 'enabled';
        toast.success(`Player ${action} successfully`);
      } else {
        toast.error(`Failed to ${newStatus === 'disabled' ? 'disable' : 'enable'} player`);
      }
    } catch (err: any) {
      console.error('Error toggling player status:', err);
      toast.error(err.message || 'An error occurred while updating player status');
    } finally {
      setTogglingStatusId(null);
    }
  };
  
  const confirmDeletePlayer = (player: Player) => {
    setPlayerToDelete(player);
    setShowConfirmModal(true);
  };
  
  const handleDeletePlayer = async () => {
    if (!playerToDelete) return;
    
    setDeletingPlayerId(playerToDelete.id);
    
    try {
      const success = await deletePlayer(playerToDelete.id);
      
      if (success) {
        const updatedPlayers = players.filter(p => p.id !== playerToDelete.id);
        setPlayers(updatedPlayers);
        setFilteredPlayers(filteredPlayers.filter(p => p.id !== playerToDelete.id));
        
        toast.success(`${playerToDelete.name} deleted successfully`);
      } else {
        toast.error('Failed to delete player');
      }
    } catch (err) {
      console.error('Error deleting player:', err);
      toast.error('An error occurred while deleting the player');
    } finally {
      setDeletingPlayerId(null);
      setShowConfirmModal(false);
      setPlayerToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setShowConfirmModal(false);
    setPlayerToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-qatar-gold"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Players</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Player Management</h1>
          <p className="text-gray-600 mt-1">Manage players in the system</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link
            to="/admin/players/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add New Player
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-4 border-b border-gray-200 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search players by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Status:</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 text-sm rounded-full ${
                  statusFilter === 'all' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1 text-sm rounded-full ${
                  statusFilter === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter('disabled')}
                className={`px-3 py-1 text-sm rounded-full ${
                  statusFilter === 'disabled' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Disabled
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {filteredPlayers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No players found</h3>
          <p className="text-gray-500">Try a different search term or filter</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    League ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Club
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlayers.map(player => {
                  const playerClub = clubs.find(club => club.id === player.clubId);
                  return (
                    <tr key={player.id} className={`hover:bg-gray-50 ${player.status === 'disabled' ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={player.photoUrl} 
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{player.name}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(player.dateOfBirth).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {player.leagueId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{playerClub?.name || 'Unassigned'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {player.status === 'active' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Disabled
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleTogglePlayerStatus(player.id, player.status)}
                            disabled={togglingStatusId === player.id}
                            className={`${
                              player.status === 'active' 
                                ? 'text-red-600 hover:text-red-900' 
                                : 'text-green-600 hover:text-green-900'
                            } ${togglingStatusId === player.id ? 'opacity-50 cursor-not-allowed' : ''} transition-colors`}
                            title={player.status === 'active' ? 'Disable Player' : 'Enable Player'}
                          >
                            {player.status === 'active' ? (
                              <UserX className="h-5 w-5" />
                            ) : (
                              <UserCheck className="h-5 w-5" />
                            )}
                          </button>
                          <Link
                            to={`/admin/players/edit/${player.id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Player"
                          >
                            <Edit className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => confirmDeletePlayer(player)}
                            disabled={deletingPlayerId === player.id}
                            className={`text-red-600 hover:text-red-900 ${deletingPlayerId === player.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title="Delete Player"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmModal && playerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Player</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete <span className="font-semibold">{playerToDelete.name}</span>? 
                This action cannot be undone.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 flex space-x-3">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleDeletePlayer}
                disabled={deletingPlayerId !== null}
              >
                {deletingPlayerId !== null ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerManagement;