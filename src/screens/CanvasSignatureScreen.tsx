/**
 * CanvasSignatureScreen
 * 
 * Dedicated screen for testing the react-native-canvas signature implementation.
 * This provides a full-screen experience for testing canvas-based signature capture.
 */

import React, {useState} from 'react';
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
import CanvasSignature from '../components/CanvasSignature';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const signatureWidth = screenWidth - 40;
const signatureHeight = screenHeight * 0.6; // 60% of screen height

/**
 * CanvasSignatureScreen Component
 */
const CanvasSignatureScreen: React.FC = () => {
  const [signatureData, setSignatureData] = useState<string>('');

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
        'Canvas Signature Data',
        `Data type: Base64 Image\nLength: ${signatureData.length} characters\n\nPreview: ${signatureData.substring(0, 100)}...`,
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
    // Note: Canvas component needs internal clear method
  };

  /**
   * Copy Base64 image data to clipboard
   */
  const copyImageData = () => {
    if (signatureData) {
      Clipboard.setString(signatureData);
      Alert.alert('Success', 'Base64 image data copied to clipboard!');
    } else {
      Alert.alert('No Signature', 'Please draw a signature first.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Canvas Signature Test</Text>
        <Text style={styles.subtitle}>
          HTML5 Canvas API • Base64 Export • Score: 75/100
        </Text>
      </View>

      <View style={styles.signatureContainer}>
        <CanvasSignature
          width={signatureWidth}
          height={signatureHeight}
          strokeColor="#4CAF50"
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
          onPress={copyImageData}
        >
          <Text style={styles.buttonText}>Copy Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.clearButton]}
          onPress={clearSignature}
        >
          <Text style={[styles.buttonText, styles.clearButtonText]}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Canvas Implementation Features:</Text>
        <Text style={styles.infoItem}>✓ HTML5 Canvas API compatibility</Text>
        <Text style={styles.infoItem}>✓ Base64 image export</Text>
        <Text style={styles.infoItem}>✓ Familiar web development patterns</Text>
        <Text style={styles.infoItem}>✓ Cross-platform consistency</Text>
        <Text style={styles.infoItem}>⚠ Moderate performance for complex drawings</Text>
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
    color: '#4CAF50',
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
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  copyButton: {
    backgroundColor: '#2196F3',
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

export default CanvasSignatureScreen;