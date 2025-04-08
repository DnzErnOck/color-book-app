// src/components/modals/ImageSelector.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Image, 
  FlatList,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const GRID_ITEM_WIDTH = (windowWidth - 48) / 2;

const ImageSelector = ({ visible, setVisible, images, onSelectImage }) => {
  const handleSelectImage = (image) => {
    onSelectImage(image);
    setVisible(false);
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.imageItem}
      onPress={() => handleSelectImage(item)}
    >
      <Image source={item.source} style={styles.thumbnail} />
      <Text style={styles.imageName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resim Seç</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          >
            <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E88E5',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    padding: 12,
  },
  imageItem: {
    width: GRID_ITEM_WIDTH,
    marginHorizontal: 6,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  thumbnail: {
    width: '100%',
    height: GRID_ITEM_WIDTH * 1.2,
    resizeMode: 'cover',
  },
  imageName: {
    padding: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
  },
});

export default ImageSelector;