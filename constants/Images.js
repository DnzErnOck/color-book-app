// src/constants/Images.js

// Basic SVG template for testing
const BASIC_SVG = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="50" width="700" height="500" fill="none" stroke="black" stroke-width="2" />
  <circle cx="400" cy="300" r="150" fill="none" stroke="black" stroke-width="2" />
  <path d="M 200 200 Q 400 50 600 200 T 800 300" fill="none" stroke="black" stroke-width="2" />
</svg>
`;

// Cartoon cat SVG for animal category
const CAT_SVG = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Cat body -->
  <ellipse cx="400" cy="350" rx="180" ry="160" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Cat head -->
  <circle cx="400" cy="220" r="120" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Cat ears -->
  <path d="M 320 130 L 350 50 L 380 130" fill="none" stroke="black" stroke-width="3" />
  <path d="M 480 130 L 450 50 L 420 130" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Cat eyes -->
  <ellipse cx="350" cy="200" rx="25" ry="30" fill="none" stroke="black" stroke-width="2" />
  <ellipse cx="450" cy="200" rx="25" ry="30" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Cat nose -->
  <path d="M 390 240 L 400 250 L 410 240 Z" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Cat whiskers -->
  <path d="M 340 250 L 260 230" fill="none" stroke="black" stroke-width="2" />
  <path d="M 340 260 L 260 260" fill="none" stroke="black" stroke-width="2" />
  <path d="M 340 270 L 260 290" fill="none" stroke="black" stroke-width="2" />
  
  <path d="M 460 250 L 540 230" fill="none" stroke="black" stroke-width="2" />
  <path d="M 460 260 L 540 260" fill="none" stroke="black" stroke-width="2" />
  <path d="M 460 270 L 540 290" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Cat mouth -->
  <path d="M 380 270 C 390 290, 410 290, 420 270" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Cat paws -->
  <ellipse cx="320" cy="500" rx="40" ry="30" fill="none" stroke="black" stroke-width="3" />
  <ellipse cx="480" cy="500" rx="40" ry="30" fill="none" stroke="black" stroke-width="3" />
</svg>
`;

// Cartoon dog SVG for animal category
const DOG_SVG = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Dog body -->
  <ellipse cx="400" cy="350" rx="180" ry="130" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Dog head -->
  <circle cx="400" cy="200" r="100" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Dog ears -->
  <path d="M 330 130 C 300 50, 250 80, 280 150" fill="none" stroke="black" stroke-width="3" />
  <path d="M 470 130 C 500 50, 550 80, 520 150" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Dog eyes -->
  <circle cx="350" cy="180" r="15" fill="none" stroke="black" stroke-width="2" />
  <circle cx="450" cy="180" r="15" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Dog nose -->
  <ellipse cx="400" cy="220" rx="25" ry="20" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Dog mouth -->
  <path d="M 350 250 C 400 280, 450 250, 450 250" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Dog tail -->
  <path d="M 580 350 C 620 300, 650 380, 600 400" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Dog legs -->
  <path d="M 300 400 L 280 500" fill="none" stroke="black" stroke-width="3" />
  <path d="M 350 400 L 330 500" fill="none" stroke="black" stroke-width="3" />
  <path d="M 450 400 L 470 500" fill="none" stroke="black" stroke-width="3" />
  <path d="M 500 400 L 520 500" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Dog paws -->
  <ellipse cx="280" cy="510" rx="20" ry="15" fill="none" stroke="black" stroke-width="2" />
  <ellipse cx="330" cy="510" rx="20" ry="15" fill="none" stroke="black" stroke-width="2" />
  <ellipse cx="470" cy="510" rx="20" ry="15" fill="none" stroke="black" stroke-width="2" />
  <ellipse cx="520" cy="510" rx="20" ry="15" fill="none" stroke="black" stroke-width="2" />
</svg>
`;

// Simple apple SVG for fruits category
const APPLE_SVG = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Apple body -->
  <path d="M 400 120 C 300 120, 200 200, 200 350 C 200 500, 300 550, 400 550 C 500 550, 600 500, 600 350 C 600 200, 500 120, 400 120" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Apple stem -->
  <path d="M 400 120 C 400 100, 420 70, 440 60" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Apple leaf -->
  <path d="M 440 60 C 470 40, 510 60, 500 90 C 480 80, 450 100, 440 60" fill="none" stroke="black" stroke-width="2" />
</svg>
`;

