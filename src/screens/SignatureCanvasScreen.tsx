import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';


const SignatureCanvasScreen: React.FC = () => {
  const ref = useRef<any>();
  const [signature, setSignature] = useState<string>('');

  const handleOK = (signatureData: string) => {
    console.log('Signature captured:', signatureData);
    setSignature(signatureData);
    Alert.alert('Success', 'Signature captured successfully!');
  };

  const handleEmpty = () => {
    Alert.alert('Error', 'Please provide a signature');
  };

  const handleClear = () => {
    ref.current?.clearSignature();
    setSignature('');
  };

  const handleUndo = () => {
    ref.current?.undo();
  };

  const handleRedo = () => {
    ref.current?.redo();
  };

  const handleConfirm = () => {
    ref.current?.readSignature();
  };

  const style = `.m-signature-pad--footer
    .m-signature-pad--footer .description {
      color: #C3C3C3;
    }
    
    .m-signature-pad--footer .button {
      background-color: #4CAF50;
      color: white;
    }`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Signature Canvas Test</Text>
        <Text style={styles.subtitle}>Using react-native-signature-canvas</Text>
      </View>

      <View style={styles.signatureContainer}>
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          onEmpty={handleEmpty}
          descriptionText="Sign here"
          clearText="Clear"
          confirmText="Confirm"
          webStyle={style}
          autoClear={false}
          imageType="image/png"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleUndo}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleRedo}>
          <Text style={styles.buttonText}>Redo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.confirmButton]} 
          onPress={handleConfirm}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      {signature ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Signature captured!</Text>
          <Text style={styles.resultData} numberOfLines={2}>
            {signature.substring(0, 100)}...
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
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
  resultData: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
});

export default SignatureCanvasScreen;