// src/components/modals/MenuModal.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MenuModal = ({
  visible,
  toggleMenu,
  brushType,
  changeBrushType,
  brushSize,
  changeBrushSize,
  isEraser,
  toggleEraser,
  clearAll,
  handleNewDrawing,
  handleSave,
  handleShare,
  brushTypes
}) => {
  const brushSizes = [5, 10, 15, 20, 25, 30];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleMenu}
    >
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.handle} />
              
              <Text style={styles.sectionTitle}>Fırça Tipi</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.brushTypeContainer}
              >
                {brushTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.brushTypeButton,
                      brushType.id === type.id && styles.selectedBrushType
                    ]}
                    onPress={() => changeBrushType(type)}
                  >
                    <MaterialCommunityIcons 
                      name={type.icon} 
                      size={24} 
                      color={brushType.id === type.id ? "#FFFFFF" : "#424242"} 
                    />
                    <Text style={[
                      styles.brushTypeName,
                      brushType.id === type.id && styles.selectedBrushTypeName
                    ]}>
                      {type.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <Text style={styles.sectionTitle}>Fırça Boyutu</Text>
              <View style={styles.brushSizeContainer}>
                {brushSizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.brushSizeButton,
                      brushSize === size && styles.selectedBrushSize
                    ]}
                    onPress={() => changeBrushSize(size)}
                  >
                    <View 
                      style={[
                        styles.brushSizePreview, 
                        { 
                          width: size, 
                          height: size,
                          backgroundColor: brushSize === size ? "#FFFFFF" : "#424242"
                        }
                      ]} 
                    />
                    <Text style={[
                      styles.brushSizeText,
                      brushSize === size && styles.selectedBrushSizeText
                    ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.sectionTitle}>Araçlar</Text>
              <View style={styles.toolsContainer}>
                <TouchableOpacity
                  style={[styles.toolButton, isEraser && styles.activeToolButton]}
                  onPress={toggleEraser}
                >
                  <MaterialCommunityIcons 
                    name="eraser" 
                    size={24} 
                    color={isEraser ? "#FFFFFF" : "#424242"} 
                  />
                  <Text style={[
                    styles.toolButtonText,
                    isEraser && styles.activeToolButtonText
                  ]}>
                    Silgi
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={clearAll}
                >
                  <MaterialCommunityIcons name="delete-sweep" size={24} color="#424242" />
                  <Text style={styles.toolButtonText}>Temizle</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={handleNewDrawing}
                >
                  <MaterialCommunityIcons name="image-plus" size={24} color="#424242" />
                  <Text style={styles.toolButtonText}>Yeni Resim</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={handleSave}
                >
                  <MaterialCommunityIcons name="content-save" size={24} color="#424242" />
                  <Text style={styles.toolButtonText}>Kaydet</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={handleShare}
                >
                  <MaterialCommunityIcons name="share-variant" size={24} color="#424242" />
                  <Text style={styles.toolButtonText}>Paylaş</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={toggleMenu}
              >
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    alignSelf: 'flex-start',
    marginVertical: 12,
  },
  brushTypeContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  brushTypeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 6,
    backgroundColor: '#F5F5F5',
    minWidth: 80,
  },
  selectedBrushType: {
    backgroundColor: '#2196F3',
  },
  brushTypeName: {
    marginTop: 4,
    fontSize: 12,
    color: '#424242',
  },
  selectedBrushTypeName: {
    color: '#FFFFFF',
  },
  brushSizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
  },
  brushSizeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  selectedBrushSize: {
    backgroundColor: '#2196F3',
  },
  brushSizePreview: {
    borderRadius: 50,
    marginBottom: 6,
  },
  brushSizeText: {
    fontSize: 14,
    color: '#424242',
  },
  selectedBrushSizeText: {
    color: '#FFFFFF',
  },
  toolsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  activeToolButton: {
    backgroundColor: '#2196F3',
  },
  toolButtonText: {
    marginTop: 6,
    fontSize: 12,
    color: '#424242',
  },
  activeToolButtonText: {
    color: '#FFFFFF',
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#FF5252',
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuModal;