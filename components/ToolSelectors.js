// src/components/ToolSelectors.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BrushTypeSelector from './ToolSelectors/BrushTypeSelector';
import BrushSizeSelector from './ToolSelectors/BrushSizeSelector';
import ColorSelector from './ToolSelectors/ColorSelector';

const ToolSelectors = ({
  brushType,
  changeBrushType,
  brushSize,
  changeBrushSize,
  selectedColor,
  handleColorSelect,
  colors,
  brushTypes
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Fırça Tipi</Text>
      <BrushTypeSelector 
        brushTypes={brushTypes}
        selectedBrushType={brushType}
        onSelectBrushType={changeBrushType}
      />
      
      <Text style={styles.sectionTitle}>Fırça Boyutu</Text>
      <BrushSizeSelector 
        brushSizes={[5, 10, 15, 20, 25, 30]}
        selectedSize={brushSize}
        onSelectSize={changeBrushSize}
      />
      
      <Text style={styles.sectionTitle}>Renk Seç</Text>
      <ColorSelector 
        colors={colors}
        selectedColor={selectedColor}
        onSelectColor={handleColorSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#BBDEFB',
    borderBottomColor: '#BBDEFB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginLeft: 12,
    marginTop: 6,
    marginBottom: 4,
    // Çocuklar için daha okunabilir
    letterSpacing: 0.5,
  }
});

export default ToolSelectors;