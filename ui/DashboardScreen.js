// DashboardScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ActivityIndicator, ImageBackground } from 'react-native';
import Config from 'react-native-config';
import axios from 'axios';
import image from '../assets/cisco_bg.jpeg';
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

const DashboardScreen = async ({ navigation, route }) => {
  const { name } = route.params;
  const [loading, setLoading] = useState(false);

  const handleOpenMeeting = (language) => {
    setLoading(true);
    const guid = uuidv4();

    const taskApiBody = {
      name: name,
      guid: guid,
      language: language,
    }


    //send rquest to server to send task routing API
    axios.post(`${Config.SERVER_URL}/task-routing`, taskApiBody, {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      rejectUnauthorized: false,
      requestCert: false,
      agent: false,
    }).then((r) => {
      var meetingLink = r.data
      console.log("task routing success", meetingLink)
      setLoading(false);
      navigation.navigate('Meeting', { meetingLink });
    })
      .catch(error => {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.log('Response Error:', error.response);
        } else if (error.request) {
          // No response was received
          console.log('Request Error:', error.request);
        } else {
          // Error in setting up the request
          console.log('General Error:', error.message);
        }
      });

  }


  return (

    <ImageBackground source={image} resizeMode="cover" style={styles.image}>

      <View style={styles.container}>

        <View style={styles.box}>
          <Text style={styles.welcomeText}>Welcome {name}!</Text>
          <Text style={{ padding: 20 }}>Please choose your language / Por favor elige tu idioma</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleOpenMeeting("English")}>
              <Text style={styles.buttonText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleOpenMeeting("Espanol")}>
              <Text style={styles.buttonText}>Español</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {loading && (
        <View>
          <ActivityIndicator
            size="large"
            color="#0078D7"
          />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  box: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,

  },
  buttonContainer: {
    flexDirection: "row",
    padding: 20
  },
  welcomeText: {
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10, // Adds spacing between the text and the button
  },
  text: {
    padding: 20,
    fontSize: 22,
    color: '#333',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  logout: {
    position: 'absolute',
    top: 10, // Adjust as needed
    right: 10, // Adjust as needed
    backgroundColor: '#ffffff',
    width: 40, // Diameter of the circle
    height: 40, // Diameter of the circle
    borderRadius: 25, // Half of the width/height to make it circular
    justifyContent: 'center', // Center icon horizontally
    alignItems: 'center', // Center icon vertically
  },
  button: {
    backgroundColor: '#0096FF',
    width: '50%',
    borderRadius: 20,
    height: 40,
    padding: 10,
    margin: 5,
    justifyContent: 'center', // Center icon horizontally
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',

  },
  icon: {
    width: 40, // Set the desired width of the icon
    height: 40, // Set the desired height of the icon
  },
  input: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '60%',
  },
});

export default DashboardScreen;