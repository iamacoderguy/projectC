import React from 'react';
import { Text, Button } from 'react-native';
import R from 'res/R';

const strings = R.strings.authentication.signIn;

type SignInScreenProps = {
  onSignIn: (username: string, password: string) => void;
};

const SignInScreen: React.FC<SignInScreenProps> = (props: SignInScreenProps) => {
  return (
    <>
      <Text>SignInScreen.tsx</Text>
      <Button title={strings.signInButtonTitle()} onPress={() => props.onSignIn('fake_username', 'fake_password')} />
    </>
  );
};

export default SignInScreen;