// HomeScreen.js
import React from 'react';
import { View, StyleSheet, Image ,Text,TextInput,ImageBackground,TouchableOpacity} from 'react-native';
import bg_image from '../assets/cisco_bg.jpeg'

const HomeScreen = ({ navigation }) => {
  const [name, onChangeName] = React.useState('');
  return (
    <ImageBackground source={bg_image} resizeMode="cover" style={styles.bg}>
      
    <View style={styles.container}>
    <View style={styles.box}>
      <Image
        source={require('../assets/wxsd.png')} // Local image reference
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Welcome to WXSD</Text>
      <View style={styles.fullWidthButton}>
      <TextInput
          style={styles.input}
          placeholder='Enter your name'
          placeholderTextColor="#A9A9A9" 
          onChangeText={onChangeName}
          value={name}
        />
      {/* <Button title="Start" style={styles.button} onPress={() => navigation.navigate('Dashboard',{name})} /> */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard',{name})} >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
      </View>
    </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor:'#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    padding:20,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 100, // Reduced width
    height: 100,
    marginBottom: 25,
  },
  fullWidthButton:{
    width:'80%',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30, // Adds spacing between the text and the button
  },
  input: {
    borderWidth: 1,
    margin:10,
    padding: 10,
  },
  button:{
    backgroundColor:'#0096FF',
    borderRadius: 20,
    height:40,
    padding:10,
    margin:5,
    justifyContent: 'center', // Center icon horizontally
    alignItems: 'center', 
  },
  buttonText:{
    color:'#ffffff',
    fontSize: 16,
    fontWeight: 'bold',

  },
});

export default HomeScreen;