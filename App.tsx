import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './ui/HomeScreen';
import DashboardScreen from './ui/DashboardScreen';
import MeetingScreen from './ui/MeetingScreen';
import NextScreen from './ui/NextScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Dashboard: { name: string };
  Meeting: { meetingLink: string };
  Next: { name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false,
          presentation: 'modal' // For smooth transitions
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
        />
        <Stack.Screen 
          name="Meeting" 
          component={MeetingScreen} 
          options={{
            animation: 'none',
            presentation: 'transparentModal',          
          }}
        /> 
        <Stack.Screen 
          name="Next" 
          component={NextScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;