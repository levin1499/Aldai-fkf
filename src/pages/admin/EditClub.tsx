import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ChevronLeft, Upload, AlertCircle } from 'lucide-react';
import { ClubFormData, Club } from '../../models/types';
import { fetchClub, updateClub } from '../../services/api';
import toast from 'react-hot-toast';

const EditClub: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClubFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [club, setClub] = useState<Club | null>(null);
  
  useEffect(() => {
    const loadClub = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!id) {
          setError('Club ID is missing');
          return;
        }
        
        const clubData = await fetchClub(id);
        
        if (!clubData) {
          setError('Club not found');
          return;
        }
        
        setClub(clubData);
        setLogoPreview(clubData.logo);
        
        // Set form default values
        reset({
          name: clubData.name,
          location: clubData.location,
          foundedYear: clubData.foundedYear
        });
      } catch (err) {
        console.error('Error loading club:', err);
        setError('Failed to load club data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadClub();
  }, [id, reset]);
  
  const onSubmit = async (data: ClubFormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would upload the logo to a server if changed
      // For this demo, we're just passing the logoPreview URL if available
      if (logoPreview && logoPreview !== club?.logo) {
        data.logo = logoPreview;
      }
      
      await updateClub(id, data);
      toast.success('Club updated successfully');
      navigate('/admin/clubs');
    } catch (error) {
      console.error('Error updating club:', error);
      toast.error('Failed to update club');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // In a real app, this would upload the file to a server
    // For this demo, we'll just create a local object URL
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setLogoPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error || !club) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{error || 'Club not found'}</h2>
        <p className="text-gray-600 mb-6">We couldn't find the club you're trying to edit.</p>
        <button
          onClick={() => navigate('/admin/clubs')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Clubs
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
          <h1 className="text-xl font-semibold">Edit Club: {club.name}</h1>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center justify-center">
                <div className="bg-gray-100 rounded-lg w-32 h-32 overflow-hidden mb-4 flex items-center justify-center relative">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Club logo preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <label className="block">
                  <span className="sr-only">Choose club logo</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </label>
              </div>
            </div>
          
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Club Name *
              </label>
              <input
                id="name"
                type="text"
                className={`block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                {...register('name', { 
                  required: 'Club name is required',
                  minLength: { value: 2, message: 'Name is too short' },
                  maxLength: { value: 100, message: 'Name is too long' }
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                id="location"
                type="text"
                className={`block w-full rounded-md border ${errors.location ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                {...register('location', { 
                  required: 'Location is required',
                  minLength: { value: 2, message: 'Location is too short' },
                  maxLength: { value: 100, message: 'Location is too long' }
                })}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 mb-1">
                Founded Year *
              </label>
              <input
                id="foundedYear"
                type="number"
                className={`block w-full rounded-md border ${errors.foundedYear ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                {...register('foundedYear', { 
                  required: 'Founded year is required',
                  valueAsNumber: true,
                  min: { value: 1800, message: 'Year must be 1800 or later' },
                  max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
                })}
              />
              {errors.foundedYear && (
                <p className="mt-1 text-sm text-red-600">{errors.foundedYear.message}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center py-3 px-4 bg-blue-50 text-blue-800 rounded-md">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mr-3" />
                <div>
                  <p className="text-sm">
                    This club currently has <span className="font-semibold">{club.playerCount}</span> {club.playerCount === 1 ? 'player' : 'players'} assigned to it.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/clubs')}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Saving...' : 'Update Club'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditClub;