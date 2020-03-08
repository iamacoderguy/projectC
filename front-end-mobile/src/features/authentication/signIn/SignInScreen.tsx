import React from 'react';
import { Text, Button } from 'react-native';
import R from 'res/R';

const strings = R.strings.authentication.signIn;

type SignInScreenProps = {
  onSignedIn: (token: string) => void;
};

const SignInScreen: React.FC<SignInScreenProps> = (props: SignInScreenProps) => {
  return (
    <>
      <Text>SignInScreen.tsx</Text>
      <Button title={strings.signInButtonTitle} onPress={() => props.onSignedIn('fake_token')} />
    </>
  );
};

export default SignInScreen;