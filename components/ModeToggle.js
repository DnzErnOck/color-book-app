import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModeToggle = ({ isDrawingMode, setIsDrawingMode, resetView }) => {
  return (
    <View style={styles.modeToggle}>
      <TouchableOpacity
        style={[
          styles.modeButton,
          isDrawingMode && styles.activeModeButton,
        ]}
        onPress={() => setIsDrawingMode(true)}
      >
        <Text
          style={[
            styles.modeButtonText,
            isDrawingMode && styles.activeModeButtonText,
          ]}
        >
          Çizim
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.modeButton,
          !isDrawingMode && styles.activeModeButton,
        ]}
        onPress={() => setIsDrawingMode(false)}
      >
        <Text
          style={[
            styles.modeButtonText,
            !isDrawingMode && styles.activeModeButtonText,
          ]}
        >
          Gezinme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetView}>
        <Text style={styles.resetButtonText}>Sıfırla</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modeToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#E8F4FF',
  },
  modeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#D0E6FF',
  },
  activeModeButton: {
    backgroundColor: '#4A90E2',
  },
  modeButtonText: {
    color: '#555',
    fontWeight: '600',
  },
  activeModeButtonText: {
    color: 'white',
  },
  resetButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#FFE0E0',
  },
  resetButtonText: {
    color: '#E64A19',
    fontWeight: '600',
  },
});

export default ModeToggle;
