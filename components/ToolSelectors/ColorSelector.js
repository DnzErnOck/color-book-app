// src/components/ToolSelectors/ColorSelector.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';

const ColorSelector = ({ colors, selectedColor, onSelectColor }) => {
  // Renk isimlerini ekle - çocuklar için yardımcı
  const colorNames = {
    '#FF0000': 'Kırmızı',
    '#FF4500': 'Turuncu',
    '#FFFF00': 'Sarı',
    '#008000': 'Yeşil',
    '#0000FF': 'Mavi',
    '#4B0082': 'Mor',
    '#EE82EE': 'Pembe',
    '#A52A2A': 'Kahve',
    '#000000': 'Siyah',
    '#FFFFFF': 'Beyaz',
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorItem,
              { backgroundColor: color.hex },
              selectedColor === color.hex && styles.selectedColorItem
            ]}
            onPress={() => onSelectColor(color)}
          >
            {selectedColor === color.hex && (
              <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
            {colorNames[color.hex] && (
              <Text style={styles.colorName}>{colorNames[color.hex]}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 5,
    alignItems: 'center',
  },
  colorItem: {
    width: 50, // Daha büyük renkler - çocuklar için
    height: 50, // Daha büyük renkler - çocuklar için
    borderRadius: 25,
    marginHorizontal: 8,
    elevation: 4, // Daha belirgin görünüm
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedColorItem: {
    borderWidth: 4,
    borderColor: '#FFC107', // Altın sarısı vurgu - çocuklar için
    transform: [{ scale: 1.2 }],
  },
  checkmarkContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: -5,
    right: -5,
  },
  checkmark: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 14,
  },
  colorName: {
    position: 'absolute',
    bottom: -20,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#424242',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
  }
});

export default ColorSelector;