// Simple car SVG for vehicles category
const CAR_SVG = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Car body -->
  <path d="M 200 350 L 200 300 C 200 250, 250 200, 300 200 L 500 200 C 550 200, 600 250, 600 300 L 600 350 Z" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Car windows -->
  <path d="M 300 200 L 325 150 L 475 150 L 500 200" fill="none" stroke="black" stroke-width="2" />
  <line x1="400" y1="150" x2="400" y2="200" stroke="black" stroke-width="2" />
  
  <!-- Car wheels -->
  <circle cx="300" cy="350" r="50" fill="none" stroke="black" stroke-width="3" />
  <circle cx="500" cy="350" r="50" fill="none" stroke="black" stroke-width="3" />
  <circle cx="300" cy="350" r="25" fill="none" stroke="black" stroke-width="2" />
  <circle cx="500" cy="350" r="25" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Car details -->
  <rect x="220" y="250" width="50" height="30" rx="5" fill="none" stroke="black" stroke-width="2" />
  <rect x="530" y="250" width="50" height="30" rx="5" fill="none" stroke="black" stroke-width="2" />
</svg>
`;

// Space rocket SVG for space category
const ROCKET_SVG = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Rocket body -->
  <path d="M 400 100 C 350 100, 300 200, 300 350 L 300 450 L 500 450 L 500 350 C 500 200, 450 100, 400 100 Z" fill="none" stroke="black" stroke-width="3" />
  
  <!-- Rocket tip -->
  <path d="M 400 100 L 350 50 L 400 10 L 450 50 L 400 100" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Rocket fins -->
  <path d="M 300 450 L 250 500 L 300 500 L 300 450" fill="none" stroke="black" stroke-width="2" />
  <path d="M 500 450 L 550 500 L 500 500 L 500 450" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Rocket window -->
  <circle cx="400" cy="250" r="40" fill="none" stroke="black" stroke-width="2" />
  <circle cx="400" cy="250" r="20" fill="none" stroke="black" stroke-width="2" />
  
  <!-- Rocket exhaust -->
  <path d="M 350 500 C 350 550, 400 550, 400 580" fill="none" stroke="black" stroke-width="2" />
  <path d="M 400 500 C 400 560, 420 550, 420 590" fill="none" stroke="black" stroke-width="2" />
  <path d="M 450 500 C 450 550, 380 550, 380 580" fill="none" stroke="black" stroke-width="2" />
</svg>
`;

// Create a thumbnail from SVG for display in image grid
const createThumbnailFromSvg = (svgString) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

// Kategori resimleri
export const CATEGORY_IMAGES = {
  animals: require('../assets/categories/animals.png'),
  nature: require('../assets/images/splash.png'),
  fantasy: require('../assets/images/splash.png'),
  vehicles: require('../assets/images/splash.png'),
  food: require('../assets/images/splash.png'),
  fruits: require('../assets/images/splash.png'),
  space: require('../assets/images/splash.png'),
  underwater: require('../assets/images/splash.png'),
  patterns: require('../assets/images/splash.png'),
  holidays: require('../assets/images/splash.png'),
  mandalas: require('../assets/images/splash.png'),
  seasons: require('../assets/images/splash.png'),
  characters: require('../assets/images/splash.png')
};

// Kategori tanımlamaları
export const IMAGE_CATEGORIES = [
  {
    id: 'animals',
    name: 'Hayvanlar',
    image: CATEGORY_IMAGES.animals,
    color: '#FF9E44',
    isNew: false,
  },
  {
    id: 'nature',
    name: 'Doğa',
    image: CATEGORY_IMAGES.nature,
    color: '#4CAF50',
    isNew: false,
  },
  {
    id: 'fantasy',
    name: 'Fantezi',
    image: CATEGORY_IMAGES.fantasy,
    color: '#9C27B0',
    isNew: true,
  },
  {
    id: 'vehicles',
    name: 'Araçlar',
    image: CATEGORY_IMAGES.vehicles,
    color: '#2196F3',
    isNew: false,
  },
  {
    id: 'food',
    name: 'Yiyecekler',
    image: CATEGORY_IMAGES.food,
    color: '#E91E63',
    isNew: false,
  },
  {
    id: 'fruits',
    name: 'Meyveler',
    image: CATEGORY_IMAGES.fruits,
    color: '#FF5722',
    isNew: true,
  },
  {
    id: 'space',
    name: 'Uzay',
    image: CATEGORY_IMAGES.space,
    color: '#0D47A1',
    isNew: false,
  },
  {
    id: 'underwater',
    name: 'Denizaltı',
    image: CATEGORY_IMAGES.underwater,
    color: '#00BCD4',
    isNew: false,
  },
  {
    id: 'patterns',
    name: 'Desenler',
    image: CATEGORY_IMAGES.patterns,
    color: '#607D8B',
    isNew: false,
  },
  {
    id: 'holidays',
    name: 'Tatiller',
    image: CATEGORY_IMAGES.holidays,
    color: '#FF5722',
    isNew: false,
  },
  {
    id: 'mandalas',
    name: 'Mandalalar',
    image: CATEGORY_IMAGES.mandalas,
    color: '#3F51B5',
    isNew: false,
  },
  {
    id: 'seasons',
    name: 'Mevsimler',
    image: CATEGORY_IMAGES.seasons,
    color: '#8BC34A',
    isNew: false,
  },
  {
    id: 'characters',
    name: 'Karakterler',
    image: CATEGORY_IMAGES.characters,
    color: '#FFC107',
    isNew: true,
  },
];

