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

import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import RootStack, { IRootStack } from './RootStack';
import { rootNavigationRef } from 'lib/utils/navigation';
import store from './store';

const App = () => {
  const rootStackRef = useRef<IRootStack>(null);

  useEffect(() => {
    SplashScreen.hide();

    let rootStackRefCurrent: IRootStack;
    if (rootStackRef && rootStackRef.current) {
      rootStackRefCurrent = rootStackRef.current;
      rootStackRefCurrent.start();
    }

    return function cleanup() {
      if (rootStackRefCurrent) {
        rootStackRefCurrent.finish();
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={rootNavigationRef}>
        <StatusBar barStyle='dark-content' />
        <RootStack ref={rootStackRef} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
