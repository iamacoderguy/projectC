import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import { Theme } from 'lib/types/theme';

const Stack = createStackNavigator();

const navigationMap = {
  Profile: 'Profile',
};

type ProfileStackProps = {
  // for output
  onThemeChanged: (theme: Theme) => void;
}

const ProfileStack: React.FC<ProfileStackProps> = (props: ProfileStackProps) => {
  return (
    <Stack.Navigator initialRouteName={navigationMap.Profile}>
      <Stack.Screen name={navigationMap.Profile} >
        {() => <ProfileScreen onThemeChanged={props.onThemeChanged} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;