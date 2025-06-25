/**
 * SignatureComparisonScreen
 * 
 * A comprehensive demo screen showcasing three different signature capture approaches:
 * 1. React Native Skia - High-performance GPU-accelerated
 * 2. React Native Canvas - HTML5 Canvas API compatibility
 * 3. PanResponder + SVG - Pure React Native implementation
 * 
 * This screen allows users to test and compare the different implementations
 * side by side to understand their capabilities and performance characteristics.
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {SafeAreaView} from 'react-native-safe-area-context';

// Import our signature components
// import SkiaSignature from '../components/SkiaSignature'; // Temporarily disabled for testing
import CanvasSignature from '../components/CanvasSignature';
import PanResponderSignature from '../components/PanResponderSignature';
import CustomSignature from '../components/CustomSignature';

const {width: screenWidth} = Dimensions.get('window');
const signatureWidth = screenWidth - 40;
const signatureHeight = 200;

/**
 * Interface for signature component data
 */
interface SignatureData {
  skia: string;
  canvas: string;
  panResponder: string;
  gestureHandler: string;
}

/**
 * SignatureComparisonScreen Component
 */
const SignatureComparisonScreen: React.FC = () => {
  // State to store signature data from each component
  const [signatureData, setSignatureData] = useState<SignatureData>({
    skia: '',
    canvas: '',
    panResponder: '',
    gestureHandler: '',
  });

  /**
   * Handle signature change for different components
   */
  const handleSignatureChange = (type: keyof SignatureData, data: string) => {
    setSignatureData(prev => ({
      ...prev,
      [type]: data,
    }));
  };

  /**
   * Show signature data in an alert
   */
  const showSignatureData = (type: keyof SignatureData) => {
    const data = signatureData[type];
    if (data) {
      Alert.alert(
        `${type.charAt(0).toUpperCase() + type.slice(1)} Signature Data`,
        `Data length: ${data.length} characters\n\nPreview: ${data.substring(0, 100)}...`,
        [{text: 'OK'}]
      );
    } else {
      Alert.alert('No Signature', 'Please draw a signature first.');
    }
  };

  /**
   * Clear all signatures
   */
  const clearAllSignatures = () => {
    setSignatureData({
      skia: '',
      canvas: '',
      panResponder: '',
      gestureHandler: '',
    });
  };

  /**
   * Copy SVG data to clipboard
   */
  const copySVGData = (type: keyof SignatureData) => {
    const data = signatureData[type];
    if (data) {
      let svgData: string;
      if (type === 'canvas') {
        // Canvas outputs Base64 image data
        svgData = data;
      } else {
        // SVG path data
        const colors = {
          panResponder: '#FF9800',
          gestureHandler: '#9C27B0',
          skia: '#2196F3'
        };
        const color = colors[type as keyof typeof colors] || '#000000';
        svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${signatureWidth}" height="${signatureHeight}" viewBox="0 0 ${signatureWidth} ${signatureHeight}">
  <path d="${data}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      }
      Clipboard.setString(svgData);
      Alert.alert('Success', `${type.charAt(0).toUpperCase() + type.slice(1)} data copied to clipboard!`);
    } else {
      Alert.alert('No Signature', 'Please draw a signature first.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Signature Component Comparison</Text>
          <Text style={styles.subtitle}>
            Test different signature capture implementations
          </Text>
        </View>

        {/* React Native Skia Implementation - Temporarily disabled */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>1. React Native Skia (Setup Required)</Text>
            <View style={[styles.performanceBadge, styles.lowPerformance]}>
              <Text style={styles.performanceText}>Setup</Text>
            </View>
          </View>
          <Text style={styles.sectionDescription}>
            GPU-accelerated graphics with Skia engine. Requires additional native setup. Currently disabled for testing other implementations.
          </Text>
          <View style={[styles.signatureContainer, styles.disabledContainer]}>
            <Text style={styles.disabledText}>
              React Native Skia requires additional setup.{'\n'}
              Testing other implementations first.
            </Text>
          </View>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>✓ GPU-accelerated rendering</Text>
            <Text style={styles.featureItem}>✓ 60 FPS performance</Text>
            <Text style={styles.featureItem}>✓ Advanced graphics features</Text>
            <Text style={styles.featureItem}>⚠ Requires native setup</Text>
          </View>
        </View>

        {/* React Native Canvas Implementation */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>2. React Native Canvas</Text>
            <View style={[styles.performanceBadge, styles.mediumPerformance]}>
              <Text style={styles.performanceText}>75/100</Text>
            </View>
          </View>
          <Text style={styles.sectionDescription}>
            HTML5 Canvas API compatibility. Familiar API for web developers with good performance.
          </Text>
          <View style={styles.signatureContainer}>
            <CanvasSignature
              width={signatureWidth}
              height={signatureHeight}
              strokeColor="#4CAF50"
              strokeWidth={3}
              backgroundColor="#F5F5F5"
              onSignatureChange={(data) => handleSignatureChange('canvas', data)}
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showSignatureData('canvas')}
            >
              <Text style={styles.buttonText}>View Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.copyButton]}
              onPress={() => copySVGData('canvas')}
            >
              <Text style={styles.buttonText}>Copy Data</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>✓ HTML5 Canvas API</Text>
            <Text style={styles.featureItem}>✓ Base64 image export</Text>
            <Text style={styles.featureItem}>✓ Familiar web API</Text>
            <Text style={styles.featureItem}>✓ Good performance</Text>
          </View>
        </View>

        {/* PanResponder Implementation */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>3. PanResponder + SVG</Text>
            <View style={[styles.performanceBadge, styles.mediumPerformance]}>
              <Text style={styles.performanceText}>80/100</Text>
            </View>
          </View>
          <Text style={styles.sectionDescription}>
            Pure React Native implementation. No external dependencies, lightweight and compatible.
          </Text>
          <View style={styles.signatureContainer}>
            <PanResponderSignature
              width={signatureWidth}
              height={signatureHeight}
              strokeColor="#FF9800"
              strokeWidth={3}
              backgroundColor="#F5F5F5"
              onSignatureChange={(data) => handleSignatureChange('panResponder', data)}
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showSignatureData('panResponder')}
            >
              <Text style={styles.buttonText}>View Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.copyButton]}
              onPress={() => copySVGData('panResponder')}
            >
              <Text style={styles.buttonText}>Copy SVG</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>✓ Zero external dependencies</Text>
            <Text style={styles.featureItem}>✓ SVG path output</Text>
            <Text style={styles.featureItem}>✓ Lightweight</Text>
            <Text style={styles.featureItem}>✓ Cross-platform compatible</Text>
          </View>
        </View>

        {/* Gesture Handler Implementation (Updated) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>4. Gesture Handler + SVG</Text>
            <View style={[styles.performanceBadge, styles.lowPerformance]}>
              <Text style={styles.performanceText}>70/100</Text>
            </View>
          </View>
          <Text style={styles.sectionDescription}>
            Updated from deprecated PanGestureHandler to modern Gesture API. Good performance with gesture optimization.
          </Text>
          <View style={styles.signatureContainer}>
            <CustomSignature
              width={signatureWidth}
              height={signatureHeight}
              strokeColor="#9C27B0"
              strokeWidth={3}
              backgroundColor="#F5F5F5"
              onSignatureChange={(data) => handleSignatureChange('gestureHandler', data)}
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showSignatureData('gestureHandler')}
            >
              <Text style={styles.buttonText}>View Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.copyButton]}
              onPress={() => copySVGData('gestureHandler')}
            >
              <Text style={styles.buttonText}>Copy SVG</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>✓ Modern Gesture API</Text>
            <Text style={styles.featureItem}>✓ Optimized touch handling</Text>
            <Text style={styles.featureItem}>✓ SVG rendering</Text>
            <Text style={styles.featureItem}>✓ No deprecation warnings</Text>
          </View>
        </View>

        {/* Performance Comparison */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Performance Comparison</Text>
          <View style={styles.comparisonTable}>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Rendering Speed:</Text>
              <Text style={styles.comparisonValue}>Skia → PanResponder → Canvas → GestureHandler</Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Memory Usage:</Text>
              <Text style={styles.comparisonValue}>PanResponder ← GestureHandler ← Canvas ← Skia</Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Bundle Size:</Text>
              <Text style={styles.comparisonValue}>PanResponder ← GestureHandler ← Canvas ← Skia</Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Feature Set:</Text>
              <Text style={styles.comparisonValue}>Skia → Canvas → GestureHandler = PanResponder</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.clearButton]}
            onPress={clearAllSignatures}
          >
            <Text style={[styles.buttonText, styles.clearButtonText]}>
              Clear All Signatures
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Styles for the SignatureComparisonScreen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 30,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  performanceBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mediumPerformance: {
    backgroundColor: '#FF9800',
  },
  lowPerformance: {
    backgroundColor: '#F44336',
  },
  performanceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  signatureContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  disabledContainer: {
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  disabledText: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  comparisonTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  comparisonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  comparisonValue: {
    fontSize: 14,
    color: '#666',
    flex: 2,
    textAlign: 'right',
  },
  actionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  copyButton: {
    backgroundColor: '#4CAF50',
  },
  clearButton: {
    backgroundColor: '#F44336',
  },
  clearButtonText: {
    color: '#FFFFFF',
  },
});

export default SignatureComparisonScreen;