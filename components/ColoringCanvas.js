// src/components/ColoringCanvas.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  PanResponder, 
  Animated,
  Image,
  Dimensions
} from 'react-native';
import { Svg, Path, SvgXml } from 'react-native-svg';
import { GestureHandlerRootView, PinchGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';

const ColoringCanvas = ({
  isDrawingMode,
  setIsDrawingMode,
  scale,
  setScale,
  translateX,
  setTranslateX,
  translateY,
  setTranslateY,
  isPanning,
  setIsPanning,
  isPinching,
  setIsPinching,
  baseScale,
  pinchScale,
  baseTranslateX,
  baseTranslateY,
  viewShotRef,
  selectedImage,
  paths,
  currentPath,
  selectedColor,
  brushSize,
  brushOpacity,
  brushBlur,
  isEraser,
  brushPressureEffect,
  updatePathData,
  addNewPath,
  currentPoints
}) => {
  const [svgContent, setSvgContent] = useState(null);
  const [dimensions, setDimensions] = useState({ width: '100%', height: '100%' });
  
  // Load SVG content
  useEffect(() => {
    if (selectedImage && selectedImage.svgContent) {
      setSvgContent(selectedImage.svgContent);
      
      // Extract width and height from SVG if available
      const widthMatch = selectedImage.svgContent.match(/width="([^"]+)"/);
      const heightMatch = selectedImage.svgContent.match(/height="([^"]+)"/);
      const viewBoxMatch = selectedImage.svgContent.match(/viewBox="([^"]+)"/);
      
      if (viewBoxMatch) {
        const viewBox = viewBoxMatch[1].split(' ');
        if (viewBox.length === 4) {
          setDimensions({
            width: parseInt(viewBox[2]),
            height: parseInt(viewBox[3])
          });
        }
      } else if (widthMatch && heightMatch) {
        setDimensions({
          width: parseInt(widthMatch[1]),
          height: parseInt(heightMatch[1])
        });
      }
    }
  }, [selectedImage]);

  // Pan gesture handler for navigation mode
  const panRef = useRef();
  const pinchRef = useRef();
  
  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: baseTranslateX, translationY: baseTranslateY } }],
    { useNativeDriver: true }
  );
  
  const onPanHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // Update the offset for the next pan gesture
      setTranslateX(translateX + event.nativeEvent.translationX);
      setTranslateY(translateY + event.nativeEvent.translationY);
      baseTranslateX.setValue(0);
      baseTranslateY.setValue(0);
    }
  };
  
  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: true }
  );
  
  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setScale(scale * event.nativeEvent.scale);
      pinchScale.setValue(1);
    }
  };
  
  // For drawing functionality
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => isDrawingMode,
    onMoveShouldSetPanResponder: () => isDrawingMode,
    onPanResponderGrant: (evt, gestureState) => {
      if (!isDrawingMode) return;
      
      const { locationX, locationY } = evt.nativeEvent;
      
      // Calculate pressure effect for realistic brush strokes
      const pressure = brushPressureEffect > 0 ? 
        Math.random() * brushPressureEffect + (1 - brushPressureEffect) : 1;
      
      const actualBrushSize = brushSize * pressure;
      
      // Start a new path
      const newPath = {
        color: isEraser ? 'white' : selectedColor,
        strokeWidth: actualBrushSize,
        opacity: brushOpacity,
        blur: brushBlur,
        d: `M ${locationX} ${locationY}`,
        points: [{ x: locationX, y: locationY, pressure }]
      };
      
      updatePathData(newPath, [{ x: locationX, y: locationY, pressure }]);
    },
    onPanResponderMove: (evt, gestureState) => {
      if (!isDrawingMode || !currentPath) return;
      
      const { locationX, locationY } = evt.nativeEvent;
      const lastPoint = currentPoints[currentPoints.length - 1];
      
      // Skip if the movement is too small (prevents unnecessary points)
      const dx = locationX - lastPoint.x;
      const dy = locationY - lastPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 2) return;
      
      // Calculate pressure effect
      const pressure = brushPressureEffect > 0 ? 
        Math.random() * brushPressureEffect + (1 - brushPressureEffect) : 1;
      
      const newPoints = [...currentPoints, { x: locationX, y: locationY, pressure }];
      
      // Update the path data with the new point
      let pathData = currentPath.d;
      pathData += ` L ${locationX} ${locationY}`;
      
      const updatedPath = {
        ...currentPath,
        d: pathData,
        points: newPoints
      };
      
      updatePathData(updatedPath, newPoints);
    },
    onPanResponderRelease: () => {
      if (!isDrawingMode || !currentPath) return;
      
      // Add the completed path to paths array
      addNewPath(currentPath);
      
      // Reset current path
      updatePathData(null, []);
    }
  });
  
  // Compose transforms for pan and zoom
  const animatedStyle = {
    transform: [
      { translateX: Animated.add(baseTranslateX, new Animated.Value(translateX)) },
      { translateY: Animated.add(baseTranslateY, new Animated.Value(translateY)) },
      { scale: Animated.multiply(baseScale, pinchScale) }
    ]
  };
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler
        ref={pinchRef}
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}
        enabled={!isDrawingMode}
      >
        <Animated.View style={styles.container}>
          <PanGestureHandler
            ref={panRef}
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onPanHandlerStateChange}
            enabled={!isDrawingMode}
            simultaneousHandlers={pinchRef}
          >
            <Animated.View 
              style={[styles.canvas, animatedStyle]} 
              {...(isDrawingMode ? panResponder.panHandlers : {})}
            >
              <View ref={viewShotRef} collapsable={false} style={styles.drawingContainer}>
                {/* SVG Base Image */}
                {svgContent && (
                  <View style={styles.svgContainer}>
                    <SvgXml 
                      xml={svgContent} 
                      width="100%" 
                      height="100%" 
                      style={styles.svgOutline}
                    />
                  </View>
                )}
                
                {/* Drawing Layer */}
                <View style={StyleSheet.absoluteFill}>
                  <Svg style={StyleSheet.absoluteFill}>
                    {/* Completed paths */}
                    {paths.map((path, index) => (
                      <Path
                        key={`path-${index}`}
                        d={path.d}
                        stroke={path.color}
                        strokeWidth={path.strokeWidth}
                        strokeOpacity={path.opacity}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    ))}
                    
                    {/* Current path */}
                    {currentPath && (
                      <Path
                        d={currentPath.d}
                        stroke={currentPath.color}
                        strokeWidth={currentPath.strokeWidth}
                        strokeOpacity={currentPath.opacity}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    )}
                  </Svg>
                </View>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgOutline: {
    backgroundColor: 'transparent',
  }
});

export default ColoringCanvas;