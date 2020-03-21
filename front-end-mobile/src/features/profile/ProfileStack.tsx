import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen, { ProfileScreenPropsForOutput } from './ProfileScreen';

const Stack = createStackNavigator();

const navigationMap = {
  Profile: 'Profile',
};

export type ProfileStackPropsForOutput = ProfileScreenPropsForOutput & {}

type ProfileStackProps = ProfileStackPropsForOutput & {}

const ProfileStack: React.FC<ProfileStackProps> = (props: ProfileStackProps) => {
  return (
    <Stack.Navigator initialRouteName={navigationMap.Profile}>
      <Stack.Screen name={navigationMap.Profile} >
        {() => <ProfileScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;