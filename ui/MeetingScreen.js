// MeetingScreen.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, AppState, TouchableOpacity, Text, BackHandler } from 'react-native';
import Config from 'react-native-config';
import { WebView } from 'react-native-webview';
import BackgroundService from 'react-native-background-actions';
import { PermissionsAndroid } from 'react-native';
import { useNavigation as useNavigationContext } from '../context/NavigationContext';

const MeetingScreen = ({navigation, route}) => {
  const { meetingLink } = route.params;
  const [loading, setLoading] = useState(false);
  const webViewRef = useRef(null);
  const { navigationDepth, setNavigationDepth } = useNavigationContext();
  const depthRef = useRef(navigationDepth);  // Add a ref to track depth
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

  // Update ref when navigationDepth changes
  useEffect(() => {
    depthRef.current = navigationDepth;
    console.log('Meeting Screen - Navigation Depth Changed:', navigationDepth);
  }, [navigationDepth]);

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

    // Add back handler
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    // Listen for navigation state changes
    const unsubscribe = navigation.addListener('state', (e) => {
      const routes = navigation.getState().routes;
      const currentIndex = routes.findIndex(r => r.name === 'Meeting');
      // No need to update depth here, as it's passed as a prop
    });

    // Cleanup
    return () => {
      subscription.remove();
      backHandler.remove();
      if (route.name === 'Meeting' && !navigation.isFocused()) {
        BackgroundService.stop();
      }
      unsubscribe();
    };
  }, [navigation, route.name, handleBackPress]);

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;

    if (url.includes('/hangup')) {
      BackgroundService.stop();
      navigation.pop(2);
    }
  };

  const handleBackPress = useCallback(() => {
    const currentDepth = depthRef.current;  // Use ref value
    console.log('Meeting Back Press - Current Depth:', currentDepth);
    
    if (navigation.canGoBack()) {
      if (currentDepth > 0) {
        const newDepth = currentDepth - 1;
        console.log('Meeting Back Press - New Depth:', newDepth);
        setNavigationDepth(newDepth);
        navigation.navigate('Next', {
          name: 'Test User',
          meetingLink
        });
      } else {
        navigation.goBack();
      }
      return true;
    }
    return false;
  }, [navigation, meetingLink, setNavigationDepth]);

  const handleNextScreen = () => {
    const currentDepth = depthRef.current;  // Use ref value
    const newDepth = currentDepth + 1;
    console.log('Meeting Next Screen - New Depth:', newDepth);
    setNavigationDepth(newDepth);
    navigation.push('Next', { 
      name: 'Test User',
      meetingLink
    });
  };
  
  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
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
    bottom: 20,
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