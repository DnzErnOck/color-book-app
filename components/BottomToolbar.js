// src/components/BottomToolbar.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

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
      <View style={styles.toolsContainer}>
        <TouchableOpacity
          style={[styles.toolButton, undoStack.length === 0 && styles.disabledButton]}
          onPress={handleUndo}
          disabled={undoStack.length === 0}
        >
          <Ionicons name="arrow-undo" size={24} color={undoStack.length === 0 ? "#BBBBBB" : "#FFFFFF"} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.toolButton, redoStack.length === 0 && styles.disabledButton]}
          onPress={handleRedo}
          disabled={redoStack.length === 0}
        >
          <Ionicons name="arrow-redo" size={24} color={redoStack.length === 0 ? "#BBBBBB" : "#FFFFFF"} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.toolButton, isEraser && styles.activeToolButton]}
          onPress={toggleEraser}
        >
          <MaterialCommunityIcons name="eraser" size={24} color={isEraser ? "#FF5252" : "#FFFFFF"} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolButton} onPress={clearAll}>
          <Ionicons name="trash-bin" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.newButton]} onPress={handleNewDrawing}>
          <Ionicons name="add-circle" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>YENİ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSave}>
          <MaterialCommunityIcons name="content-save" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>KAYDET</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={handleShare}>
          <Ionicons name="share-social" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>PAYLAŞ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#43A047',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 2,
    borderTopColor: '#388E3C',
  },
  toolsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
  },
  toolButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2E7D32',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  activeToolButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF5252',
  },
  disabledButton: {
    backgroundColor: '#757575',
    opacity: 0.5,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  newButton: {
    backgroundColor: '#009688',
  },
  saveButton: {
    backgroundColor: '#3F51B5',
  },
  shareButton: {
    backgroundColor: '#E91E63',
  },
  actionButtonText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

export default BottomToolbar;