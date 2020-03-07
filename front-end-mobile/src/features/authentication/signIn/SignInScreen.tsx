import React from 'react';
import { Text, Button } from 'react-native';

type SignInScreenProps = {
  onSignedIn: (token: string) => void;
};

const SignInScreen: React.FC<SignInScreenProps> = (props: SignInScreenProps) => {
  return (
    <>
      <Text>SignInScreen.tsx</Text>
      <Button title='Sign In' onPress={() => props.onSignedIn('fake_token')}/>
    </>
  );
};

export default SignInScreen;