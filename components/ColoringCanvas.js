// src/components/ColoringCanvas.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path, G } from 'react-native-svg';
import Animated, { 
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { createSvgPath } from '../utils/drawingUtils';

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
  const [internalDrawingMode, setInternalDrawingMode] = useState(isDrawingMode);
  
  useEffect(() => {
    setInternalDrawingMode(isDrawingMode);
  }, [isDrawingMode]);
  
  const [viewWidth, setViewWidth] = useState(windowWidth - 88); // Adjusted for tool panel
  const [viewHeight, setViewHeight] = useState(windowHeight - 100); // Adjusted for header/toolbar
  
  const pressure = useSharedValue(1);
  const initialFocalX = useSharedValue(0);
  const initialFocalY = useSharedValue(0);
  const lastTouch = useSharedValue({ x: 0, y: 0 });

  useEffect(() => {
    const resetViewWithDelay = () => {
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      
      setTimeout(() => {
        const imageAspectRatio = selectedImage.aspectRatio || 1;
        const viewAspectRatio = viewWidth / viewHeight;
        let newScale = 1;
        
        if (imageAspectRatio > viewAspectRatio) {
          newScale = 0.9;
        } else {
          newScale = 0.9;
        }
        
        setScale(newScale);
      }, 100);
    };
    
    resetViewWithDelay();
  }, [selectedImage, viewWidth, viewHeight]);

  const getCanvasCoordinates = (screenX, screenY) => {
    return {
      x: (screenX - translateX) / scale,
      y: (screenY - translateY) / scale
    };
  };

  const onDrawGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      if (!internalDrawingMode) return;
      
      pressure.value = event.pressure || 1;
      const adjustedPressure = 1 + (pressure.value - 1) * brushPressureEffect;
      
      lastTouch.value = { x: event.x, y: event.y };
      
      const canvasPoint = {
        x: (event.x - translateX) / scale,
        y: (event.y - translateY) / scale,
        pressure: adjustedPressure
      };
      
      const effectiveColor = isEraser ? 'transparent' : selectedColor;
      const effectiveWidth = brushSize * adjustedPressure;
      
      const newPath = {
        id: Date.now().toString(),
        color: effectiveColor,
        width: effectiveWidth,
        opacity: brushOpacity,
        blur: brushBlur,
        points: [canvasPoint],
        isEraser: isEraser
      };
      
      runOnJS(updatePathData)(newPath, [canvasPoint]);
    },
    onActive: (event) => {
      if (!internalDrawingMode || !currentPath) return;
      
      pressure.value = event.pressure || 1;
      const adjustedPressure = 1 + (pressure.value - 1) * brushPressureEffect;
      
      const dx = event.x - lastTouch.value.x;
      const dy = event.y - lastTouch.value.y;
      
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && currentPoints.length > 0) {
        return;
      }
      
      lastTouch.value = { x: event.x, y: event.y };
      
      const canvasPoint = {
        x: (event.x - translateX) / scale,
        y: (event.y - translateY) / scale,
        pressure: adjustedPressure
      };
      
      const updatedPoints = [...currentPoints, canvasPoint];
      const updatedPath = {
        ...currentPath,
        points: updatedPoints
      };
      
      runOnJS(updatePathData)(updatedPath, updatedPoints);
    },
    onEnd: () => {
      if (!internalDrawingMode || !currentPath) return;
      runOnJS(addNewPath)(currentPath);
      runOnJS(updatePathData)(null, []);
    }
  });

  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      if (internalDrawingMode) return;
      ctx.startX = translateX;
      ctx.startY = translateY;
      runOnJS(setIsPanning)(true);
    },
    onActive: (event, ctx) => {
      if (internalDrawingMode) return;
      
      const maxTranslateX = viewWidth * scale * 0.5;
      const maxTranslateY = viewHeight * scale * 0.5;
      
      const newTranslateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, ctx.startX + event.translationX));
      const newTranslateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, ctx.startY + event.translationY));
      
      runOnJS(setTranslateX)(newTranslateX);
      runOnJS(setTranslateY)(newTranslateY);
    },
    onEnd: () => {
      if (internalDrawingMode) return;
      runOnJS(setIsPanning)(false);
    }
  });

  const onPinchGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      if (internalDrawingMode) return;
      ctx.startScale = scale;
      initialFocalX.value = event.focalX;
      initialFocalY.value = event.focalY;
      runOnJS(setIsPinching)(true);
    },
    onActive: (event, ctx) => {
      if (internalDrawingMode) return;
      
      const newScale = Math.max(0.5, Math.min(8, ctx.startScale * event.scale));
      
      const focalX = (initialFocalX.value - translateX) / scale;
      const focalY = (initialFocalY.value - translateY) / scale;
      
      const newTranslateX = initialFocalX.value - focalX * newScale;
      const newTranslateY = initialFocalY.value - focalY * newScale;
      
      runOnJS(setScale)(newScale);
      runOnJS(setTranslateX)(newTranslateX);
      runOnJS(setTranslateY)(newTranslateY);
    },
    onEnd: () => {
      if (internalDrawingMode) return;
      runOnJS(setIsPinching)(false);
    }
  });

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
        enabled={!internalDrawingMode}
      >
        <Animated.View style={styles.pinchContainer}>
          <PanGestureHandler
            onGestureEvent={internalDrawingMode ? onDrawGestureEvent : onPanGestureEvent}
            minDist={internalDrawingMode ? 0 : 10}
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
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain'
                }}
              />
              
              <Svg
                style={StyleSheet.absoluteFill}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
              >
                <G>
                  {paths.map((path) => (
                    <Path
                      key={path.id}
                      d={createSvgPath(path.points)}
                      stroke={path.isEraser ? 'white' : path.color}
                      strokeWidth={path.width}
                      strokeOpacity={path.opacity}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      compositeOperation={path.isEraser ? "destination-out" : "source-over"}
                    />
                  ))}
                  
                  {currentPath && (
                    <Path
                      d={createSvgPath(currentPath.points)}
                      stroke={currentPath.isEraser ? 'white' : currentPath.color}
                      strokeWidth={currentPath.width}
                      strokeOpacity={currentPath.opacity}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      compositeOperation={currentPath.isEraser ? "destination-out" : "source-over"}
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
    borderRadius: 16,
    margin: 8,
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
  pinchContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  drawContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  }
});

export default ColoringCanvas;