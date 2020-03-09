import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

const navigationMap = {
  Profile: 'Profile',
};

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={navigationMap.Profile}>
      <Stack.Screen name={navigationMap.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;