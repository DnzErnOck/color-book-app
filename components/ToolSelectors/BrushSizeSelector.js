// src/components/ToolSelectors/BrushSizeSelector.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';

const BrushSizeSelector = ({ brushSizes, selectedSize, onSelectSize }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {brushSizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeItem,
              selectedSize === size && styles.selectedSizeItem
            ]}
            onPress={() => onSelectSize(size)}
          >
            <View style={[
              styles.sizePreview,
              { 
                width: size / 2 + 5, 
                height: size / 2 + 5,
                backgroundColor: selectedSize === size ? '#FFFFFF' : '#424242' 
              }
            ]} />
            <Text style={[
              styles.sizeText,
              selectedSize === size && styles.selectedSizeText
            ]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  scrollContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  sizeItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginHorizontal: 6,
    minWidth: 45,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selectedSizeItem: {
    backgroundColor: '#2196F3',
  },
  sizePreview: {
    borderRadius: 50,
    marginBottom: 4,
  },
  sizeText: {
    fontSize: 10,
    color: '#424242',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  }
});

export default BrushSizeSelector;