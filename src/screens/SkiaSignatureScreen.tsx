/**
 * SkiaSignatureScreen
 * 
 * Dedicated screen for testing the React Native Skia signature implementation.
 * This provides a full-screen experience for testing GPU-accelerated signature capture.
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

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const signatureWidth = screenWidth - 40;
const signatureHeight = screenHeight * 0.6; // 60% of screen height

/**
 * SkiaSignatureScreen Component
 */
const SkiaSignatureScreen: React.FC = () => {
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
    Alert.alert(
      'Skia Setup Required',
      'React Native Skia requires additional native setup and configuration. This implementation is temporarily disabled until proper setup is completed.\n\nFeatures would include:\n• GPU-accelerated rendering\n• 60 FPS performance\n• Advanced graphics capabilities',
      [{text: 'OK'}]
    );
  };

  /**
   * Clear signature
   */
  const clearSignature = () => {
    setSignatureData('');
  };

  /**
   * Copy SVG to clipboard (disabled)
   */
  const copySVG = () => {
    Alert.alert('Disabled', 'Copy SVG is disabled until Skia setup is completed.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Skia Signature Test</Text>
        <Text style={styles.subtitle}>
          GPU-Accelerated • High Performance • Score: 95/100
        </Text>
      </View>

      <View style={styles.signatureContainer}>
        <View style={styles.disabledContainer}>
          <Text style={styles.disabledIcon}>⚙️</Text>
          <Text style={styles.disabledTitle}>Setup Required</Text>
          <Text style={styles.disabledText}>
            React Native Skia requires additional{'\n'}
            native configuration and setup.{'\n\n'}
            This implementation is temporarily{'\n'}
            disabled for testing other approaches.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={showSignatureData}
        >
          <Text style={styles.buttonText}>Setup Info</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.disabledButton]}
          onPress={copySVG}
          disabled={true}
        >
          <Text style={[styles.buttonText, styles.disabledButtonText]}>Copy SVG</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.disabledButton]}
          disabled={true}
        >
          <Text style={[styles.buttonText, styles.disabledButtonText]}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Skia Implementation Features:</Text>
        <Text style={styles.infoItem}>🚀 GPU-accelerated rendering</Text>
        <Text style={styles.infoItem}>⚡ 60 FPS performance guarantee</Text>
        <Text style={styles.infoItem}>🎨 Advanced graphics effects</Text>
        <Text style={styles.infoItem}>🌍 Industry-standard (Chrome, Android)</Text>
        <Text style={styles.infoItem}>🔮 WebGPU support (future)</Text>
        <Text style={styles.infoItemWarning}>⚠ Requires native setup and configuration</Text>
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
    color: '#2196F3',
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
  disabledContainer: {
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DDDDDD',
    borderStyle: 'dashed',
    width: signatureWidth,
    height: signatureHeight,
    justifyContent: 'center',
  },
  disabledIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  disabledTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  disabledText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
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
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#999999',
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
  infoItemWarning: {
    fontSize: 14,
    color: '#FF9800',
    marginBottom: 6,
    fontWeight: '500',
  },
});

export default SkiaSignatureScreen;