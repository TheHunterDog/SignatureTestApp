/**
 * GestureHandlerSignatureScreen
 * 
 * Dedicated screen for testing the modern Gesture Handler + SVG signature implementation.
 * This provides a full-screen experience for testing the updated gesture API.
 */

import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomSignature from '../components/CustomSignature';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const signatureWidth = screenWidth - 40;
const signatureHeight = screenHeight * 0.6; // 60% of screen height

/**
 * GestureHandlerSignatureScreen Component
 */
const GestureHandlerSignatureScreen: React.FC = () => {
  const [signatureData, setSignatureData] = useState<string>('');
  const signatureRef = useRef<any>(null);

  /**
   * Handle signature change
   */
  const handleSignatureChange = (data: string) => {
    setSignatureData(data);
  };

  /**
   * Show signature data
   */
  const showSignatureData = () => {
    if (signatureData) {
      Alert.alert(
        'Gesture Handler Signature Data',
        `Data type: SVG Path\nLength: ${signatureData.length} characters\n\nPreview: ${signatureData.substring(0, 100)}...`,
        [{text: 'OK'}]
      );
    } else {
      Alert.alert('No Signature', 'Please draw a signature first.');
    }
  };

  /**
   * Clear signature
   */
  const clearSignature = () => {
    setSignatureData('');
    // Note: Gesture Handler component needs internal clear method
  };

  /**
   * Copy SVG to clipboard
   */
  const copySVG = () => {
    if (signatureData) {
      const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${signatureWidth}" height="${signatureHeight}" viewBox="0 0 ${signatureWidth} ${signatureHeight}">
  <path d="${signatureData}" stroke="#9C27B0" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      Clipboard.setString(svgData);
      Alert.alert('Success', 'SVG copied to clipboard!');
    } else {
      Alert.alert('No Signature', 'Please draw a signature first.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gesture Handler Signature Test</Text>
        <Text style={styles.subtitle}>
          Modern Gesture API • SVG Paths • Score: 70/100
        </Text>
      </View>

      <View style={styles.signatureContainer}>
        <CustomSignature
          width={signatureWidth}
          height={signatureHeight}
          strokeColor="#9C27B0"
          strokeWidth={4}
          backgroundColor="#FFFFFF"
          onSignatureChange={handleSignatureChange}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={showSignatureData}
        >
          <Text style={styles.buttonText}>View Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.copyButton]}
          onPress={copySVG}
        >
          <Text style={styles.buttonText}>Copy SVG</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.clearButton]}
          onPress={clearSignature}
        >
          <Text style={[styles.buttonText, styles.clearButtonText]}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Gesture Handler Implementation Features:</Text>
        <Text style={styles.infoItem}>✓ Modern Gesture API (no deprecation warnings)</Text>
        <Text style={styles.infoItem}>✓ Optimized touch handling</Text>
        <Text style={styles.infoItem}>✓ SVG rendering for scalability</Text>
        <Text style={styles.infoItem}>✓ Smooth curve generation</Text>
        <Text style={styles.infoItem}>✓ Updated from deprecated PanGestureHandler</Text>
        <Text style={styles.infoItem}>⚠ Requires react-native-gesture-handler library</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  signatureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  copyButton: {
    backgroundColor: '#4CAF50',
  },
  clearButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButtonText: {
    color: '#FFFFFF',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
});

export default GestureHandlerSignatureScreen;