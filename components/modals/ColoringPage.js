// ColoringPage.js - improved alignment version

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SvgXml } from 'react-native-svg';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import {
  parseSvgContent,
  findContainingPath,
  pointInPolygon,
  screenToSvgCoords,
  parseViewBox
} from '../../utils/SvgPathGeometry';

const ColoringPage = ({ image, onGoBack, onSave }) => {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [toolSelected, setToolSelected] = useState('pen');
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [parsedSvgPaths, setParsedSvgPaths] = useState([]);
  const [svgViewBox, setSvgViewBox] = useState({ minX: 0, minY: 0, width: 512, height: 512 });
  const [containerRect, setContainerRect] = useState(null);

  const viewShotRef = useRef(null);

  useEffect(() => {
    if (image?.svgContent) {
      const parsed = parseSvgContent(image.svgContent);
      setParsedSvgPaths(parsed);
      setSvgViewBox(parseViewBox(image.svgContent));
    }
  }, [image]);

  const selectTool = (tool) => setToolSelected(tool);
  const selectColor = (color) => setSelectedColor(color);

  const handleTouchStart = useCallback((event) => {
    if (!containerRect) return;
  
    const { pageX, pageY } = event.nativeEvent;
    const svgX = pageX - containerRect.left;
    const svgY = pageY - containerRect.top;
  
    const svgCoords = screenToSvgCoords(svgX, svgY, svgViewBox, containerRect);
    const areaPath = findContainingPath(parsedSvgPaths, svgCoords.x, svgCoords.y);
    if (!areaPath) return;
  
    setCurrentPath({
      type: 'pen',
      color: selectedColor,
      strokeWidth: 5,
      points: [svgCoords],
      pathBounds: areaPath
    });
  }, [containerRect, parsedSvgPaths, selectedColor, svgViewBox]);
  

  const handleTouchMove = useCallback((event) => {
    if (!currentPath || toolSelected !== 'pen' || !containerRect) return;
  
    const { pageX, pageY } = event.nativeEvent;
    const svgX = pageX - containerRect.left;
    const svgY = pageY - containerRect.top;
  
    const svgCoords = screenToSvgCoords(svgX, svgY, svgViewBox, containerRect);
    if (pointInPolygon(svgCoords, currentPath.pathBounds.points)) {
      setCurrentPath({
        ...currentPath,
        points: [...currentPath.points, svgCoords]
      });
    }
  }, [currentPath, toolSelected, containerRect, svgViewBox]);
  

  const handleTouchEnd = useCallback(() => {
    if (currentPath && currentPath.points.length > 1) {
      setPaths(prev => [...prev, currentPath]);
    }
    setCurrentPath(null);
  }, [currentPath]);

  const pointsToPath = (points) => {
    if (!points || points.length < 2) return '';
    return `M ${points[0].x},${points[0].y} ` + points.slice(1).map(p => `L ${p.x},${p.y}`).join(' ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.actionButton} onPress={onGoBack}>
          <Image source={require('../../assets/icons/back.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={onSave}>
          <Image source={require('../../assets/icons/save.png')} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>

      <ViewShot ref={viewShotRef} style={styles.canvasContainer}>
        <TouchableWithoutFeedback onPressIn={handleTouchStart}>
          <View style={styles.drawingArea} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            {image?.svgContent && (
              <View
                style={styles.fullSize}
                onLayout={(e) => {
                  const layout = e.nativeEvent.layout;
                  setContainerRect({
                    left: layout.x,
                    top: layout.y,
                    width: layout.width,
                    height: layout.height
                  });
                }}
              >
                <SvgXml
                  pointerEvents="none"
                  xml={image.svgContent}
                  width="100%"
                  height="100%"
                />
                <Svg
                  width="100%"
                  height="100%"
                  viewBox={`${svgViewBox.minX} ${svgViewBox.minY} ${svgViewBox.width} ${svgViewBox.height}`}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                >
                  {[...paths, currentPath].filter(Boolean).map((path, index) => (
                    <Path
                      key={index}
                      d={pointsToPath(path.points)}
                      stroke={path.color}
                      strokeWidth={path.strokeWidth}
                      fill="none"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  ))}
                </Svg>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ViewShot>

      <View style={styles.toolbarContainer}>
        <View style={styles.toolsPanel}>
          <TouchableOpacity
            style={[styles.toolButton, toolSelected === 'pen' && styles.toolSelected]}
            onPress={() => selectTool('pen')}
          >
            <Text style={{ fontWeight: 'bold' }}>Kalem</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.colorPalette}>
          {["#FF0000", "#00FF00", "#0000FF", "#000000", "#FFFFFF"].map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorButton,
                { backgroundColor: color },
                selectedColor === color && styles.colorSelected
              ]}
              onPress={() => selectColor(color)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  actionButton: { padding: 10, backgroundColor: '#eee', borderRadius: 8 },
  actionIcon: { width: 24, height: 24 },
  canvasContainer: { flex: 1 },
  drawingArea: { flex: 1 },
  fullSize: { width: '100%', height: '100%', position: 'relative' },
  toolbarContainer: { flexDirection: 'row', padding: 10, justifyContent: 'space-between' },
  toolsPanel: { flexDirection: 'row' },
  toolButton: { marginRight: 10, padding: 10, backgroundColor: '#ddd', borderRadius: 8 },
  toolSelected: { borderWidth: 2, borderColor: '#000' },
  colorPalette: { flexDirection: 'row' },
  colorButton: { width: 30, height: 30, borderRadius: 15, marginHorizontal: 5 },
  colorSelected: { borderWidth: 2, borderColor: '#000' },
});

export default ColoringPage;
