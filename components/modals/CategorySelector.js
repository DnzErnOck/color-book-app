// src/components/modals/CategorySelector.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import ImageGrid from './ImageGrid';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isMobile = SCREEN_WIDTH < 600;

const CategorySelector = ({ categories, categoryImages }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // If a category is selected, show the ImageGrid component
  if (selectedCategory) {
    return (
      <ImageGrid 
        category={selectedCategory}
        images={categoryImages[selectedCategory.id] || []}
        onSelectImage={(image) => {
          // Handle image selection here
          console.log('Selected image:', image);
        }}
        onGoBack={() => setSelectedCategory(null)}
      />
    );
  }

  // Horizontal scrolling layout for categories
  const renderHorizontalCategories = () => {
    return (
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContainer}
      >
        {categories.map(category => (
          <TouchableOpacity 
            key={category.id} 
            style={[styles.categoryCard, { backgroundColor: category.color }]}
            onPress={() => setSelectedCategory(category)}
          >
            {category.isNew && (
              <View style={styles.newTag}>
                <Text style={styles.newTagText}>NEW</Text>
              </View>
            )}
            <View style={styles.imageContainer}>
              <Image source={category.image} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Neşeli Boyama</Text>
        <View style={styles.headerRight}>
          <View style={styles.adultTag}>
            <Image source={require('../../assets/icons/adult.png')} style={styles.adultIcon} />
            <Text style={styles.adultText}>ADULTS</Text>
          </View>
          <View style={styles.adFreeTag}>
            <Image source={require('../../assets/icons/no-ads.png')} style={styles.adFreeIcon} />
            <Text style={styles.adFreeText}>NO ADS</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        {/* Always show mascot regardless of screen size */}
        <View style={styles.mascotContainer}>
          <Image source={require('../../assets/mascot.png')} style={styles.mascot} />
        </View>
        
        {/* Horizontal scrolling categories container */}
        <View style={styles.categoriesSection}>
          {renderHorizontalCategories()}
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>YÜKLEYİN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A2DC9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  adFreeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFCB0C',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
  },
  adFreeIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  adFreeText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 12,
    color: '#000000',
  },
  adultTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7338D6',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
  },
  adultIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  adultText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  
  mascotContainer: {
    width: isMobile ? 100 : 180, // Smaller width on mobile
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: isMobile ? 10 : 20,
  },
  mascot: {
    width: isMobile ? 90 : 150, // Smaller mascot on mobile
    height: isMobile ? 90 : 150,
    resizeMode: 'contain',
  },
  
  categoriesSection: {
    flex: 1,
    justifyContent: 'center',
  },
  
  horizontalScrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingRight: 30, // Add extra padding at the end for better UX
  },
  
  categoryCard: {
    width: isMobile ? 120 : 170,
    height: isMobile ? 220 : 260,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  newTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF4D6D',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 1,
  },
  newTagText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  
  imageContainer: {
    width: '80%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  categoryImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  
  categoryName: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: isMobile ? 16 : 20,
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    bottom: 15,
    left: 10,
    right: 10,
  },
  
  footer: {
    padding: 15,
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#027CFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  downloadButtonText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default CategorySelector;