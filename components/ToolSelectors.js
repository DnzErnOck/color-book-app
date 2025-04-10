// src/components/ToolSelectors.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ToolSelectors = ({ 
  brushType, 
  changeBrushType, 
  brushSize, 
  changeBrushSize, 
  selectedColor, 
  handleColorSelect, 
  colors, 
  brushTypes,
  isVertical = false 
}) => {
  const renderColorCircle = (color) => {
    const isSelected = selectedColor === color.hex;
    
    return (
      <TouchableOpacity
        key={color.id}
        style={[
          styles.colorCircle,
          { backgroundColor: color.hex },
          isSelected && styles.selectedColorCircle
        ]}
        onPress={() => handleColorSelect(color)}
      >
        {isSelected && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderBrushType = (type) => {
    const isSelected = brushType.id === type.id;
    
    return (
      <TouchableOpacity
        key={type.id}
        style={[
          styles.brushTypeButton,
          isSelected && styles.selectedBrushTypeButton
        ]}
        onPress={() => changeBrushType(type)}
      >
        <Image source={type.icon} style={styles.brushTypeIcon} />
      </TouchableOpacity>
    );
  };

  const brushSizeOptions = [5, 10, 15, 20, 25];
  
  const renderBrushSizeOption = (size) => {
    const isSelected = brushSize === size;
    
    return (
      <TouchableOpacity
        key={size}
        style={[
          styles.brushSizeButton,
          isSelected && styles.selectedBrushSizeButton
        ]}
        onPress={() => changeBrushSize(size)}
      >
        <View 
          style={[
            styles.brushSizeCircle, 
            { width: size, height: size }
          ]} 
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, isVertical && styles.verticalContainer]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Ionicons name="color-palette" size={24} color="#5E35B1" />
            <Text style={styles.sectionTitleText}>Renkler</Text>
          </View>
          <View style={styles.colorsContainer}>
            {colors.map(renderColorCircle)}
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Ionicons name="brush" size={24} color="#5E35B1" />
            <Text style={styles.sectionTitleText}>Fırça</Text>
          </View>
          <View style={styles.brushTypesContainer}>
            {brushTypes.map(renderBrushType)}
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Ionicons name="resize" size={24} color="#5E35B1" />
            <Text style={styles.sectionTitleText}>Boyut</Text>
          </View>
          <View style={styles.brushSizesContainer}>
            {brushSizeOptions.map(renderBrushSizeOption)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDECFF',
    padding: 8,
  },
  verticalContainer: {
    width: 80,
  },
  scrollContent: {
    padding: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 16,
    color: '#5E35B1',
    marginLeft: 5,
  },
  colorsContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedColorCircle: {
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#BBDEFB',
    marginVertical: 10,
  },
  brushTypesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  brushTypeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedBrushTypeButton: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  brushTypeIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  brushSizesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  brushSizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedBrushSizeButton: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  brushSizeCircle: {
    backgroundColor: '#333333',
    borderRadius: 50,
  }
});

export default ToolSelectors;