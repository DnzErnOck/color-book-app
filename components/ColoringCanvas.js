// src/components/ColoringCanvas.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path, G } from 'react-native-svg';
import Animated, { 
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ColoringCanvas = ({
  isDrawingMode,
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
  const [viewWidth, setViewWidth] = useState(windowWidth);
  const [viewHeight, setViewHeight] = useState(windowWidth * 1.4);
  
  const pressure = useSharedValue(1);
  const initialFocalX = useSharedValue(0);
  const initialFocalY = useSharedValue(0);

  // Pan gesture handler for drawing
  const onDrawGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      if (!isDrawingMode) return;
      
      pressure.value = event.pressure || 1;
      const adjustedPressure = 1 + (pressure.value - 1) * brushPressureEffect;
      
      const newPoint = {
        x: (event.x - translateX) / scale,
        y: (event.y - translateY) / scale,
        pressure: adjustedPressure
      };
      
      // FIX: Make eraser actually work by implementing different mode
      const effectiveColor = isEraser ? 'transparent' : selectedColor;
      const effectiveWidth = brushSize * adjustedPressure;
      
      const newPath = {
        id: Date.now().toString(),
        color: effectiveColor,
        width: effectiveWidth,
        opacity: brushOpacity,
        blur: brushBlur,
        points: [newPoint],
        isEraser: isEraser
      };
      
      runOnJS(updatePathData)(newPath, [newPoint]);
    },
    onActive: (event) => {
      if (!isDrawingMode || !currentPath) return;
      
      pressure.value = event.pressure || 1;
      const adjustedPressure = 1 + (pressure.value - 1) * brushPressureEffect;
      
      const newPoint = {
        x: (event.x - translateX) / scale,
        y: (event.y - translateY) / scale,
        pressure: adjustedPressure
      };
      
      const updatedPoints = [...currentPoints, newPoint];
      const updatedPath = {
        ...currentPath,
        points: updatedPoints
      };
      
      runOnJS(updatePathData)(updatedPath, updatedPoints);
    },
    onEnd: () => {
      if (!isDrawingMode || !currentPath) return;
      runOnJS(addNewPath)(currentPath);
      runOnJS(updatePathData)(null, []);
    }
  });

  // Pan gesture handler for navigation - FIX: Improved panning
  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      if (isDrawingMode) return;
      ctx.startX = translateX;
      ctx.startY = translateY;
      runOnJS(setIsPanning)(true);
    },
    onActive: (event, ctx) => {
      if (isDrawingMode) return;
      const newTranslateX = ctx.startX + event.translationX;
      const newTranslateY = ctx.startY + event.translationY;
      runOnJS(setTranslateX)(newTranslateX);
      runOnJS(setTranslateY)(newTranslateY);
    },
    onEnd: () => {
      if (isDrawingMode) return;
      runOnJS(setIsPanning)(false);
    }
  });

  // Pinch gesture handler for zooming - FIX: Improved zooming
  const onPinchGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      if (isDrawingMode) return;
      ctx.startScale = scale;
      initialFocalX.value = event.focalX;
      initialFocalY.value = event.focalY;
      runOnJS(setIsPinching)(true);
    },
    onActive: (event, ctx) => {
      if (isDrawingMode) return;
      
      // Set boundaries for scale
      const newScale = Math.max(0.5, Math.min(3, ctx.startScale * event.scale));
      
      // Calculate focal point in the image's coordinate system
      const focalX = (initialFocalX.value - translateX) / scale;
      const focalY = (initialFocalY.value - translateY) / scale;
      
      // Calculate new translation to keep the focal point fixed
      const newTranslateX = initialFocalX.value - focalX * newScale;
      const newTranslateY = initialFocalY.value - focalY * newScale;
      
      runOnJS(setScale)(newScale);
      runOnJS(setTranslateX)(newTranslateX);
      runOnJS(setTranslateY)(newTranslateY);
    },
    onEnd: () => {
      if (isDrawingMode) return;
      runOnJS(setIsPinching)(false);
    }
  });

  // Generate SVG path string
  const getSvgPath = (points) => {
    if (!points || points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const cx = (p0.x + p1.x) / 2;
      const cy = (p0.y + p1.y) / 2;
      
      path += ` Q ${p0.x} ${p0.y}, ${cx} ${cy}`;
    }
    
    if (points.length >= 2) {
      const lastPoint = points[points.length - 1];
      path += ` L ${lastPoint.x} ${lastPoint.y}`;
    }
    
    return path;
  };

  return (
    <View 
      style={styles.container}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setViewWidth(width);
        setViewHeight(height);
      }}
    >
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        enabled={!isDrawingMode}
      >
        <Animated.View style={styles.pinchContainer}>
          <PanGestureHandler
            onGestureEvent={isDrawingMode ? onDrawGestureEvent : onPanGestureEvent}
            minDist={isDrawingMode ? 0 : 10}
          >
            <Animated.View 
              style={[
                styles.drawContainer,
                {
                  transform: [
                    { translateX },
                    { translateY },
                    { scale }
                  ]
                }
              ]}
              collapsable={false}
              ref={viewShotRef}
            >
              <Image
                source={selectedImage.source}
                style={{
                  width: viewWidth,
                  height: viewHeight,
                  resizeMode: 'contain'
                }}
              />
              
              <Svg
                style={StyleSheet.absoluteFill}
                width={viewWidth}
                height={viewHeight}
              >
                <G>
                  {/* Render paths */}
                  {paths.map((path) => (
                    <Path
                      key={path.id}
                      d={getSvgPath(path.points)}
                      stroke={path.isEraser ? 'white' : path.color}
                      strokeWidth={path.width}
                      strokeOpacity={path.opacity}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      // FIX: Properly implement eraser as white stroke
                      // with composite operation equivalent
                      strokeDasharray={path.isEraser ? undefined : undefined}
                    />
                  ))}
                  
                  {/* Render current path */}
                  {currentPath && (
                    <Path
                      d={getSvgPath(currentPath.points)}
                      stroke={currentPath.isEraser ? 'white' : currentPath.color}
                      strokeWidth={currentPath.width}
                      strokeOpacity={currentPath.opacity}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </G>
              </Svg>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#ECEFF1',
    borderRadius: 16, // Daha yuvarlak kenarlar - çocuklar için
    margin: 8,
    borderWidth: 2, // Boyama alanını belirginleştirme
    borderColor: '#BBDEFB',
  },
  pinchContainer: {
    flex: 1,
  },
  drawContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ColoringCanvas;