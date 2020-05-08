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

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import RootStack, { IRootStack } from './screens/rootStack/RootStack';
import { rootNavigationRef } from 'shared/utils/navigation';
import store from './redux/store';
import storeManager from './utils/storeManager';
import { toastRef } from 'shared/utils/toast';
import { Toast } from 'shared/components/toast';
import { ErrorBoundary } from 'features/helmet';

const App = () => {
  const rootStackRef = useRef<IRootStack>(null);

  useEffect(() => {
    SplashScreen.hide();

    let rootStackRefCurrent: IRootStack;
    if (rootStackRef && rootStackRef.current) {
      rootStackRefCurrent = rootStackRef.current;
      rootStackRefCurrent.start();
    }

    storeManager.setStore(store);

    return function cleanup() {
      if (rootStackRefCurrent) {
        rootStackRefCurrent.finish();
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NavigationContainer ref={rootNavigationRef}>
          <RootStack ref={rootStackRef} />
          <Toast ref={toastRef} />
        </NavigationContainer>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
