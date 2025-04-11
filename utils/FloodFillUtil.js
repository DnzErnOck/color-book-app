// src/utils/FloodFillUtil.js
import { findContainingPath, screenToSvgCoords, extractSvgViewBox } from './SvgPathGeometry';

// Main flood fill function for SVG coloring
export const floodFill = (svgContent, parsedPaths, x, y, fillColor, svgContainerRect) => {
  // Extract viewBox from SVG content
  const viewBox = extractSvgViewBox(svgContent);
  
  // Convert screen coordinates to SVG coordinates
  const svgCoords = screenToSvgCoords(x, y, viewBox, svgContainerRect);
  console.log("Screen:", x, y, "→ SVG:", svgCoords.x, svgCoords.y);
  if (!pathObj) {
    console.log("No path found — fallback circle used");
  }
  
  
  // Find the path that contains the point
  const pathObj = findContainingPath(parsedPaths, svgCoords.x, svgCoords.y);
  
  if (pathObj) {
    // Return the path data to be filled
    return {
      type: 'fill',
      id: pathObj.id,
      d: pathObj.d, // Use the actual path data for filling
      color: fillColor,
      fillOpacity: 0.8,
      // We're using the original path, not creating a shape
      shape: pathObj.d
    };
  }
  
  // If no containing path is found, return a small circle as fallback
  return {
    type: 'fill',
    x: x,
    y: y,
    color: fillColor,
    fillOpacity: 0.5,
    // Create a small circle as fallback
    shape: `M ${x-10} ${y} a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0`
  };
};

// Get the bounding rectangle of an SVG container
export const getSvgContainerRect = (svgContainerRef) => {
  if (!svgContainerRef || !svgContainerRef.current) {
    return { left: 0, top: 0, width: 100, height: 100 };
  }
  
  try {
    // In React Native, we'd use measure()
    return new Promise((resolve) => {
      svgContainerRef.current.measure((x, y, width, height, pageX, pageY) => {
        resolve({
          left: pageX,
          top: pageY,
          width,
          height
        });
      });
    });
  } catch (error) {
    console.error('Error getting SVG container rect:', error);
    return { left: 0, top: 0, width: 100, height: 100 };
  }
};