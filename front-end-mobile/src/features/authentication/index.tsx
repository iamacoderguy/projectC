import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import { setMode, setRefreshToken } from './redux/actions';
import { Unsubscribe } from 'redux';
import tag from './constants/tag';
import { createStackNavigator } from '@react-navigation/stack';
import navigationMap from './constants/navigationMap';
import SignInScreen from './screens/signIn/SignInScreen';
import SignUpScreen from './screens/signUp/SignUpScreen';
import SignOutScreen from './screens/signOut/SignOutScreen';
import ForgotPasswordScreen from './screens/forgotPassword/ForgotPasswordScreen';

const Stack = createStackNavigator();

type AuthProps = {
  onAuthenticated: (accessToken: string, refreshToken?: string) => void;
  refreshToken?: string;
  testMode?: boolean;
}

export const Authentication: React.FC<AuthProps> = ({
  onAuthenticated,
  refreshToken,
  testMode,
}: AuthProps) => {
  useEffect(() => {
    store.dispatch(setMode(!!testMode));

    let unsubscribe: Unsubscribe | undefined = undefined;
    if (!testMode) {
      console.log(`${tag} store.subscribe()`);
      unsubscribe = store.subscribe(() => {
        // TODO: check condition if the accessToken and refreshToken are the new ones
        const currentState = store.getState();
        if (currentState.accessToken) {
          onAuthenticated(currentState.accessToken, currentState.refreshToken);
        }
      });
    }

    return function cleanup() {
      if (unsubscribe) {
        console.log(`${tag} unsubscribe()`);
        unsubscribe();
      }
    };

  }, [onAuthenticated, testMode]);

  useEffect(() => {
    store.dispatch(setRefreshToken(refreshToken));
  }, [refreshToken]);

  return (
    <Provider store={store}>
      <Stack.Navigator
        initialRouteName={navigationMap.SignOut}
        screenOptions={{ headerShown: false }} // Note: Even the header is not shown, we can get back by the physical back button
      >
        <Stack.Screen name={navigationMap.SignIn} component={SignInScreen} />
        <Stack.Screen name={navigationMap.SignUp} component={SignUpScreen} />
        <Stack.Screen name={navigationMap.SignOut} component={SignOutScreen} />
        <Stack.Screen name={navigationMap.ForgotPassword} component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </Provider>
  );
};