// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Alert,
  Dimensions,
  Platform,
  Animated
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Constants
import { COLORS } from './constants/Colors';
import { BRUSH_TYPES } from './constants/BrushTypes';
import { IMAGES } from './constants/Images';

// Components
import Header from './components/Header';
import ModeToggle from './components/ModeToggle';
import ColoringCanvas from './components/ColoringCanvas';
import ToolStatus from './components/ToolStatus';
import ToolSelectors from './components/ToolSelectors';
import BottomToolbar from './components/BottomToolbar';
import MenuModal from './components/modals/MenuModal';
import ImageSelector from './components/modals/ImageSelector';

// Ekran boyutunu al
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  // State yönetimi
  const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
  const [selectedImage, setSelectedImage] = useState(IMAGES[0]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [brushOpacity, setBrushOpacity] = useState(0.9);
  const [brushBlur, setBrushBlur] = useState(0);
  const [brushPressureEffect, setBrushPressureEffect] = useState(0.2);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [currentPoints, setCurrentPoints] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [brushType, setBrushType] = useState(BRUSH_TYPES[0]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  
  // Navigasyon ve zoom state'leri
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
  
  // İzinleri kontrol et
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionGranted(status === 'granted');
    })();
  }, []);
  
  // Resim değiştiğinde çizimleri temizle
  useEffect(() => {
    setPaths([]);
    setUndoStack([]);
    setRedoStack([]);
    resetView();
  }, [selectedImage]);
  
  // Mod değiştirme - Çizim/Navigasyon
  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };
  
  // Görünümü sıfırla
  const resetView = () => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  // Fırça tipini değiştir
  const changeBrushType = (type) => {
    setBrushType(type);
    setBrushOpacity(type.opacity);
    setBrushBlur(type.blur);
    setBrushPressureEffect(type.pressureEffect);
    setMenuVisible(false);
  };
  
  // Menüyü göster/gizle
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  
  // Fırça boyutunu değiştir
  const changeBrushSize = (size) => {
    setBrushSize(size);
    setMenuVisible(false);
  };
  
  // Silgi modunu aç/kapa
  const toggleEraser = () => {
    setIsEraser(!isEraser);
    
    // Kullanıcıya görsel geri bildirim
    if (!isEraser) {
      Alert.alert('Silgi Modu', 'Silgi etkinleştirildi! Çizimleri silmek için dokunun.', [{ text: 'Tamam' }]);
    }
    
    setMenuVisible(false);
  };
  
  // Geri al
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, [...paths]]);
      setPaths(lastState);
      setUndoStack(undoStack.slice(0, -1));
    }
  };
  
  // İleri al
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, [...paths]]);
      setPaths(nextState);
      setRedoStack(redoStack.slice(0, -1));
    }
  };
  
  // Tüm çizimleri temizle
  const clearAll = () => {
    Alert.alert(
      'Temizle',
      'Tüm boyamaları temizlemek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Temizle', 
          onPress: () => {
            // Mevcut çizimleri geri alma yığınına ekle
            setUndoStack([...undoStack, [...paths]]);
            
            // Çizimleri temizle
            setPaths([]);
            
            // İleri alma yığınını sıfırla
            setRedoStack([]);
            
            // Kullanıcıya geri bildirim
            Alert.alert('Başarılı', 'Tüm çizimler temizlendi!', [{ text: 'Tamam' }]);
          }
        }
      ]
    );
    setMenuVisible(false);
  };
  
  // Resmi kaydet
  const handleSave = async () => {
    if (!permissionGranted) {
      Alert.alert('İzin Gerekli', 'Resmi kaydetmek için depolama iznine ihtiyacımız var.');
      return;
    }
    
    try {
      // Yakınlaştırma ve kaydırmayı sıfırla
      const originalScale = scale;
      const originalTranslateX = translateX;
      const originalTranslateY = translateY;
      
      // Kaydetmeden önce görünümü sıfırla
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      
      // Kısa bir gecikme ile ekran görüntüsü al
      setTimeout(async () => {
        const uri = await viewShotRef.current.capture();
        const asset = await MediaLibrary.createAssetAsync(uri);
        
        // Görünümü eski haline getir
        setScale(originalScale);
        setTranslateX(originalTranslateX);
        setTranslateY(originalTranslateY);
        
        Alert.alert('Kaydedildi!', 'Resminiz galeriye kaydedildi. Harika iş!', [
          { text: 'Tamam' }
        ]);
      }, 100);
    } catch (error) {
      Alert.alert('Hata', 'Resim kaydedilirken bir hata oluştu.');
      console.error(error);
    }
  };
  
  // Resmi paylaş
  const handleShare = async () => {
    try {
      // Yakınlaştırma ve kaydırmayı sıfırla
      const originalScale = scale;
      const originalTranslateX = translateX;
      const originalTranslateY = translateY;
      
      // Paylaşmadan önce görünümü sıfırla
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      
      // Kısa bir gecikme ile ekran görüntüsü al
      setTimeout(async () => {
        const uri = await viewShotRef.current.capture();
        
        // Görünümü eski haline getir
        setScale(originalScale);
        setTranslateX(originalTranslateX);
        setTranslateY(originalTranslateY);
        
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert('Paylaşım Kullanılamıyor', 'Bu cihazda paylaşım özelliği kullanılamıyor.');
        }
      }, 100);
    } catch (error) {
      Alert.alert('Hata', 'Resim paylaşılırken bir hata oluştu.');
      console.error(error);
    }
  };
  
  // Yeni resim
  const handleNewDrawing = () => {
    setShowImageSelector(true);
  };
  
  // Renk seçimini işle
  const handleColorSelect = (color) => {
    setSelectedColor(color.hex);
    setMenuVisible(false);
  };

  // Ana path verilerini update'leme fonksiyonu
  const updatePathData = (newPath, newPoints) => {
    setCurrentPath(newPath);
    setCurrentPoints(newPoints);
  };

  // Yeni path ekleme
  const addNewPath = (path) => {
    setUndoStack([...undoStack, [...paths]]);
    setPaths(prevPaths => [...prevPaths, path]);
    setRedoStack([]);
  };
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        
        <Header title="Neşeli Boyama" onMenuPress={toggleMenu} />
        
      <ModeToggle 
        isDrawingMode={isDrawingMode} 
        setIsDrawingMode={setIsDrawingMode} 
        resetView={resetView} 
      />
        
        <ColoringCanvas 
          isDrawingMode={isDrawingMode}
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
        
        <ToolSelectors 
          brushType={brushType}
          changeBrushType={changeBrushType}
          brushSize={brushSize}
          changeBrushSize={changeBrushSize}
          selectedColor={selectedColor}
          handleColorSelect={handleColorSelect}
          colors={COLORS}
          brushTypes={BRUSH_TYPES}
        />
        
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
        
        <ImageSelector 
          visible={showImageSelector}
          setVisible={setShowImageSelector}
          images={IMAGES}
          onSelectImage={setSelectedImage}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

// Stil tanımlamaları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  }
});

export default App;