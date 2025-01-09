// MeetingScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { WebView } from 'react-native-webview';

const MeetingScreen = ({navigation , route }) => {
  const { accessToken,joinLink } = route.params;
  const [loading, setLoading] = useState(false);
  console.log("joinLink",joinLink)
  const meetingUrl = `${Config.SERVER_URL}/?access_token=${accessToken}&destination=${joinLink}&site=client`;

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;

    if (url.includes('/hangup')) {
        // Pass the token to the DashboardScreen
        navigation.pop(2);
    }
  };
  
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: meetingUrl }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        startInLoadingState
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {/* {loading && (
        <ActivityIndicator
          size="large"
          color="#0078D7"
          style={styles.loadingIndicator}
        />
      )} */}
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
});

export default MeetingScreen;