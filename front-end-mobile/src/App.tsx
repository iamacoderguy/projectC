/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler'; // this line should be on the top

import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import RootStack from './navigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content' />
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
