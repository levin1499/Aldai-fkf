import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { ClubFormData } from '../../models/types';
import { createClub } from '../../services/api';
import toast from 'react-hot-toast';

const AddClub: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ClubFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = async (data: ClubFormData) => {
    setIsSubmitting(true);
    
    try {
      await createClub(data);
      toast.success('Club added successfully');
      navigate('/admin/clubs');
    } catch (error) {
      console.error('Error adding club:', error);
      toast.error('Failed to add club');
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
          <h1 className="text-xl font-semibold">Add New Club</h1>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            
            <div>
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

            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                id="logo"
                type="url"
                className={`block w-full rounded-md border ${errors.logo ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                {...register('logo', {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: 'Must be a valid URL'
                  }
                })}
              />
              {errors.logo && (
                <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>
              )}
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
              {isSubmitting ? 'Saving...' : 'Save Club'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddClub;