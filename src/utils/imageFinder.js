

const imageCollections = {};

export const initImageCollections = async () => {
  try {
    const gondolaImages = [];
    for (let i = 1; i <= 2; i++) {
      try {
        const image = await import(`@/assets/img/gondolatimang${i}.jpg`);
        gondolaImages.push(image.default);
      } catch (err) {
        console.log(`Gambar gondolatimang${i}.jpg tidak ditemukan`);
      }
    }
    if (gondolaImages.length > 0) {
      imageCollections['gondolatimang'] = gondolaImages;
    }

    const merapiImages = [];
    for (let i = 1; i <= 2; i++) {
      try {
        const image = await import(`@/assets/img/merapi${i}.jpg`);
        merapiImages.push(image.default);
      } catch (err) {
        console.log(`Gambar merapi${i}.jpg tidak ditemukan`);
      }
    }
    if (merapiImages.length > 0) {
      imageCollections['merapi'] = merapiImages;
    }

    const gumukImages = [];
    for (let i = 1; i <= 2; i++) {
      try {
        const image = await import(`@/assets/img/gumukpasir${i}.jpg`);
        gumukImages.push(image.default);
      } catch (err) {
        console.log(`Gambar gumukpasir${i}.jpg tidak ditemukan`);
      }
    }
    if (gumukImages.length > 0) {
      imageCollections['gumukpasir'] = gumukImages;
    }

    console.log('Image collections loaded:', imageCollections);
    return imageCollections;
  } catch (error) {
    console.error('Error loading image collections:', error);
    return {};
  }
};

export const getImagesForDestination = (destinationName) => {
  const name = destinationName.toLowerCase();
  
  if (name.includes('gondola') || name.includes('timang')) {
    return imageCollections['gondolatimang'] || [];
  }
  
  if (name.includes('merapi')) {
    return imageCollections['merapi'] || [];
  }
  
  if (name.includes('gumuk') || name.includes('pasir')) {
    return imageCollections['gumukpasir'] || [];
  }
  
  return null;
};