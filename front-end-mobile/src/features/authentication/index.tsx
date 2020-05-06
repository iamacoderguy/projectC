import React, {
  useEffect,
} from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import { initialize } from './redux/actions';
import { createStackNavigator } from '@react-navigation/stack';
import navigationMap from './constants/navigationMap';
import SignInScreen from './screens/signIn/SignInScreen';
import SignUpScreen from './screens/signUp/SignUpScreen';
import SignOutScreen from './screens/signOut/SignOutScreen';
import ForgotPasswordScreen from './screens/forgotPassword/ForgotPasswordScreen';
import { AuthProps } from './types/authProps';
import LoadingScreen from 'shared/components/loading/LoadingScreen';
import storeManager from './utils/storeManager';
import CheckEmailScreen from './screens/checkEmail/CheckEmailScreen';

const Stack = createStackNavigator();

export const Authentication: React.FC<AuthProps> = (props: AuthProps) => {
  useEffect(() => {
    storeManager.setStore(store);
    store.dispatch(initialize(props));
  }, [props]);

  return (
    <Provider store={store}>
      <Stack.Navigator
        initialRouteName={navigationMap.Loading}
        screenOptions={{
          headerShown: false, // Note: Even the header is not shown, we can get back by the physical back button
          animationEnabled: false,
        }}
      >
        <Stack.Screen name={navigationMap.Loading} component={LoadingScreen} />
        <Stack.Screen name={navigationMap.SignIn} component={SignInScreen} />
        <Stack.Screen name={navigationMap.SignUp} component={SignUpScreen} />
        <Stack.Screen name={navigationMap.SignOut} component={SignOutScreen} />
        <Stack.Screen name={navigationMap.ForgotPassword} component={ForgotPasswordScreen} />
        <Stack.Screen name={navigationMap.CheckEmail} component={CheckEmailScreen} />
      </Stack.Navigator>
    </Provider>
  );
};

export { jwtErrorHandler } from './utils/jwtErrorHandler';
export { default as auth0 } from './utils/auth0';
export { default as TestLayout } from './components/testLayout/TestLayout';