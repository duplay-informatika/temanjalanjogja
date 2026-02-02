import React, { useEffect, useState } from 'react';
import DestinationCard from './DestinationCard';
import { destinations } from '@/data/destinations';
import { initImageCollections } from '@/utils/imageFinder';

const DestinationsGrid = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Inisialisasi gambar saat komponen mount
  useEffect(() => {
    const initialize = async () => {
      await initImageCollections();
      setIsLoading(false);
    };
    
    initialize();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Memuat Destinasi...
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Destinasi Wisata
          </h1>
          <p className="text-gray-600">
            Beberapa destinasi memiliki efek slideshow otomatis dengan zoom out
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard 
              key={destination.id} 
              destination={destination} 
            />
          ))}
        </div>
        
        {/* Informasi */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Gondola Timang, Merapi, dan Gumuk Pasir</strong> memiliki efek slideshow otomatis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsGrid;