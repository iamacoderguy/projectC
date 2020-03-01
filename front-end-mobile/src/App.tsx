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
import DotsLoader from './components/DotsLoader';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView
        style={{ 
          flex: 1, 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: 'white', 
        }}>
        <Image source={images.ic_splash} />
        <DotsLoader style={{ marginTop: 20 }} width={100} dotNumber={4} />
      </SafeAreaView>
    </>
  );
};


export default App;
