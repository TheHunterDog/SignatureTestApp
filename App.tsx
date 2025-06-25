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

/**
 * Type definition for navigation routes
 * This ensures type safety when navigating between screens
 */
export type RootStackParamList = {
  Home: undefined; // No parameters needed for home screen
  CustomSignature: undefined; // No parameters for basic signature screen
  EnhancedCustomSignature: undefined; // No parameters for enhanced signature screen
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
