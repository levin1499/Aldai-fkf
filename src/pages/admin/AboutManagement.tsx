import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Edit, X } from 'lucide-react';
import { fetchAboutContent, updateAboutContent, AboutContent, AboutContentFormData } from '../../services/contentApi';
import toast from 'react-hot-toast';

const AboutManagement: React.FC = () => {
  const [aboutSections, setAboutSections] = useState<AboutContent[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AboutContentFormData>();

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAboutContent();
      setAboutSections(data);
    } catch (error) {
      console.error('Error loading about content:', error);
      toast.error('Failed to load about content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (section: AboutContent) => {
    setEditingSection(section.section);
    reset({
      title: section.title,
      content: section.content
    });
  };

  const handleCancel = () => {
    setEditingSection(null);
    reset();
  };

  const onSubmit = async (data: AboutContentFormData) => {
    if (!editingSection) return;

    try {
      const updatedSection = await updateAboutContent(editingSection, data);
      setAboutSections(sections =>
        sections.map(section =>
          section.section === editingSection ? updatedSection : section
        )
      );
      setEditingSection(null);
      reset();
      toast.success('Section updated successfully');
    } catch (error) {
      console.error('Error updating section:', error);
      toast.error('Failed to update section');
    }
  };

  const getSectionDisplayName = (section: string) => {
    const names: { [key: string]: string } = {
      mission: 'Mission Statement',
      vision: 'Vision Statement',
      history: 'Our History'
    };
    return names[section] || section;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">About Page Management</h1>
          <p className="text-gray-600 mt-1">Edit the content sections of the About page</p>
        </div>

        <div className="space-y-6">
          {aboutSections.map(section => (
            <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {getSectionDisplayName(section.section)}
                </h2>
                {editingSection !== section.section && (
                  <button
                    onClick={() => handleEdit(section)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>

              <div className="p-6">
                {editingSection === section.section ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        id="title"
                        type="text"
                        className={`block w-full rounded-md border ${errors.title ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        {...register('title', { required: 'Title is required' })}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content *
                      </label>
                      <textarea
                        id="content"
                        rows={8}
                        className={`block w-full rounded-md border ${errors.content ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        {...register('content', { required: 'Content is required' })}
                      />
                      {errors.content && (
                        <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{section.title}</h3>
                    <div className="text-gray-700 whitespace-pre-wrap">{section.content}</div>
                    <div className="mt-4 text-sm text-gray-500">
                      Last updated: {new Date(section.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutManagement;