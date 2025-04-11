// src/components/modals/ColoringPage.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  Text, // Text bileşenini ekledim
  Dimensions,
  Alert
} from 'react-native';
import { Svg, Path, G } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';
import ViewShot from 'react-native-view-shot';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isMobile = SCREEN_WIDTH < 600;

const ColoringPage = ({ image, onGoBack, onSave }) => {
  console.log('Selected image:', image);
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default black
  const [toolSelected, setToolSelected] = useState('pen'); // Default tool
  const [paths, setPaths] = useState([]); // Store all drawing paths
  const [currentPath, setCurrentPath] = useState(null); // Current drawing path
  const [undoStack, setUndoStack] = useState([]); // For undo functionality
  const [imageLoaded, setImageLoaded] = useState(false); // Track if image is loaded
  
  const viewShotRef = useRef(null);
  const imageSize = useRef({ width: 0, height: 0 });

  // Color palette options
  const colors = [
    { id: 'color-1', color: '#FF0000' }, // Red
    { id: 'color-2', color: '#FFA500' }, // Orange
    { id: 'color-3', color: '#FFFF00' }, // Yellow
    { id: 'color-4', color: '#008000' }, // Green
    { id: 'color-5', color: '#0000FF' }, // Blue
    { id: 'color-6', color: '#4B0082' }, // Indigo
    { id: 'color-7', color: '#800080' }, // Purple
    { id: 'color-8', color: '#000000' }, // Black
  ];

  // Use a default image if the passed image is not valid
  useEffect(() => {
    if (!image || !image.fullSize) {
      console.warn("Image not properly provided! Using fallback.");
      // You can add a fallback image here if needed
    }
  }, [image]);

  // Handle tool selection
  const selectTool = (tool) => {
    setToolSelected(tool);
    
    // Special actions for some tools
    if (tool === 'undo') {
      handleUndo();
      setToolSelected('pen'); // Always revert to pen after undo
    } else if (tool === 'reset') {
      Alert.alert(
        "Reset Drawing",
        "Are you sure you want to clear the entire drawing?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setToolSelected('pen')
          },
          { 
            text: "Reset", 
            onPress: () => {
              setPaths([]);
              setUndoStack([]);
              setToolSelected('pen');
            }
          }
        ]
      );
    }
  };

  // Handle color selection
  const selectColor = (color) => {
    setSelectedColor(color);
    // If eraser was selected, switch back to pen when selecting a color
    if (toolSelected === 'eraser') {
      setToolSelected('pen');
    }
  };

  // Handle undo functionality
  const handleUndo = () => {
    if (paths.length > 0) {
      const newPaths = [...paths];
      const removedPath = newPaths.pop();
      setUndoStack([...undoStack, removedPath]);
      setPaths(newPaths);
    }
  };

  // Handle drawing start
  const handleTouchStart = (event) => {
    if (toolSelected === 'reset' || toolSelected === 'undo') return;
    
    const { locationX, locationY } = event.nativeEvent;
    
    // For fill tool
    if (toolSelected === 'fill') {
      // In a real app, you would implement a flood fill algorithm here
      // For simplicity, we'll just add a basic rectangle for demonstration
      const newRect = {
        type: 'fill',
        x: locationX,
        y: locationY,
        color: selectedColor,
      };
      setPaths([...paths, newRect]);
      return;
    }
    
    // For pen or eraser - fixed eraser by using a white color instead of transparent
    const newPath = {
      type: toolSelected,
      color: toolSelected === 'eraser' ? '#FFFFFF' : selectedColor, // Use white for eraser
      strokeWidth: toolSelected === 'eraser' ? 20 : 5, // Larger stroke for eraser
      points: [{ x: locationX, y: locationY }],
    };
    setCurrentPath(newPath);
  };

  // Handle drawing move
  const handleTouchMove = (event) => {
    if (!currentPath || toolSelected === 'fill' || toolSelected === 'reset' || toolSelected === 'undo') return;
    
    const { locationX, locationY } = event.nativeEvent;
    
    const updatedPath = {
      ...currentPath,
      points: [...currentPath.points, { x: locationX, y: locationY }],
    };
    setCurrentPath(updatedPath);
  };

  // Handle drawing end
  const handleTouchEnd = () => {
    if (!currentPath || toolSelected === 'fill' || toolSelected === 'reset' || toolSelected === 'undo') return;
    
    setPaths([...paths, currentPath]);
    setCurrentPath(null);
    setUndoStack([]); // Clear redo stack when new drawing is made
  };

  // Convert points to SVG path data
  const pointsToPath = (points) => {
    if (!points || points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  // Handle image load to get dimensions and set loaded state
  const handleImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    imageSize.current = { width, height };
    setImageLoaded(true);
    console.log("Image loaded successfully:", width, "x", height);
  };

  // Handle image load error
  const handleImageError = () => {
    console.error("Failed to load image!");
    Alert.alert("Error", "Failed to load the coloring image. Please try another image.");
  };

  // Handle saving the colored image
  const handleSaveImage = async () => {
    if (viewShotRef.current) {
      try {
        const uri = await viewShotRef.current.capture();
        console.log("Image saved to:", uri);
        
        // In a real app, you would save this to device gallery or app storage
        Alert.alert("Success", "Your coloring has been saved!");
        
        // Call the parent's onSave callback
        if (onSave) onSave(uri);
      } catch (error) {
        console.error("Failed to save image:", error);
        Alert.alert("Error", "Failed to save your coloring");
      }
    }
  };

  // For debugging: force display a test image if the provided one fails
  const imageSource = image && image.source ? image.source : require('../../assets/images/test-coloring-page.png');

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.actionButton} onPress={onGoBack}>
          <Image 
            source={require('../../assets/icons/back.png')} 
            style={styles.actionIcon} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.saveButton]} 
          onPress={handleSaveImage}
        >
          <Image 
            source={require('../../assets/icons/save.png')} 
            style={styles.actionIcon} 
          />
        </TouchableOpacity>
      </View>

      {/* Main Canvas Area */}
      <ViewShot ref={viewShotRef} style={styles.canvasContainer}>
        <View
          style={styles.drawingArea}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Display fallback text if image is missing */}
         {/*  {!imageLoaded && !image?.fullSize && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>No image selected or image failed to load</Text>
              <Text style={styles.errorSubtext}>Please go back and select another image</Text>
            </View>
          )} */}
          
          {/* The coloring image */}
          <Image 
            source={imageSource}
            style={styles.coloringImage} 
            onLoad={handleImageLoad}
            onError={handleImageError}
            resizeMode="contain"
          />
          
          {/* SVG drawing layer */}
          <Svg style={StyleSheet.absoluteFill}>
            {/* Render all completed paths */}
            {paths.map((path, index) => {
              if (path.type === 'fill') {
                // Simple fill shape for demonstration
                return (
                  <G key={`fill-${index}`}>
                    <Path
                      d={`M ${path.x-50} ${path.y-50} h 100 v 100 h -100 z`}
                      fill={path.color}
                      fillOpacity={0.7}
                    />
                  </G>
                );
              } else {
                return (
                  <Path
                    key={`path-${index}`}
                    d={pointsToPath(path.points)}
                    stroke={path.color}
                    strokeWidth={path.strokeWidth}
                    fill="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                );
              }
            })}
            
            {/* Render current active path */}
            {currentPath && (
              <Path
                d={pointsToPath(currentPath.points)}
                stroke={currentPath.color}
                strokeWidth={currentPath.strokeWidth}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )}
          </Svg>
        </View>
      </ViewShot>

      {/* Bottom Toolbar */}
      <View style={styles.toolbarContainer}>
        {/* Left Tools */}
        <View style={styles.toolsPanel}>
          <TouchableOpacity 
            style={[styles.toolButton, toolSelected === 'pen' && styles.toolSelected]} 
            onPress={() => selectTool('pen')}
          >
            <Image 
              source={require('../../assets/icons/pen.png')} 
              style={styles.toolIcon} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toolButton, toolSelected === 'eraser' && styles.toolSelected]} 
            onPress={() => selectTool('eraser')}
          >
            <Image 
              source={require('../../assets/icons/eraser.png')} 
              style={styles.toolIcon} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toolButton, toolSelected === 'fill' && styles.toolSelected]} 
            onPress={() => selectTool('fill')}
          >
            <Image 
              source={require('../../assets/icons/fill.png')} 
              style={styles.toolIcon} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toolButton, toolSelected === 'undo' && styles.toolSelected]} 
            onPress={() => selectTool('undo')}
          >
            <Image 
              source={require('../../assets/icons/undo.png')} 
              style={styles.toolIcon} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toolButton, toolSelected === 'reset' && styles.toolSelected]} 
            onPress={() => selectTool('reset')}
          >
            <Image 
              source={require('../../assets/icons/reset.png')} 
              style={styles.toolIcon} 
            />
          </TouchableOpacity>
        </View>

        {/* Right Color Palette */}
        <View style={styles.colorPalette}>
          {colors.map(colorObj => (
            <TouchableOpacity 
              key={colorObj.id} 
              style={[
                styles.colorButton, 
                { backgroundColor: colorObj.color },
                selectedColor === colorObj.color && styles.colorSelected
              ]} 
              onPress={() => selectColor(colorObj.color)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#6EE3F8',
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#8DF054', // Green button for save
  },
  actionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  canvasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  drawingArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  coloringImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  errorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3B30',
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  toolbarContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E0E0E0',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  toolsPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  toolButton: {
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  toolSelected: {
    borderWidth: 3,
    borderColor: '#FF9800',
  },
  toolIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  colorPalette: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: '#333333',
  },
});

export default ColoringPage;