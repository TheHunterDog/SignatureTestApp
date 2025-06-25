import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';


const SignatureCaptureScreen: React.FC = () => {
  const signatureRef = useRef<SignatureCapture>(null);
  const [signature, setSignature] = useState<string>('');

  const saveSign = () => {
    signatureRef.current?.saveImage();
  };

  const resetSign = () => {
    signatureRef.current?.resetImage();
    setSignature('');
  };

  const onSaveEvent = (result: any) => {
    console.log('Signature saved:', result);
    setSignature(result.pathName);
    Alert.alert('Success', 'Signature saved successfully!');
  };

  const onDragEvent = () => {
    console.log('Signature drag event');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Signature Capture Test</Text>
        <Text style={styles.subtitle}>Using react-native-signature-capture</Text>
      </View>

      <View style={styles.signatureContainer}>
        <SignatureCapture
          style={styles.signature}
          ref={signatureRef}
          onSaveEvent={onSaveEvent}
          onDragEvent={onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          backgroundColor="#ffffff"
          strokeColor="#000000"
          minStrokeWidth={4}
          maxStrokeWidth={4}
          viewMode="portrait"
        />
        
        <View style={styles.signatureOverlay}>
          <Text style={styles.overlayText}>Sign here</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={resetSign}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.saveButton]} 
          onPress={saveSign}
        >
          <Text style={styles.buttonText}>Save Signature</Text>
        </TouchableOpacity>
      </View>

      {signature ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Signature saved!</Text>
          <Text style={styles.resultPath}>Path: {signature}</Text>
          <Image 
            source={{uri: `file://${signature}`}} 
            style={styles.signatureImage}
            resizeMode="contain"
          />
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
    position: 'relative',
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  signatureOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    pointerEvents: 'none',
  },
  overlayText: {
    color: '#ccc',
    fontSize: 16,
    fontStyle: 'italic',
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
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: 'white',
    margin: 20,
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
  resultPath: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  signatureImage: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default SignatureCaptureScreen;