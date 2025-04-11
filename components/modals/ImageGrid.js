// src/components/modals/ImageGrid.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import ColoringPage from './ColoringPage'; // Import the ColoringPage component

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Fixed grid layout regardless of screen size
const NUM_COLUMNS = 4;
const NUM_ROWS = 2;

const ImageGrid = ({ category, images, onGoBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Get visible images based on current index
  const imagesPerPage = NUM_COLUMNS * NUM_ROWS;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  
  const visibleImages = images.slice(
    currentIndex * imagesPerPage, 
    (currentIndex + 1) * imagesPerPage
  );
  
  // Navigate to next page of images
  const goToNextPage = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Navigate to previous page of images
  const goToPrevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle image selection
  // Handle image selection (modify this in ImageGrid.js)
  const handleSelectImage = (image) => {
    // Create a properly formatted image object with SVG data
    if (image.svgContent) {
      const svgUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(image.svgContent)}`;
      const formattedImage = {
        ...image,
        source: { uri: svgUri },
        fullSize: svgUri
      };
      setSelectedImage(formattedImage);
    } else {
      // For non-SVG images, pass as is
      setSelectedImage(image);
    }
  };

  // Handle save coloring
  const handleSaveColoring = () => {
    // Implement save functionality
    // For now, just return to the grid
    setSelectedImage(null);
  };

  // Handle swipe gestures
  const onSwipeGesture = (event) => {
    const { translationX } = event.nativeEvent;
    
    if (event.nativeEvent.state === 5) { // END state
      if (translationX > 100) {
        goToPrevPage();
      } else if (translationX < -100) {
        goToNextPage();
      }
    }
  };

  // If an image is selected, show the ColoringPage
  if (selectedImage) {
    return (
      <ColoringPage 
        image={selectedImage}
        onGoBack={() => setSelectedImage(null)}
        onSave={handleSaveColoring}
      />
      
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.homeButton}>
            <Image 
              source={require('../../assets/icons/home.png')} 
              style={styles.homeIcon} 
            />
          </TouchableOpacity>
          <Text style={styles.title}>{category.name.toUpperCase()}</Text>
          <View style={styles.headerRightSpace} />
        </View>
        
        <PanGestureHandler onGestureEvent={onSwipeGesture}>
          <View style={styles.content}>
            <View style={styles.navigationContainer}>
              <TouchableOpacity 
                style={styles.navArrow} 
                onPress={goToPrevPage}
                disabled={currentIndex === 0}
              >
                <Image 
                  source={require('../../assets/icons/left-arrow.png')} 
                  style={[
                    styles.arrowIcon, 
                    currentIndex === 0 ? styles.disabledArrow : null
                  ]} 
                />
              </TouchableOpacity>
              
              <View style={styles.gridContainer}>
                <View style={styles.topRow}>
                  {visibleImages.slice(0, 4).map((image, index) => (
                    <TouchableOpacity 
                      key={`image-top-${image.id}`} 
                      style={styles.imageCard}
                      onPress={() => handleSelectImage(image)}
                    >
                      <Image source={image.thumbnail} style={styles.thumbnail} />
                      {image.isColored && (
                        <View style={styles.coloredIndicator} />
                      )}
                    </TouchableOpacity>
                  ))}
                  {/* Placeholders for top row if needed */}
                  {visibleImages.length < 4 && 
                    Array(4 - visibleImages.length).fill().map((_, i) => (
                      <View key={`empty-top-${i}`} style={styles.emptyCard} />
                    ))
                  }
                </View>
                
                <View style={styles.bottomRow}>
                  {visibleImages.slice(4, 8).map((image, index) => (
                    <TouchableOpacity 
                      key={`image-bottom-${image.id}`} 
                      style={styles.imageCard}
                      onPress={() => handleSelectImage(image)}
                    >
                      <Image source={image.thumbnail} style={styles.thumbnail} />
                      {image.isColored && (
                        <View style={styles.coloredIndicator} />
                      )}
                    </TouchableOpacity>
                  ))}
                  {/* Placeholders for bottom row if needed */}
                  {visibleImages.length <= 8 && visibleImages.length > 4 && 
                    Array(8 - visibleImages.length).fill().map((_, i) => (
                      <View key={`empty-bottom-${i}`} style={styles.emptyCard} />
                    ))
                  }
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.navArrow} 
                onPress={goToNextPage}
                disabled={currentIndex >= totalPages - 1}
              >
                <Image 
                  source={require('../../assets/icons/right-arrow.png')} 
                  style={[
                    styles.arrowIcon,
                    currentIndex >= totalPages - 1 ? styles.disabledArrow : null
                  ]} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EE3F8', // Light blue background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerRightSpace: {
    width: 50, // Space to balance the header
  },
  title: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 32,
    color: '#FF9800', // Orange color for title
    textShadowColor: '#FFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  homeButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  navigationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    height: '45%',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '45%',
  },
  imageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: '20%', // Reduced to create more space
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A0D3FF',
  },
  emptyCard: {
    width: '20%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  thumbnail: {
    width: '85%', 
    height: '85%',
    resizeMode: 'contain',
  },
  coloredIndicator: {
    position: 'absolute', 
    top: 5, 
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4D6D',
  },
  navArrow: {
    width: 50,
    height: 50,
    backgroundColor: '#FFD166',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  disabledArrow: {
    opacity: 0.5,
  },
});

export default ImageGrid;