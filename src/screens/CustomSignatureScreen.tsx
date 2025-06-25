import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomSignature from '../components/CustomSignature';

const {width} = Dimensions.get('window');

const CustomSignatureScreen: React.FC = () => {
  const [signatureData, setSignatureData] = useState<string>('');
  const signatureRef = useRef<any>(null);

  const handleSignatureChange = (pathData: string) => {
    setSignatureData(pathData);
  };

  const clearSignature = () => {
    setSignatureData('');
    if (signatureRef.current) {
      // This would require exposing a clear method from CustomSignature
      // For now, we'll trigger a re-render by setting a key
    }
  };

  const saveSignature = () => {
    if (signatureData) {
      Alert.alert('Success', 'Signature captured successfully!');
      console.log('Signature SVG path data:', signatureData);
    } else {
      Alert.alert('Error', 'Please provide a signature first');
    }
  };

  const copySVG = () => {
    if (signatureData) {
      const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width - 80}" height="300" viewBox="0 0 ${width - 80} 300">
  <path d="${signatureData}" stroke="#000000" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      Clipboard.setString(svgData);
      Alert.alert('Success', 'SVG copied to clipboard!');
    } else {
      Alert.alert('Error', 'Please provide a signature first');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Custom Signature Test</Text>
        <Text style={styles.subtitle}>Custom-built signature component with SVG</Text>
      </View>

      <View style={styles.signatureContainer}>
        <Text style={styles.instructionText}>Sign in the area below</Text>
        <View style={styles.signatureWrapper}>
          <CustomSignature
            ref={signatureRef}
            width={width - 80}
            height={300}
            strokeColor="#000000"
            strokeWidth={3}
            backgroundColor="#ffffff"
            onSignatureChange={handleSignatureChange}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={clearSignature}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.copyButton]} 
          onPress={copySVG}
        >
          <Text style={styles.buttonText}>Copy SVG</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.saveButton]} 
          onPress={saveSignature}
        >
          <Text style={styles.buttonText}>Save Signature</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Features:</Text>
        <Text style={styles.infoText}>• Built with React Native Gesture Handler</Text>
        <Text style={styles.infoText}>• Uses SVG for smooth curves</Text>
        <Text style={styles.infoText}>• Quadratic Bezier curves for natural feel</Text>
        <Text style={styles.infoText}>• Real-time path data generation</Text>
      </View>

      {signatureData ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Signature captured!</Text>
          <Text style={styles.resultData} numberOfLines={3}>
            SVG Path: {signatureData.substring(0, 150)}...
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  signatureContainer: {
    flex: 1,
    margin: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  signatureWrapper: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  copyButton: {
    backgroundColor: '#4CAF50',
  },
  saveButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 2,
  },
  resultContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  resultData: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
});

export default CustomSignatureScreen;