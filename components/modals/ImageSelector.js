// src/components/modals/ImageSelector.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ImageSelector = ({ visible, setVisible, images, onSelectImage, onBack, categoryName }) => {
  if (!visible) return null;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{categoryName}</Text>
        <View style={styles.adFreeTag}>
          <Image source={require('../../assets/icons/no-ads.png')} style={styles.adFreeIcon} />
          <Text style={styles.adFreeText}>NO ADS</Text>
        </View>
        <TouchableOpacity style={styles.homeButton}>
          <Ionicons name="home" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <FlatList
          data={images}
          numColumns={5}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.imagesContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.imageCard}
              onPress={() => onSelectImage(item)}
            >
              <View style={styles.imageFrame}>
                <Image source={item.thumbnail} style={styles.imageThumb} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-back" size={28} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-forward" size={28} color="#FFD700" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00CED1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  adFreeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFCB0C',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  adFreeIcon: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  adFreeText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 14,
    color: '#000000',
  },
  homeButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imagesContainer: {
    paddingVertical: 10,
  },
  imageCard: {
    margin: 12,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageFrame: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#AAE8F0',
  },
  imageThumb: {
    width: '90%',
    height: '90%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default ImageSelector;