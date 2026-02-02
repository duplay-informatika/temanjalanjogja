import React, { useState, useEffect, useRef } from 'react';

const DestinationCard = ({ destination }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [availableImages, setAvailableImages] = useState([]);
  
  const timerRef = useRef(null);
  
  // Cek apakah destinasi ini mendukung slideshow
  const supportsSlideshow = () => {
    const name = destination.name.toLowerCase();
    return name.includes('gondola') || 
           name.includes('merapi') || 
           (name.includes('gumuk') && name.includes('pasir'));
  };
  
  // Fungsi untuk mendapatkan semua gambar berdasarkan nama destinasi
  const getAllImages = () => {
    const name = destination.name.toLowerCase();
    const images = [];
    
    // Tambahkan gambar utama dari data
    if (destination.image) {
      images.push(destination.image);
    }
    
    // Coba cari gambar tambahan berdasarkan pola
    if (supportsSlideshow()) {
      if (name.includes('gondola')) {
        try {
          // Coba import gambar kedua
          import('@/assets/img/gondolatimang2.jpg')
            .then(module => {
              if (!images.includes(module.default)) {
                images.push(module.default);
                setAvailableImages([...images]);
              }
            })
            .catch(() => {
              // Jika tidak ada gambar kedua, tetap gunakan yang ada
              setAvailableImages(images);
            });
        } catch (e) {
          console.log('Gambar gondolatimang2.jpg tidak ditemukan');
        }
      }
      else if (name.includes('merapi')) {
        try {
          import('@/assets/img/merapi2.jpg')
            .then(module => {
              if (!images.includes(module.default)) {
                images.push(module.default);
                setAvailableImages([...images]);
              }
            })
            .catch(() => setAvailableImages(images));
        } catch (e) {
          console.log('Gambar merapi2.jpg tidak ditemukan');
        }
      }
      else if (name.includes('gumuk') && name.includes('pasir')) {
        try {
          import('@/assets/img/gumukpasir1.jpg')
            .then(module => {
              if (!images.includes(module.default)) {
                images.push(module.default);
                setAvailableImages([...images]);
              }
            })
            .catch(() => setAvailableImages(images));
        } catch (e) {
          console.log('Gambar gumukpasir1.jpg tidak ditemukan');
        }
      }
    }
    
    return images;
  };
  
  // Inisialisasi gambar saat komponen mount
  useEffect(() => {
    const images = getAllImages();
    setAvailableImages(images.length > 0 ? images : [destination.image]);
  }, [destination]);
  
  useEffect(() => {
    if (availableImages.length <= 1 || !supportsSlideshow()) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setIsZooming(true);
      
      setTimeout(() => {
        setCurrentImageIndex(prev => (prev + 1) % availableImages.length);
        
        setTimeout(() => {
          setIsZooming(false);
        }, 100);
      }, 600);
      
    }, 4000); 
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [availableImages.length, supportsSlideshow]);
  
  const changeImage = (index) => {
    if (availableImages.length <= 1 || !supportsSlideshow()) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setIsZooming(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setTimeout(() => setIsZooming(false), 100);
      
      setTimeout(() => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
          setIsZooming(true);
          setTimeout(() => {
            setCurrentImageIndex(prev => (prev + 1) % availableImages.length);
            setTimeout(() => setIsZooming(false), 100);
          }, 600);
        }, 4000);
      }, 5000);
    }, 600);
  };
  
  const displayImage = availableImages.length > 0 
    ? availableImages[currentImageIndex] 
    : destination.image;
  
  const hasMultipleImages = availableImages.length > 1 && supportsSlideshow();

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
        <div
          className={`
            absolute inset-0 w-full h-full bg-cover bg-center
            transition-all duration-700
            ${isZooming && hasMultipleImages ? 'scale-110' : 'scale-100'}
          `}
          style={{
            backgroundImage: `url(${displayImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="font-semibold">{destination.rating}</span>
        </div>
        
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {destination.location}
          </span>
        </div>
        
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
                  changeImage(index);
                }}
              />
            ))}
          </div>
        )}
        
        {hasMultipleImages && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-1.5">
              <svg className="w-4 h-4 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              {hasMultipleImages && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                  Slideshow
                </span>
              )}
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

export default DestinationCard;