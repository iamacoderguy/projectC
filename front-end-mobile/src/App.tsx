/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { LoadingScreen } from 'features/loading';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <LoadingScreen />
    </>
  );
};


export default App;
