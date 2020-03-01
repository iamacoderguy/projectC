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
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import images from './assets/images';


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Image source={images.ic_splash} />
      </SafeAreaView>
    </>
  );
};


export default App;