// Boyama resimlerini kategorilere göre tanımlama
export const IMAGES = [
  // Hayvanlar kategorisi
  {
    id: 'animal-1',
    category: 'animals',
    name: 'Kedi',
    thumbnail: require('../assets/images/asset1.png'), // Fallback for display
    svgContent: CAT_SVG, // Actual SVG content for coloring
    isColored: false
  },
  {
    id: 'animal-2',
    category: 'animals',
    name: 'Köpek',
    thumbnail: require('../assets/images/asset1.png'),
    svgContent: DOG_SVG,
    isColored: false
  },
  {
    id: 'animal-3',
    category: 'animals',
    name: 'At',
    thumbnail: require('../assets/images/asset1.png'),
    svgContent: CAT_SVG, // Reusing cat for now, replace with horse SVG
    isColored: false
  },
  {
    id: 'animal-4',
    category: 'animals',
    name: 'At1',
    thumbnail: require('../assets/images/asset1.png'),
    svgContent: DOG_SVG, // Reusing dog for now
    isColored: false
  },
  {
    id: 'animal-5',
    category: 'animals',
    name: 'At3',
    thumbnail: require('../assets/images/asset1.png'),
    svgContent: CAT_SVG, // Reusing cat for now
    isColored: true
  },
  {
    id: 'animal-6',
    category: 'animals',
    name: 'At4',
    thumbnail: require('../assets/images/asset1.png'),
    svgContent: DOG_SVG, // Reusing dog for now
    isColored: false
  },
  {
    id: 'animal-7',
    category: 'animals',
    name: 'At5',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: CAT_SVG, // Reusing cat for now
    isColored: false
  },
  {
    id: 'animal-8',
    category: 'animals',
    name: 'At6',
    thumbnail: require('../assets/images/asset1.png'),
    svgContent: DOG_SVG, // Reusing dog for now
    isColored: false
  },
  {
    id: 'animal-9',
    category: 'animals',
    name: 'At6',
    thumbnail: require('../assets/images/asset1.png'),
    svgContent: CAT_SVG, // Reusing cat for now
    isColored: false
  },
  
  // Meyveler kategorisi
  {
    id: 'fruit-1',
    category: 'fruits',
    name: 'Karpuz',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now, replace with watermelon SVG
    isColored: false
  },
  {
    id: 'fruit-2',
    category: 'fruits',
    name: 'Kabak',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now
    isColored: true
  },
  {
    id: 'fruit-3',
    category: 'fruits',
    name: 'Ananas',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now
    isColored: false
  },
  {
    id: 'fruit-4',
    category: 'fruits',
    name: 'Muz',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now
    isColored: false
  },
  {
    id: 'fruit-5',
    category: 'fruits',
    name: 'Avokado',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now
    isColored: false
  },
  {
    id: 'fruit-6',
    category: 'fruits',
    name: 'Çilek',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now
    isColored: false
  },
  {
    id: 'fruit-7',
    category: 'fruits',
    name: 'Üzüm',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now
    isColored: false
  },
  {
    id: 'fruit-8',
    category: 'fruits',
    name: 'Böğürtlen',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now
    isColored: false
  },
  {
    id: 'fruit-9',
    category: 'fruits',
    name: 'Armut',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now
    isColored: false
  },
  {
    id: 'fruit-10',
    category: 'fruits',
    name: 'Kiraz',
    thumbnail: require('../assets/images/splash.png'),
    svgContent: APPLE_SVG, // Reusing apple for now
    isColored: false
  },
  
  
  // Doğa kategorisi
  {
    id: 'nature-1',
    category: 'nature',
    name: 'Ağaç',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png')
  },
  {
    id: 'nature-2',
    category: 'nature',
    name: 'Dağ',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png')
  },

  // Fantezi kategorisi
  {
    id: 'fantasy-1',
    category: 'fantasy',
    name: 'Unicorn',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png')
  },
  {
    id: 'fantasy-2',
    category: 'fantasy',
    name: 'Peri',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png')
  },

  // Araçlar kategorisi
  {
    id: 'vehicle-1',
    category: 'vehicles',
    name: 'Araba',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png')
  },
  {
    id: 'vehicle-2',
    category: 'vehicles',
    name: 'Uçak',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png')
  },

  // Diğer kategoriler için benzer şekilde ekleme yapılabilir...
];