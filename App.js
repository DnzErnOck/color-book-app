// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Alert,
  Dimensions,
  Platform,
  Animated,
  StatusBar,
  BackHandler,
  Image
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Sharing from 'expo-sharing';
import * as ScreenOrientation from 'expo-screen-orientation';

// Constants
import { COLORS } from './constants/Colors';
import { BRUSH_TYPES } from './constants/BrushTypes';
// Import fallback data in case the imports fail
const DEFAULT_IMAGES = [];
const DEFAULT_CATEGORIES = [];

import { IMAGES, IMAGE_CATEGORIES, CATEGORY_IMAGES } from './constants/Images';

// Components
import Header from './components/Header';
import ModeToggle from './components/ModeToggle';
import ColoringCanvas from './components/ColoringCanvas';
import ToolStatus from './components/ToolStatus';
import ToolSelectors from './components/ToolSelectors';
import BottomToolbar from './components/BottomToolbar';
import MenuModal from './components/modals/MenuModal';
import CategorySelector from './components/modals/CategorySelector';
import ImageGrid from './components/modals/ImageGrid';
import { useFonts } from 'expo-font';


// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  // Enforce landscape orientation
  useEffect(() => {
    async function setOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setOrientation();
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
  
  const [fontsLoaded] = useFonts({
    'ComicNeue-Bold': require('./assets/fonts/ComicNeue-Bold.ttf'),
    'ComicNeue-Regular': require('./assets/fonts/ComicNeue-Regular.ttf'),
  });

  // App states
  const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [brushOpacity, setBrushOpacity] = useState(0.9);
  const [brushBlur, setBrushBlur] = useState(0);
  const [brushPressureEffect, setBrushPressureEffect] = useState(0.2);
  const [showCategorySelector, setShowCategorySelector] = useState(true);
  const [isEraser, setIsEraser] = useState(false);
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [currentPoints, setCurrentPoints] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [brushType, setBrushType] = useState(BRUSH_TYPES[0]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  
  // Navigation and zoom states
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  
  // Refs
  const viewShotRef = useRef(null);
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const baseTranslateX = useRef(new Animated.Value(0)).current;
  const baseTranslateY = useRef(new Animated.Value(0)).current;
  
  // Prepare images by category for CategorySelector - with safety check
  const categoryImages = {};
  if (Array.isArray(IMAGE_CATEGORIES) && Array.isArray(IMAGES)) {
    IMAGE_CATEGORIES.forEach(category => {
      categoryImages[category.id] = IMAGES.filter(img => img.category === category.id);
    });
  }
  
  // Check permissions
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionGranted(status === 'granted');
    })();
  }, []);

  // Handle back button in Android
  useEffect(() => {
    const backAction = () => {
      if (selectedImage) {
        if (paths.length > 0) {
          Alert.alert(
            "Çıkış",
            "Yaptığınız boyama kaydedilmeyecek. Çıkmak istediğinize emin misiniz?",
            [
              { text: "İptal", style: "cancel" },
              { text: "Çık", onPress: () => backToCategories() }
            ]
          );
        } else {
          backToCategories();
        }
        return true;
      } else if (showCategorySelector) {
        // At main menu, allow normal back action
        return false;
      } else if (currentCategory) {
        setCurrentCategory(null);
        setShowCategorySelector(true);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [selectedImage, paths, showCategorySelector, currentCategory]);
  
  // Clear drawings when image changes
  useEffect(() => {
    if (selectedImage) {
      setPaths([]);
      setUndoStack([]);
      setRedoStack([]);
      resetView();
    }
  }, [selectedImage]);
  
  // Back to category selection
  const backToCategories = () => {
    setSelectedImage(null);
    setShowCategorySelector(true);
    setCurrentCategory(null);
    setPaths([]);
    setUndoStack([]);
    setRedoStack([]);
  };

  // Select a category
  const selectCategory = (category) => {
    setCurrentCategory(category);
    setShowCategorySelector(false);
  };

  // Select an image
  const selectImage = (image) => {
    setSelectedImage(image);
  };
  
  // Toggle between Drawing/Navigation mode
  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };
  
  // Reset view with animation
  const resetView = () => {
    Animated.parallel([
      Animated.spring(baseScale, {
        toValue: 1,
        damping: 15,
        mass: 1,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
        useNativeDriver: true
      }),
      Animated.spring(baseTranslateX, {
        toValue: 0,
        damping: 15,
        mass: 1,
        stiffness: 100,
        useNativeDriver: true
      }),
      Animated.spring(baseTranslateY, {
        toValue: 0,
        damping: 15,
        mass: 1,
        stiffness: 100,
        useNativeDriver: true
      })
    ]).start();
    
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  // Change brush type
  const changeBrushType = (type) => {
    setBrushType(type);
    setBrushOpacity(type.opacity);
    setBrushBlur(type.blur);
    setBrushPressureEffect(type.pressureEffect);
    setMenuVisible(false);
  };
  
  // Toggle menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  
  // Change brush size
  const changeBrushSize = (size) => {
    setBrushSize(size);
    setMenuVisible(false);
  };
  
  // Toggle eraser mode
  const toggleEraser = () => {
    setIsEraser(!isEraser);
    
    if (!isEraser) {
      Alert.alert('Silgi Modu', 'Silgi etkinleştirildi! Çizimleri silmek için dokunun.', [{ text: 'Tamam' }]);
    }
    
    setMenuVisible(false);
  };
  
  // Undo
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, [...paths]]);
      setPaths(lastState);
      setUndoStack(undoStack.slice(0, -1));
    }
  };
  
  // Redo
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, [...paths]]);
      setPaths(nextState);
      setRedoStack(redoStack.slice(0, -1));
    }
  };
  
  // Clear all drawings
  const clearAll = () => {
    Alert.alert(
      'Temizle',
      'Tüm boyamaları temizlemek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Temizle', 
          onPress: () => {
            setUndoStack([...undoStack, [...paths]]);
            setPaths([]);
            setRedoStack([]);
          }
        }
      ]
    );
    setMenuVisible(false);
  };
  
  // Save image
  const handleSave = async () => {
    if (!permissionGranted) {
      Alert.alert('İzin Gerekli', 'Resmi kaydetmek için depolama iznine ihtiyacımız var.');
      return;
    }
    
    try {
      const originalScale = scale;
      const originalTranslateX = translateX;
      const originalTranslateY = translateY;
      
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      
      setTimeout(async () => {
        const uri = await viewShotRef.current.capture();
        const asset = await MediaLibrary.createAssetAsync(uri);
        
        setScale(originalScale);
        setTranslateX(originalTranslateX);
        setTranslateY(originalTranslateY);
        
        Alert.alert('Kaydedildi!', 'Resminiz galeriye kaydedildi. Harika iş!', [
          { text: 'Tamam' }
        ]);
      }, 200);
    } catch (error) {
      Alert.alert('Hata', 'Resim kaydedilirken bir hata oluştu: ' + error.message);
      console.error(error);
    }
  };
  
  // Share image
  const handleShare = async () => {
    try {
      const originalScale = scale;
      const originalTranslateX = translateX;
      const originalTranslateY = translateY;
      
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      
      setTimeout(async () => {
        const uri = await viewShotRef.current.capture();
        
        setScale(originalScale);
        setTranslateX(originalTranslateX);
        setTranslateY(originalTranslateY);
        
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert('Paylaşım Kullanılamıyor', 'Bu cihazda paylaşım özelliği kullanılamıyor.');
        }
      }, 200);
    } catch (error) {
      Alert.alert('Hata', 'Resim paylaşılırken bir hata oluştu: ' + error.message);
      console.error(error);
    }
  };
  
  // New drawing
  const handleNewDrawing = () => {
    if (paths.length > 0) {
      Alert.alert(
        "Yeni Boyama",
        "Mevcut boyamanız kaydedilmeyecek. Devam etmek istiyor musunuz?",
        [
          { text: "İptal", style: "cancel" },
          { text: "Devam", onPress: () => backToCategories() }
        ]
      );
    } else {
      backToCategories();
    }
    setMenuVisible(false);
  };
  
  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color.hex);
    setIsEraser(false);
  };

  // Update main path data
  const updatePathData = (newPath, newPoints) => {
    setCurrentPath(newPath);
    setCurrentPoints(newPoints);
  };

  // Add new path
  const addNewPath = (path) => {
    setUndoStack([...undoStack, [...paths]]);
    setPaths(prevPaths => [...prevPaths, path]);
    setRedoStack([]);
  };

  // Add sample image and category data if none was loaded
  useEffect(() => {
    if (!Array.isArray(IMAGES) || IMAGES.length === 0) {
      // Create sample images
      IMAGES = [
        {
          id: 'sample1',
          category: 'animals',
          thumbnail: require('./assets/splash.png'), // Use splash as a placeholder
          source: require('./assets/splash.png')
        },
        {
          id: 'sample2',
          category: 'animals',
          thumbnail: require('./assets/splash.png'),
          source: require('./assets/splash.png')
        }
      ];
    }
    
    if (!Array.isArray(IMAGE_CATEGORIES) || IMAGE_CATEGORIES.length === 0) {
      // Create sample categories
      IMAGE_CATEGORIES = [
        {
          id: 'animals',
          name: 'Hayvanlar',
          color: '#FFD166',
          image: require('./assets/splash.png'),
          isNew: false
        }
      ];
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Image 
          source={require('./assets/splash.png')} 
          style={styles.splashImage}
          resizeMode="contain"
        />
      </View>
    );
  }
  
  // Safety check before rendering
  const filteredImages = currentCategory && Array.isArray(IMAGES) 
    ? IMAGES.filter(img => img && img.category === currentCategory.id)
    : [];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <SafeAreaView style={styles.container}>
        {selectedImage ? (
          // Drawing screen
          <>
            <Header 
              title="Neşeli Boyama" 
              onMenuPress={toggleMenu} 
              onBackPress={backToCategories}
            />
            
            <View style={styles.contentContainer}>
              <View style={styles.toolsContainer}>
                <ToolSelectors 
                  brushType={brushType}
                  changeBrushType={changeBrushType}
                  brushSize={brushSize}
                  changeBrushSize={changeBrushSize}
                  selectedColor={selectedColor}
                  handleColorSelect={handleColorSelect}
                  colors={COLORS}
                  brushTypes={BRUSH_TYPES}
                  isVertical={true}
                />
              </View>
              
              <View style={styles.canvasContainer}>
                <ModeToggle 
                  isDrawingMode={isDrawingMode} 
                  setIsDrawingMode={setIsDrawingMode} 
                  resetView={resetView} 
                />
                
                <ColoringCanvas 
                  isDrawingMode={isDrawingMode}
                  setIsDrawingMode={setIsDrawingMode}
                  scale={scale}
                  setScale={setScale}
                  translateX={translateX}
                  setTranslateX={setTranslateX}
                  translateY={translateY}
                  setTranslateY={setTranslateY}
                  isPanning={isPanning}
                  setIsPanning={setIsPanning}
                  isPinching={isPinching}
                  setIsPinching={setIsPinching}
                  baseScale={baseScale}
                  pinchScale={pinchScale}
                  baseTranslateX={baseTranslateX}
                  baseTranslateY={baseTranslateY}
                  viewShotRef={viewShotRef}
                  selectedImage={selectedImage}
                  paths={paths}
                  currentPath={currentPath}
                  selectedColor={selectedColor}
                  brushSize={brushSize}
                  brushOpacity={brushOpacity}
                  brushBlur={brushBlur}
                  isEraser={isEraser}
                  brushPressureEffect={brushPressureEffect}
                  updatePathData={updatePathData}
                  addNewPath={addNewPath}
                  currentPoints={currentPoints}
                />
                
                <ToolStatus 
                  isDrawingMode={isDrawingMode}
                  isEraser={isEraser}
                  brushType={brushType}
                  brushSize={brushSize}
                  scale={scale}
                />
              </View>
            </View>
            
            <BottomToolbar 
              undoStack={undoStack}
              handleUndo={handleUndo}
              redoStack={redoStack}
              handleRedo={handleRedo}
              isEraser={isEraser}
              toggleEraser={toggleEraser}
              clearAll={clearAll}
              handleNewDrawing={handleNewDrawing}
              handleSave={handleSave}
              handleShare={handleShare}
            />
            
            <MenuModal 
              visible={menuVisible}
              toggleMenu={toggleMenu}
              brushType={brushType}
              changeBrushType={changeBrushType}
              brushSize={brushSize}
              changeBrushSize={changeBrushSize}
              isEraser={isEraser}
              toggleEraser={toggleEraser}
              clearAll={clearAll}
              handleNewDrawing={handleNewDrawing}
              handleSave={handleSave}
              handleShare={handleShare}
              brushTypes={BRUSH_TYPES}
            />
          </>
        ) : (
          // Selection screens
          <>
            {showCategorySelector && (
              <CategorySelector 
                categories={IMAGE_CATEGORIES || []} 
                categoryImages={categoryImages}
                onSelectCategory={selectCategory}
              />
            )}
            
            {currentCategory && !selectedImage && !showCategorySelector && (
              <ImageGrid 
                category={currentCategory}
                images={filteredImages}
                onSelectImage={selectImage}
                onGoBack={() => {
                  setCurrentCategory(null);
                  setShowCategorySelector(true);
                }}
              />
            )}
          </>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
  },
  splashImage: {
    width: '50%',
    height: '50%',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  toolsContainer: {
    width: 80,
    backgroundColor: '#DDECFF',
    borderRightWidth: 2,
    borderColor: '#BBDEFB',
  },
  canvasContainer: {
    flex: 1,
    position: 'relative',
  }
});

export default App;