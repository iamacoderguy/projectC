import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from './signIn';
import { SignUpScreen } from './signUp';
import { ForgotPasswordScreen } from './forgotPassword';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './AuthenticationStack.container';

const Stack = createStackNavigator();

const navigationMap = {
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  ForgotPassword: 'ForgotPassword',
};

export type AuthenticationStackPropsForMapState = {
  token?: string;
}
export type AuthenticationStackPropsForMapDispatch = {
  onAuthenticating?: (username: string, password: string) => void;
}
type AuthenticationStackPropsForContainer = AuthenticationStackPropsForMapState & AuthenticationStackPropsForMapDispatch;

type AuthenticationStackPropsForOutput = {
  onAuthenticated: (token: string) => void;
}

type AuthenticationStackProps = AuthenticationStackPropsForContainer & AuthenticationStackPropsForOutput;

const AuthenticationStack: React.FC<AuthenticationStackProps> = (props: AuthenticationStackProps) => {
  useEffect(() => {
    if (props.token && props.token !== '') {
      props.onAuthenticated(props.token);
    }
  });

  const _handleOnSignIn = (username: string, password: string) => {
    if (props.onAuthenticating) {
      props.onAuthenticating(username, password);
    }
  };

  return (
    <Stack.Navigator initialRouteName={navigationMap.SignIn}>
      <Stack.Screen name={navigationMap.SignIn} >
        {() => <SignInScreen onSignIn={_handleOnSignIn} />}
      </Stack.Screen>
      <Stack.Screen name={navigationMap.SignUp} component={SignUpScreen} />
      <Stack.Screen name={navigationMap.ForgotPassword} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationStack);