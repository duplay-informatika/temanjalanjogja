import React, { useState, useEffect, useRef } from 'react';
import { destinations } from '@/data/destinations';

// Komponen DestinationCard yang sudah diperbarui
const DestinationCard = ({ destination }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [availableImages, setAvailableImages] = useState([]);
  
  const timerRef = useRef(null);

  // Deteksi destinasi yang mendukung slideshow
  const supportsSlideshow = () => {
    const name = destination.name.toLowerCase();
    return name.includes('gondola') || 
           name.includes('merapi') || 
           (name.includes('gumuk') && name.includes('pasir'));
  };

  // Cari gambar tambahan berdasarkan nama destinasi
  useEffect(() => {
    const loadAdditionalImages = async () => {
      const images = [destination.image];
      const name = destination.name.toLowerCase();
      
      try {
        if (name.includes('gondola')) {
          // Coba load gondolatimang2.jpg
          const img2 = await import('@/assets/img/gondolatimang2.jpg');
          images.push(img2.default);
        } else if (name.includes('merapi')) {
          // Coba load merapi2.jpg
          const img2 = await import('@/assets/img/merapi2.jpg');
          images.push(img2.default);
        } else if (name.includes('gumuk') && name.includes('pasir')) {
          // Coba load gumukpasir1.jpg (karena data pakai gumukpasir2.jpg)
          const img1 = await import('@/assets/img/gumukpasir1.jpg');
          images.push(img1.default);
        }
      } catch (error) {
        // Jika gambar tidak ditemukan, tetap gunakan gambar utama
        console.log(`Gambar tambahan tidak ditemukan untuk ${destination.name}`);
      }
      
      setAvailableImages(images);
    };
    
    loadAdditionalImages();
  }, [destination]);

  // Setup slideshow
  useEffect(() => {
    const hasMultipleImages = availableImages.length > 1;
    const shouldSlideshow = hasMultipleImages && supportsSlideshow();
    
    if (!shouldSlideshow) return;
    
    // Hapus timer sebelumnya
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Setup timer baru untuk slideshow
    timerRef.current = setInterval(() => {
      // Aktifkan efek zoom out
      setIsZooming(true);
      
      // Tunggu 600ms untuk efek zoom, lalu ganti gambar
      setTimeout(() => {
        setCurrentImageIndex(prev => (prev + 1) % availableImages.length);
        
        // Matikan efek zoom setelah ganti gambar
        setTimeout(() => {
          setIsZooming(false);
        }, 100);
      }, 600);
      
    }, 4000); // Ganti gambar setiap 4 detik
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [availableImages.length]);

  // Gambar yang akan ditampilkan
  const displayImage = availableImages.length > 0 
    ? availableImages[currentImageIndex] 
    : destination.image;
  
  const hasMultipleImages = availableImages.length > 1 && supportsSlideshow();

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer hover:shadow-xl transition-shadow duration-300"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {/* Container Gambar */}
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
        {/* Gambar dengan efek zoom */}
        <div
          className={`
            absolute inset-0 w-full h-full bg-cover bg-center
            transition-all duration-700 ease-out
            ${isZooming && hasMultipleImages ? 'scale-110' : 'scale-100'}
          `}
          style={{
            backgroundImage: `url(${displayImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
          <span className="text-yellow-500">★</span>
          <span className="font-semibold text-gray-800">{destination.rating}</span>
        </div>
        
        {/* Location Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {destination.location}
          </span>
        </div>
        
        {/* Image Indicator Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {availableImages.map((_, index) => (
              <button
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === currentImageIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/60 hover:bg-white'
                  }
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  // Hentikan slideshow sementara
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                  }
                  setIsZooming(true);
                  setTimeout(() => {
                    setCurrentImageIndex(index);
                    setTimeout(() => setIsZooming(false), 100);
                  }, 600);
                }}
              />
            ))}
          </div>
        )}
        
        {hasMultipleImages && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-1.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5 bg-white rounded-b-xl">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              {destination.name}
            </h3>
            {destination.price && (
              <p className="text-gray-600 text-sm">Mulai dari {destination.price}</p>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2">
          {destination.description}
        </p>
      </div>
    </div>
  );
};

export const PopularDestinations = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Destinasi Populer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan pengalaman wisata terbaik dengan pemandangan yang menakjubkan
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard 
              key={destination.id} 
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};