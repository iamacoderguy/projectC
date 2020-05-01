import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './AuthenticationStack.container';
import SignInScreen from './screens/signIn/SignInScreen';
import SignUpScreen from './screens/signUp/SignUpScreen';
import ForgotPasswordScreen from './screens/forgotPassword/ForgotPasswordScreen';
import navigationMap from './navigationMap';

const Stack = createStackNavigator();

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
    <Stack.Navigator
      initialRouteName={navigationMap.SignIn}
      screenOptions={{ headerShown: false }} // Note: Even the header is not shown, we can get back by the physical back button
    >
      <Stack.Screen name={navigationMap.SignIn} >
        {() => <SignInScreen onSignIn={_handleOnSignIn} />}
      </Stack.Screen>
      <Stack.Screen name={navigationMap.SignUp} component={SignUpScreen} />
      <Stack.Screen name={navigationMap.ForgotPassword} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationStack);