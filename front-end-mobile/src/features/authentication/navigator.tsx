import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from './signIn';
import { SignUpScreen } from './signUp';
import { ForgotPasswordScreen } from './forgotPassword';

type StackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
const Stack = createStackNavigator<StackParamList>();

export const stackMap = {
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
    <Stack.Navigator initialRouteName={stackMap.SignIn}>
      <Stack.Screen name={stackMap.SignIn}>
        {() => <SignInScreen onSignedIn={_handleOnSignedIn} />}
      </Stack.Screen>
      <Stack.Screen name={stackMap.SignUp} component={SignUpScreen} />
      <Stack.Screen name={stackMap.ForgotPassword} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;