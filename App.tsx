import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './ui/HomeScreen';
import DashboardScreen from './ui/DashboardScreen';
import MeetingScreen from './ui/MeetingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Meeting" component={MeetingScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;