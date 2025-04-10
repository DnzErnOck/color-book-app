import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ModeToggle = ({ isDrawingMode, setIsDrawingMode, resetView }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.modeButton, isDrawingMode && styles.activeModeButton]}
        onPress={() => setIsDrawingMode(true)}
      >
        <Ionicons name="brush" size={22} color={isDrawingMode ? "#FFFFFF" : "#666666"} />
        <Text style={[styles.modeButtonText, isDrawingMode && styles.activeModeText]}>Çizim</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.modeButton, !isDrawingMode && styles.activeModeButton]}
        onPress={() => setIsDrawingMode(false)}
      >
        <Ionicons name="hand" size={22} color={!isDrawingMode ? "#FFFFFF" : "#666666"} />
        <Text style={[styles.modeButtonText, !isDrawingMode && styles.activeModeText]}>Gezinti</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.resetButton} onPress={resetView}>
        <Ionicons name="refresh" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  activeModeButton: {
    backgroundColor: '#4CAF50',
  },
  modeButtonText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 14,
    color: '#666666',
    marginLeft: 5,
  },
  activeModeText: {
    color: '#FFFFFF',
  },
  resetButtonText: {
    color: '#E64A19',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ModeToggle;