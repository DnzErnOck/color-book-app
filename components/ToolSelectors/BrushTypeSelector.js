// src/components/ToolSelectors/BrushTypeSelector.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BrushTypeSelector = ({ brushTypes, selectedBrushType, onSelectBrushType }) => {
  // Sadece ilk 4 fırça tipini göster - çocuklar için basitleştirme
  const visibleBrushTypes = brushTypes.slice(0, 4);
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {visibleBrushTypes.map((type, index) => (
          <TouchableOpacity
            key={`brush-type-${type.id || index}`}
            style={[
              styles.brushTypeItem,
              selectedBrushType.id === type.id && styles.selectedBrushTypeItem
            ]}
            onPress={() => onSelectBrushType(type)}
          >
            <MaterialCommunityIcons 
              name={type.icon || 'brush'} // Varsayılan ikon ekle
              size={28} // Büyük ikonlar - çocuklar için
              color={selectedBrushType.id === type.id ? "#FFFFFF" : "#424242"} 
            />
            <Text 
              style={[
                styles.brushTypeName,
                selectedBrushType.id === type.id && styles.selectedBrushTypeName
              ]}
            >
              {type.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6, 
  },
  scrollContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingBottom: 6,
  },
  brushTypeItem: {
    flexDirection: 'column', // Dikey yerleşim - çocuklar için daha kolay
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 8,
    elevation: 3, // Daha belirgin gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    minWidth: 70, // Daha büyük butonlar
    minHeight: 70, // Kare şeklinde butonlar
  },
  selectedBrushTypeItem: {
    backgroundColor: '#2196F3',
    borderWidth: 2,
    borderColor: '#FFC107', // Altın sarısı vurgu - çocuklar için
  },
  brushTypeName: {
    fontSize: 14, // Daha büyük yazı
    marginTop: 8,
    fontWeight: '500',
    color: '#424242',
    textAlign: 'center',
  },
  selectedBrushTypeName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default BrushTypeSelector;