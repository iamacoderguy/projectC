import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from './signIn';
import { SignUpScreen } from './signUp';
import { ForgotPasswordScreen } from './forgotPassword';

const Stack = createStackNavigator();

const navigationMap = {
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  ForgotPassword: 'ForgotPassword',
};

type AuthenticationStackProps = {
  onAuthenticated: (token: string) => void;
}

const AuthenticationStack: React.FC<AuthenticationStackProps> = (props: AuthenticationStackProps) => {
  const _handleOnSignedIn = (token: string) => {
    props.onAuthenticated(token);
  };

  return (
    <Stack.Navigator initialRouteName={navigationMap.SignIn}>
      <Stack.Screen name={navigationMap.SignIn}>
        {() => <SignInScreen onSignedIn={_handleOnSignedIn} />}
      </Stack.Screen>
      <Stack.Screen name={navigationMap.SignUp} component={SignUpScreen} />
      <Stack.Screen name={navigationMap.ForgotPassword} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;