// src/components/BottomToolbar.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomToolbar = ({
  undoStack,
  handleUndo,
  redoStack,
  handleRedo,
  isEraser,
  toggleEraser,
  clearAll,
  handleNewDrawing,
  handleSave,
  handleShare
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.toolButton, undoStack.length === 0 && styles.disabledButton]}
        onPress={handleUndo}
        disabled={undoStack.length === 0}
      >
        <MaterialCommunityIcons 
          name="undo-variant" 
          size={32} // Daha büyük ikonlar - çocuklar için 
          color={undoStack.length === 0 ? "#BDBDBD" : "#424242"} 
        />
        <Text style={styles.buttonText}>Geri Al</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.toolButton, isEraser && styles.activeToolButton]}
        onPress={toggleEraser}
      >
        <MaterialCommunityIcons 
          name="eraser" 
          size={32} // Daha büyük ikonlar
          color={isEraser ? "#FFFFFF" : "#424242"} 
        />
        <Text style={[styles.buttonText, isEraser && styles.activeButtonText]}>Silgi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toolButton}
        onPress={clearAll}
      >
        <MaterialCommunityIcons name="delete-sweep" size={32} color="#424242" />
        <Text style={styles.buttonText}>Temizle</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toolButton}
        onPress={handleSave}
      >
        <MaterialCommunityIcons name="content-save" size={32} color="#424242" />
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80, // Daha yüksek alt çubuk - çocuklar için
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderTopWidth: 2,
    borderTopColor: '#BBDEFB',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  toolButton: {
    width: 70, // Daha geniş butonlar - çocuklar için
    height: 70, // Daha yüksek butonlar - çocuklar için
    borderRadius: 18, // Daha yuvarlak kenarlar
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  activeToolButton: {
    backgroundColor: '#2196F3',
  },
  disabledButton: {
    backgroundColor: '#F5F5F5',
    shadowOpacity: 0.1,
    elevation: 1,
  },
  buttonText: {
    fontSize: 12,
    marginTop: 4,
    color: '#424242',
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#FFFFFF',
  }
});

export default BottomToolbar;