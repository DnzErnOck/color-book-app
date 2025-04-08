import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ToolStatus = ({ isDrawingMode, isEraser, brushType, brushSize, scale }) => {
  return (
    <View style={styles.toolStatus}>
      <Text style={styles.toolStatusText}>
        {isDrawingMode ? (isEraser ? 'Silgi Modu' : 'Çizim Modu') : 'Gezinme Modu'} 
        {isDrawingMode && ` - Fırça: ${brushType.name} - Boyut: ${
          brushSize === 5 ? 'Küçük' : 
          brushSize === 10 ? 'Orta' : 'Büyük'
        }`}
        {!isDrawingMode && ` - Zoom: ${scale.toFixed(1)}x`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toolStatus: {
    backgroundColor: '#E8F4FF',
    padding: 5,
    alignItems: 'center',
  },
  toolStatusText: {
    color: '#555',
    fontSize: 12,
  },
});

export default ToolStatus;