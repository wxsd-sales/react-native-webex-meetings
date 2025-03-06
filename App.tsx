import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './ui/HomeScreen';
import DashboardScreen from './ui/DashboardScreen';
import MeetingScreen from './ui/MeetingScreen';
import NextScreen from './ui/NextScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProvider } from './context/NavigationContext';

export type RootStackParamList = {
  Home: undefined;
  Dashboard: { name: string };
  Meeting: { meetingLink: string; depth?: number };
  Next: { name: string; meetingLink: string; depth?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false,
            presentation: 'card',
            animation: 'fade',
          }}
        >
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
              detachPreviousScreen: false,
              animationDuration: 0
            }}
          /> 
          <Stack.Screen 
            name="Next" 
            component={NextScreen}
            options={{
              animation: 'fade',
              presentation: 'card',
              detachPreviousScreen: false,
              animationDuration: 150,
              animationTypeForReplace: 'pop'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationProvider>
  );
};

export default App;