import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Edit, Trash2, AlertCircle, Users, MapPin, Calendar } from 'lucide-react';
import { fetchClubs, deleteClub, fetchPlayersByClub } from '../../services/api';
import { Club } from '../../models/types';
import toast from 'react-hot-toast';

const ClubManagement: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingClubId, setDeletingClubId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [clubToDelete, setClubToDelete] = useState<Club | null>(null);
  
  useEffect(() => {
    const loadClubs = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const clubsData = await fetchClubs();
        setClubs(clubsData);
        setFilteredClubs(clubsData);
      } catch (err) {
        console.error('Error loading clubs:', err);
        setError('Failed to load clubs');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadClubs();
  }, []);
  
  // Filter clubs when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredClubs(clubs);
      return;
    }
    
    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = clubs.filter(club => 
      club.name.toLowerCase().includes(lowercaseQuery) ||
      club.location.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredClubs(filtered);
  }, [searchQuery, clubs]);
  
  const confirmDeleteClub = (club: Club) => {
    setClubToDelete(club);
    setShowConfirmModal(true);
  };
  
  const handleDeleteClub = async () => {
    if (!clubToDelete) return;
    
    setDeletingClubId(clubToDelete.id);
    
    try {
      const success = await deleteClub(clubToDelete.id);
      
      if (success) {
        // Remove the deleted club from the lists
        const updatedClubs = clubs.filter(c => c.id !== clubToDelete.id);
        setClubs(updatedClubs);
        setFilteredClubs(filteredClubs.filter(c => c.id !== clubToDelete.id));
        
        toast.success(`${clubToDelete.name} deleted successfully`);
      } else {
        toast.error('Failed to delete club');
      }
    } catch (err: any) {
      console.error('Error deleting club:', err);
      toast.error(err.message || 'An error occurred while deleting the club');
    } finally {
      setDeletingClubId(null);
      setShowConfirmModal(false);
      setClubToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setShowConfirmModal(false);
    setClubToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Clubs</h2>
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
          <h1 className="text-2xl font-bold text-gray-900">Club Management</h1>
          <p className="text-gray-600 mt-1">Manage clubs in the system</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/admin/clubs/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New Club
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search clubs by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {filteredClubs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No clubs found</h3>
          <p className="text-gray-500">Try a different search term or add a new club</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => (
            <div 
              key={club.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-32 bg-gray-200 relative">
                <img 
                  src={club.logo} 
                  alt={club.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 p-2 flex space-x-1">
                  <Link
                    to={`/admin/clubs/edit/${club.id}`}
                    className="p-1.5 bg-white rounded-full text-blue-600 hover:text-blue-800 shadow-sm"
                    title="Edit Club"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => confirmDeleteClub(club)}
                    disabled={club.playerCount > 0 || deletingClubId === club.id}
                    className={`p-1.5 bg-white rounded-full shadow-sm ${
                      club.playerCount > 0 || deletingClubId === club.id
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-600 hover:text-red-800'
                    }`}
                    title={club.playerCount > 0 ? "Cannot delete club with players" : "Delete Club"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{club.name}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    {club.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    Founded {club.foundedYear}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    {club.playerCount} {club.playerCount === 1 ? 'player' : 'players'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmModal && clubToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Club</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete <span className="font-semibold">{clubToDelete.name}</span>? 
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
                onClick={handleDeleteClub}
                disabled={deletingClubId !== null}
              >
                {deletingClubId !== null ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubManagement;