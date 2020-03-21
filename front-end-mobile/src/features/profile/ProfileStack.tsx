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
  lng: string;
  onLanguageChanged: (lng: string) => void;

  theme: Theme;
  onThemeChanged: (theme: Theme) => void;
}

const ProfileStack: React.FC<ProfileStackProps> = (props: ProfileStackProps) => {
  return (
    <Stack.Navigator initialRouteName={navigationMap.Profile}>
      <Stack.Screen name={navigationMap.Profile} >
        {() =>
          <ProfileScreen
            theme={props.theme} onThemeChanged={props.onThemeChanged}
            lng={props.lng} onLanguageChanged={props.onLanguageChanged}
          />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;