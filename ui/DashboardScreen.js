// DashboardScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image , Text, ActivityIndicator,ImageBackground} from 'react-native';
import Config from 'react-native-config';
import axios from 'axios';
import image from '../assets/cisco_bg.jpeg';

const DashboardScreen = async({ navigation, route }) => {
  const { name } = route.params;
  const [loading, setLoading] = useState(false);

  const getAccessToken=async ()=>{
    let data = {
      'grant_type': 'refresh_token',
      'refresh_token': Config.REFRESH_TOKEN,
      'client_id': Config.CLIENT_ID,
      'client_secret': Config.CLIENT_SECRET 
    };

    let config = {
      method: 'post',
      url: 'https://webexapis.com/v1/access_token',
      headers: { 
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

     return axios.request(config)
    .then((response) => {
      var redata = JSON.stringify(response.data);
      console.log(redata)
      console.log(response.data.access_token)
      return response.data.access_token;
    })
    .catch((error) => {
      console.log(error);
    });

  }

  const handleOpenMeeting = async () => {
    setLoading(true);
      // Your code here
      
    const accessToken  = await getAccessToken();
    // setTimeout(async() => {
    console.log("Access token",accessToken)
  const currentDateTime = new Date().toISOString();
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 1);
  const futureDateTime = currentDate.toISOString();
  const payload = {
    title: "Webex Meeting",
    start: currentDateTime,
    end: futureDateTime,
  };
  console.log("start time",currentDateTime);
  console.log("end time", futureDateTime);
  
      await axios.post(`${Config.WEBEX_URL}/meetings`, payload, { //create a meeting
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${accessToken}`
        }
      }).then(async (r)=>{
        console.log("resp",r.data.id);
        const linkdata = {
          meetingId: r.data.id,
          createJoinLinkAsWebLink: true,
          createStartLinkAsWebLink: true,
          joinDirectly: false,
        };
        
        axios.post(`${Config.WEBEX_URL}/meetings/join`, linkdata,{ //create join and start links
          headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${accessToken}`,
          }
        }).then((linkr)=>{
          console.log("link data",linkr.data);
          const joinLink=linkr.data.joinLink;
          const startLink=linkr.data.startLink;
          const taskApiBody={
            access_token: accessToken,
            destination: startLink
          }
          navigation.navigate('Meeting', { accessToken,joinLink });


          //send rquest to server to send task routing API
  //      axios.post(`${Config.SERVER_URL}/task-routing`,taskApiBody,{
  //       mode: 'no-cors',
  //         headers: {
  //         'Content-Type': 'application/json',
  //         },
  //         rejectUnauthorized: false,
  //  requestCert: false,
  //  agent: false,
  //       }).then((r)=>{
  //         console.log("task routing success",r)
  //         setLoading(false);
  //         navigation.navigate('Meeting', { accessToken,joinLink });
  //       })
  //       .catch(error => {
  //         if (error.response) {
  //           // Server responded with a status other than 2xx
  //           console.log('Response Error:', error.response);
  //         } else if (error.request) {
  //           // No response was received
  //           console.log('Request Error:', error.request);
  //         } else {
  //           // Error in setting up the request
  //           console.log('General Error:', error.message);
  //         }
  //       });



          
        })
        .catch((e)=>{
          console.log("Error generating join links",e);
          })
          
      })
      .catch((error) => {
        console.log("Error creating meeting",error);
      });
    //   console.log('This is executed after 1 second');
    // }, 2000);
    
  }


  return (
    
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      
    <View style={styles.container}>
      
      <View style={styles.box}>
      <Text style={styles.welcomeText}>Welcome {name}!</Text>
      <Text style={{padding:20}}>Please choose your language / Por favor elige tu idioma</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOpenMeeting}>
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleOpenMeeting}>
            <Text style={styles.buttonText}>Español</Text>
          </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={styles.logout} onPress={handleLogout}>
      <Image
          source={require('../assets/logout.png')} // Adjust path to your PNG file
          style={styles.icon}
        />
      </TouchableOpacity> */}
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
    marginLeft:15,
    marginRight:15,
  },
  box: {
    backgroundColor:'#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    
  },
  buttonContainer:{
    flexDirection:"row",
    padding:20
  },
  welcomeText: {
    padding:20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10, // Adds spacing between the text and the button
  },
  text:{
    padding:20,
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
  button:{
    backgroundColor:'#0096FF',
    width:'50%',
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
  icon: {
    width: 40, // Set the desired width of the icon
    height: 40, // Set the desired height of the icon
  },
  input: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:'60%',
  },
});

export default DashboardScreen;