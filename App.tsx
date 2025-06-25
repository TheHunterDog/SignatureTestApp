/**
 * React Native Signature Testing App
 * 
 * This is the main entry point of the application that demonstrates different
 * approaches to implementing signature capture in React Native.
 * 
 * The app compares:
 * 1. Basic Custom Signature (70/100) - Simple learning example
 * 2. Enhanced Custom Signature (95/100) - Production-ready implementation
 * 
 * Architecture:
 * - Uses React Navigation for screen management
 * - Gesture Handler for touch interactions
 * - SVG for signature rendering
 * - TypeScript for type safety
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, useColorScheme, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Screen imports
import HomeScreen from './src/screens/HomeScreen';
import CustomSignatureScreen from './src/screens/CustomSignatureScreen';
import EnhancedCustomSignatureScreen from './src/screens/EnhancedCustomSignatureScreen';
import SignatureComparisonScreen from './src/screens/SignatureComparisonScreen';
import SkiaSignatureScreen from './src/screens/SkiaSignatureScreen';
import CanvasSignatureScreen from './src/screens/CanvasSignatureScreen';
import PanResponderSignatureScreen from './src/screens/PanResponderSignatureScreen';
import GestureHandlerSignatureScreen from './src/screens/GestureHandlerSignatureScreen';

/**
 * Type definition for navigation routes
 * This ensures type safety when navigating between screens
 */
export type RootStackParamList = {
  Home: undefined; // No parameters needed for home screen
  CustomSignature: undefined; // No parameters for basic signature screen
  EnhancedCustomSignature: undefined; // No parameters for enhanced signature screen
  SignatureComparison: undefined; // No parameters for comparison screen
  SkiaSignature: undefined; // No parameters for Skia screen
  CanvasSignature: undefined; // No parameters for Canvas screen
  PanResponderSignature: undefined; // No parameters for PanResponder screen
  GestureHandlerSignature: undefined; // No parameters for GestureHandler screen
};

// Create typed stack navigator
const Stack = createStackNavigator<RootStackParamList>();

/**
 * Main App Component
 * 
 * Sets up the navigation structure and provides the gesture handler context
 * needed for signature capture functionality.
 */
function App(): React.JSX.Element {
  // Detect device theme preference for status bar styling
  const isDarkMode = useColorScheme() === 'dark';

  return (
    // GestureHandlerRootView is required at the root for gesture interactions
    // This enables touch handling for signature capture
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        {/* Configure status bar based on device theme */}
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        
        {/* Stack Navigator manages screen transitions */}
        <Stack.Navigator initialRouteName="Home">
          {/* Home Screen - Main menu with signature options */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Signature Test App',
              headerStyle: {
                backgroundColor: '#6200ee', // Purple theme
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          
          {/* Basic Custom Signature Screen */}
          <Stack.Screen
            name="CustomSignature"
            component={CustomSignatureScreen}
            options={{
              title: 'Custom Signature',
              headerStyle: {
                backgroundColor: '#9C27B0', // Purple theme
              },
              headerTintColor: '#fff',
            }}
          />
          
          {/* Enhanced Custom Signature Screen - Production ready */}
          <Stack.Screen
            name="EnhancedCustomSignature"
            component={EnhancedCustomSignatureScreen}
            options={{
              title: 'Enhanced Custom',
              headerStyle: {
                backgroundColor: '#4CAF50', // Green theme (highest score)
              },
              headerTintColor: '#fff',
            }}
          />
          
          {/* Signature Comparison Screen - All implementations */}
          <Stack.Screen
            name="SignatureComparison"
            component={SignatureComparisonScreen}
            options={{
              title: 'All Implementations',
              headerStyle: {
                backgroundColor: '#2196F3', // Blue theme
              },
              headerTintColor: '#fff',
            }}
          />
          
          {/* Individual Implementation Screens */}
          <Stack.Screen
            name="SkiaSignature"
            component={SkiaSignatureScreen}
            options={{
              title: 'Skia Implementation',
              headerStyle: {
                backgroundColor: '#2196F3',
              },
              headerTintColor: '#fff',
            }}
          />
          
          <Stack.Screen
            name="CanvasSignature"
            component={CanvasSignatureScreen}
            options={{
              title: 'Canvas Implementation',
              headerStyle: {
                backgroundColor: '#4CAF50',
              },
              headerTintColor: '#fff',
            }}
          />
          
          <Stack.Screen
            name="PanResponderSignature"
            component={PanResponderSignatureScreen}
            options={{
              title: 'PanResponder Implementation',
              headerStyle: {
                backgroundColor: '#FF9800',
              },
              headerTintColor: '#fff',
            }}
          />
          
          <Stack.Screen
            name="GestureHandlerSignature"
            component={GestureHandlerSignatureScreen}
            options={{
              title: 'Gesture Handler Implementation',
              headerStyle: {
                backgroundColor: '#9C27B0',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

/**
 * Styles for the main app container
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill entire screen
  },
});

export default App;
