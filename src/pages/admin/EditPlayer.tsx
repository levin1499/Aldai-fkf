import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ChevronLeft, AlertCircle, Upload } from 'lucide-react';
import { PlayerFormData, POSITIONS, Player } from '../../models/types';
import { fetchPlayer, updatePlayer, fetchClubs } from '../../services/api';
import toast from 'react-hot-toast';

const EditPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PlayerFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clubs, setClubs] = useState<{ id: string; name: string }[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!id) {
          setError('Player ID is missing');
          return;
        }
        
        // Load player and clubs data in parallel
        const [playerData, clubsData] = await Promise.all([
          fetchPlayer(id),
          fetchClubs()
        ]);
        
        if (!playerData) {
          setError('Player not found');
          return;
        }
        
        setPlayer(playerData);
        setPhotoPreview(playerData.photoUrl);
        
        // Set form default values (excluding leagueId since it's system generated)
        reset({
          name: playerData.name,
          dateOfBirth: playerData.dateOfBirth,
          position: playerData.position,
          clubId: playerData.clubId,
          verified: playerData.verified,
          photoUrl: playerData.photoUrl
        });
        
        setClubs(clubsData.map(club => ({ id: club.id, name: club.name })));
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load player data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id, reset]);
  
  const onSubmit = async (data: PlayerFormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      // Include the photo URL from the preview if it was changed
      const updateData = {
        ...data,
        photoUrl: photoPreview || data.photoUrl
      };
      
      await updatePlayer(id, updateData);
      toast.success('Player updated successfully');
      navigate('/admin/players');
    } catch (error) {
      console.error('Error updating player:', error);
      toast.error('Failed to update player');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePhotoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setPhotoPreview(url);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error || !player) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{error || 'Player not found'}</h2>
        <p className="text-gray-600 mb-6">We couldn't find the player you're trying to edit.</p>
        <button
          onClick={() => navigate('/admin/players')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Players
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-600 text-white">
          <h1 className="text-xl font-semibold">Edit Player: {player.name}</h1>
          <p className="text-blue-100 text-sm mt-1">League ID: {player.leagueId}</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center justify-center">
                <div className="bg-gray-100 rounded-full w-32 h-32 overflow-hidden mb-4 flex items-center justify-center relative">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Player preview" 
                      className="w-full h-full object-cover"
                      onError={() => setPhotoPreview(null)}
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  id="photoUrl"
                  type="url"
                  className={`block w-full rounded-md border ${errors.photoUrl ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  {...register('photoUrl', {
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: 'Must be a valid URL'
                    }
                  })}
                  onChange={handlePhotoUrlChange}
                />
                {errors.photoUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.photoUrl.message}</p>
                )}
              </div>
            </div>
          
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                className={`block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name is too short' },
                  maxLength: { value: 100, message: 'Name is too long' }
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className={`block w-full rounded-md border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                {...register('dateOfBirth', { 
                  required: 'Date of birth is required',
                  validate: {
                    notFuture: (value) => {
                      const date = new Date(value);
                      const today = new Date();
                      return date <= today || 'Date of birth cannot be in the future';
                    }
                  }
                })}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Position *
              </label>
              <select
                id="position"
                className={`block w-full rounded-md border ${errors.position ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                {...register('position', { required: 'Position is required' })}
              >
                <option value="">Select Position</option>
                {POSITIONS.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
              {errors.position && (
                <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="clubId" className="block text-sm font-medium text-gray-700 mb-1">
                Club *
              </label>
              <select
                id="clubId"
                className={`block w-full rounded-md border ${errors.clubId ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                {...register('clubId', { required: 'Club is required' })}
              >
                <option value="">Select Club</option>
                {clubs.map(club => (
                  <option key={club.id} value={club.id}>{club.name}</option>
                ))}
              </select>
              {errors.clubId && (
                <p className="mt-1 text-sm text-red-600">{errors.clubId.message}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="verified"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                {...register('verified')}
              />
              <label htmlFor="verified" className="ml-2 block text-sm text-gray-700">
                Player is verified
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/players')}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Saving...' : 'Update Player'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditPlayer;