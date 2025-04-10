// src/constants/Images.js

// Kategori resimleri
export const CATEGORY_IMAGES = {
  animals: require('../assets/categories/animals.png'),
  nature: require('../assets/images/splash.png'), // Geçici olarak splash kullanıyoruz
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
    thumbnail: require('../assets/images/asset1.png'), // Gerçek resimler eklenecek
    source: require('../assets/images/asset1.png')
  },
  {
    id: 'animal-2',
    category: 'animals',
    name: 'Köpek',
    thumbnail: require('../assets/images/asset1.png'),
    source: require('../assets/images/asset1.png')
  },
  {
    id: 'animal-3',
    category: 'animals',
    name: 'At',
    thumbnail: require('../assets/images/asset1.png'),
    source: require('../assets/images/asset1.png')
  },
  {
    id: 'animal-4',
    category: 'animals',
    name: 'At1',
    thumbnail: require('../assets/images/asset1.png'),
    source: require('../assets/images/asset1.png')
  },
  {
    id: 'animal-5',
    category: 'animals',
    name: 'At3',
    thumbnail: require('../assets/images/asset1.png'),
    source: require('../assets/images/asset1.png')
  },
  {
    id: 'animal-6',
    category: 'animals',
    name: 'At4',
    thumbnail: require('../assets/images/asset1.png'),
    source: require('../assets/images/asset1.png')
  },
  {
    id: 'animal-7',
    category: 'animals',
    name: 'At5',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png')
  },
  {
    id: 'animal-8',
    category: 'animals',
    name: 'At6',
    thumbnail: require('../assets/images/asset1.png'),
    source: require('../assets/images/asset1.png')
  },
  {
    id: 'animal-9',
    category: 'animals',
    name: 'At6',
    thumbnail: require('../assets/images/asset1.png'),
    source: require('../assets/images/asset1.png')
  },
  
  // Meyveler kategorisi
  {
    id: 'fruit-1',
    category: 'fruits',
    name: 'Karpuz',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
    isColored: false
  },
  {
    id: 'fruit-2',
    category: 'fruits',
    name: 'Kabak',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
    isColored: true
  },
  {
    id: 'fruit-3',
    category: 'fruits',
    name: 'Ananas',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
    isColored: false
  },
  {
    id: 'fruit-4',
    category: 'fruits',
    name: 'Muz',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
    isColored: false
  },
  {
    id: 'fruit-5',
    category: 'fruits',
    name: 'Avokado',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
    isColored: false
  },
  {
    id: 'fruit-6',
    category: 'fruits',
    name: 'Çilek',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
    isColored: false
  },
  {
    id: 'fruit-7',
    category: 'fruits',
    name: 'Üzüm',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
    isColored: false
  },
  {
    id: 'fruit-8',
    category: 'fruits',
    name: 'Böğürtlen',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
    isColored: false
  },
  {
    id: 'fruit-9',
    category: 'fruits',
    name: 'Armut',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
    isColored: false
  },
  {
    id: 'fruit-10',
    category: 'fruits',
    name: 'Kiraz',
    thumbnail: require('../assets/images/splash.png'),
    source: require('../assets/images/splash.png'),
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