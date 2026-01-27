import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { PlayerFormData, POSITIONS } from '../../models/types';
import { createPlayer, fetchClubs } from '../../services/api';
import toast from 'react-hot-toast';

const AddPlayer: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<PlayerFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clubs, setClubs] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadClubs = async () => {
      setIsLoading(true);
      try {
        const clubsData = await fetchClubs();
        setClubs(clubsData.map(club => ({ id: club.id, name: club.name })));
      } catch (error) {
        console.error('Error loading clubs:', error);
        toast.error('Failed to load clubs');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadClubs();
  }, []);
  
  const onSubmit = async (data: PlayerFormData) => {
    setIsSubmitting(true);
    
    try {
      await createPlayer(data);
      toast.success('Player added successfully');
      navigate('/admin/players');
    } catch (error) {
      console.error('Error adding player:', error);
      toast.error('Failed to add player');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (clubs.length === 0) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Clubs Available</h2>
        <p className="text-gray-600 mb-6">You need to create at least one club before adding players.</p>
        <button
          onClick={() => navigate('/admin/clubs/add')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add a Club First
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
          <h1 className="text-xl font-semibold">Add New Player</h1>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              />
              {errors.photoUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.photoUrl.message}</p>
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
              {isSubmitting ? 'Saving...' : 'Save Player'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddPlayer;