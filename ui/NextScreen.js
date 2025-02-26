// DashboardScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ActivityIndicator, ImageBackground } from 'react-native';
import Config from 'react-native-config';
import axios from 'axios';
import image from '../assets/cisco_bg.jpeg';
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

const NextScreen = ({ navigation, route }) => {
  const { name } = route.params;
  const [loading, setLoading] = useState(false);

  return (
    <Text>Hello</Text>
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

export default NextScreen;