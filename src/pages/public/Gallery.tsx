import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Camera, X, ChevronRight, ChevronLeft as ChevronLeftIcon } from 'lucide-react';
import { fetchGalleryImages, GalleryImage } from '../../services/contentApi';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchGalleryImages();
        setImages(data);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'matches', name: 'Matches' },
    { id: 'training', name: 'Training' },
    { id: 'events', name: 'Events' },
    { id: 'awards', name: 'Awards' },
    { id: 'youth', name: 'Youth Programs' }
  ];


  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-qatar-cream to-qatar-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-qatar-gold"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-qatar-cream to-qatar-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-qatar-maroon hover:text-qatar-darkMaroon transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-gold">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 bg-qatar-gradient rounded-full flex items-center justify-center mr-6">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">Photo Gallery</h1>
                <p className="text-qatar-burgundy mt-2">Capturing memorable moments in FKF Aldai football</p>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-qatar-cream">
            <h2 className="text-lg font-semibold text-qatar-maroon mb-4">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-qatar-gold text-qatar-maroon shadow-md'
                      : 'bg-qatar-lightGold text-qatar-burgundy hover:bg-qatar-gold hover:text-qatar-maroon'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-qatar-cream hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => openModal(index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-qatar-maroon mb-2">{image.title}</h3>
                  <p className="text-qatar-burgundy text-sm">{image.description || 'No description available'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedImage !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
              <div className="relative max-w-4xl max-h-full">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-qatar-gold transition-colors z-10"
                >
                  <X className="h-8 w-8" />
                </button>
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-qatar-gold transition-colors z-10"
                >
                  <ChevronLeftIcon className="h-8 w-8" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-qatar-gold transition-colors z-10"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>

                <div className="bg-white rounded-lg overflow-hidden">
                  <img
                    src={filteredImages[selectedImage].image_url}
                    alt={filteredImages[selectedImage].title}
                    className="w-full max-h-96 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-qatar-maroon mb-2">
                      {filteredImages[selectedImage].title}
                    </h3>
                    <p className="text-qatar-burgundy">
                      {filteredImages[selectedImage].description || 'No description available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6 text-center">Gallery Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-qatar-maroon">{images.length}</div>
                <div className="text-qatar-burgundy text-sm">Total Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-qatar-maroon">
                  {images.filter(img => img.category === 'matches').length}
                </div>
                <div className="text-qatar-burgundy text-sm">Match Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-qatar-maroon">
                  {images.filter(img => img.category === 'events').length}
                </div>
                <div className="text-qatar-burgundy text-sm">Event Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-qatar-maroon">
                  {images.filter(img => img.category === 'youth').length}
                </div>
                <div className="text-qatar-burgundy text-sm">Youth Photos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;