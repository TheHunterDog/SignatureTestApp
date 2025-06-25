/**
 * CustomSignature Component
 * 
 * A custom signature capture component built with React Native SVG and Gesture Handler.
 * This implementation demonstrates how to create a signature component from scratch
 * without external dependencies.
 * 
 * Key Features:
 * - Pure React Native implementation
 * - SVG-based rendering for scalability
 * - Smooth curve generation using quadratic Bezier curves
 * - Real-time path data generation
 * - Configurable styling (color, width, background)
 * - No external signature library dependencies
 * 
 * Technical Approach:
 * - Uses PanGestureHandler for touch tracking
 * - Converts touch points to SVG path commands
 * - Generates smooth curves between points using quadratic Bezier interpolation
 * - Outputs standard SVG path data that can be used anywhere
 * 
 * Production Score: 70/100
 * - Good for learning and basic use cases
 * - Missing advanced features like undo/redo
 * - Suitable for simple signature capture needs
 */

import React, {useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

/**
 * Interface for coordinate points
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Props interface for CustomSignature component
 */
interface CustomSignatureProps {
  width: number; // Width of the signature area
  height: number; // Height of the signature area
  strokeColor?: string; // Color of the signature stroke
  strokeWidth?: number; // Width of the signature stroke
  backgroundColor?: string; // Background color of the signature area
  onSignatureChange?: (pathData: string) => void; // Callback when signature changes
}

/**
 * CustomSignature Component Implementation
 * 
 * This component captures touch gestures and converts them into SVG path data
 * for signature creation. It uses a sophisticated curve smoothing algorithm
 * to create natural-looking signatures.
 */
const CustomSignature: React.FC<CustomSignatureProps> = ({
  width,
  height,
  strokeColor = '#000000', // Default black stroke
  strokeWidth = 3, // Default 3px stroke width
  backgroundColor = '#ffffff', // Default white background
  onSignatureChange, // Callback for signature data changes
}) => {
  // State for the current stroke being drawn
  const [pathData, setPathData] = useState<string>('');
  
  // Array of completed stroke paths
  const [paths, setPaths] = useState<string[]>([]);
  
  // Reference to store points for the current stroke
  const currentPath = useRef<Point[]>([]);

  /**
   * Adds a new point to the current path and generates smooth curves
   * 
   * Algorithm:
   * 1. First point: Creates a "Move to" (M) command
   * 2. Subsequent points: Creates quadratic Bezier curves (Q) for smoothness
   * 
   * @param x - X coordinate of the touch point
   * @param y - Y coordinate of the touch point
   */
  const addPoint = (x: number, y: number) => {
    // Add the new point to our current path
    currentPath.current.push({x, y});
    
    // First point - start the path with a "Move to" command
    if (currentPath.current.length === 1) {
      const newPath = `M${x},${y}`; // SVG "Move to" command
      setPathData(newPath);
    } 
    // Second point and beyond - create smooth curves
    else if (currentPath.current.length >= 2) {
      const prevPoint = currentPath.current[currentPath.current.length - 2];
      const currentPoint = currentPath.current[currentPath.current.length - 1];
      
      // Calculate control point for quadratic Bezier curve
      // This creates smooth curves between points instead of sharp angles
      const controlX = (prevPoint.x + currentPoint.x) / 2;
      const controlY = (prevPoint.y + currentPoint.y) / 2;
      
      // Create quadratic Bezier curve command
      const newPathSegment = `Q${prevPoint.x},${prevPoint.y} ${controlX},${controlY}`;
      setPathData(prev => prev + newPathSegment);
    }
  };

  /**
   * Finalizes the current path when the user lifts their finger
   * 
   * This function:
   * 1. Adds the completed path to the paths array
   * 2. Combines all paths into a single SVG path string
   * 3. Calls the onChange callback with the complete signature data
   * 4. Resets the current path for the next stroke
   */
  const finalizePath = () => {
    if (pathData) {
      // Add current path to the collection of completed paths
      setPaths(prev => [...prev, pathData]);
      
      // Combine all paths (including the current one) for the callback
      const allPaths = [...paths, pathData].join(' ');
      onSignatureChange?.(allPaths);
      
      // Reset for next stroke
      setPathData('');
      currentPath.current = [];
    }
  };

  /**
   * Creates a pan gesture for signature capture using the new Gesture API
   */
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      'worklet';
      // Use runOnJS to call functions from the UI thread
      runOnJS(addPoint)(event.x, event.y);
    })
    .onEnd(() => {
      'worklet';
      runOnJS(finalizePath)();
    });


  // Render the signature capture interface
  return (
    <View style={{width, height, backgroundColor}}>
      {/* 
        GestureDetector captures touch gestures across the signature area using the new Gesture API
        - panGesture handles touch movement and gesture end events
      */}
      <GestureDetector gesture={panGesture}>
        <View style={styles.gestureContainer}>
          {/* 
            SVG container that renders the signature paths
            - SVG is scalable and produces crisp lines at any resolution
            - Each stroke is rendered as a separate Path element
          */}
          <Svg width={width} height={height} style={styles.svgContainer}>
            {/* Render all completed paths */}
            {paths.map((path, index) => (
              <Path
                key={index}
                d={path} // SVG path data string
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fill="none" // No fill, just stroke
                strokeLinecap="round" // Rounded line ends
                strokeLinejoin="round" // Rounded line joins
              />
            ))}
            
            {/* Render the current path being drawn (if any) */}
            {pathData && (
              <Path
                d={pathData}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </Svg>
        </View>
      </GestureDetector>
    </View>
  );
};

/**
 * Styles for the CustomSignature component
 * 
 * Simple styling to ensure proper layout and positioning
 */
const styles = StyleSheet.create({
  // Container for gesture handling - fills available space
  gestureContainer: {
    flex: 1,
  },
  
  // SVG container positioned absolutely to overlay the gesture area
  svgContainer: {
    position: 'absolute',
  },
});

export default CustomSignature;