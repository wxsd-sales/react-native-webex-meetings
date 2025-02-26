// MeetingScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, AppState, TouchableOpacity, Text } from 'react-native';
import Config from 'react-native-config';
import { WebView } from 'react-native-webview';
import BackgroundService from 'react-native-background-actions';
import { PermissionsAndroid } from 'react-native';

const MeetingScreen = ({navigation, route}) => {
  const { meetingLink } = route.params;
  const [loading, setLoading] = useState(false);
  const meetingUrl = `${Config.SERVER_URL}/${meetingLink}`;
  // Background task options
  const options = {
    taskName: 'Meeting',
    taskTitle: 'Meeting in Progress',
    taskDesc: 'Keeping meeting connection alive',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: 1000,
    },
    // Only use mediaPlayback type
    foregroundServiceType: ['mediaPlayback'],
  };

  // Background task
  const keepAlive = async () => {
    await new Promise(async () => {
      // Keep the task running
      while (BackgroundService.isRunning()) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    });
  };

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
        
        console.log('Permissions:', granted);
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermissions();
    
    // Start background service when component mounts
    const startBackgroundService = async () => {
      await BackgroundService.start(keepAlive, options);
    };

    startBackgroundService();

    // Handle app state changes
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        // App is in background
        startBackgroundService();
      }
    });

    // Cleanup
    return () => {
      subscription.remove();
      BackgroundService.stop();
    };
  }, []);

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;

    if (url.includes('/hangup')) {
      BackgroundService.stop();
      navigation.pop(2);
    }
  };

  const handleNextScreen = () => {
    navigation.navigate('Next', { name: 'Test User' });
  };
  
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: meetingUrl }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        startInLoadingState
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={false}
        androidLayerType="hardware"
      />
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={handleNextScreen}
      >
        <Text style={styles.buttonText}>Go to Next Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  nextButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#0078D7',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MeetingScreen;