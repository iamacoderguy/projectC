import React from 'react';
import { Text, TextInput } from 'react-native';
import Layout from '../views/Layout';
import R from 'res/R';

const strings = R.strings.authentication.signUp;

const SignUpScreen = () => {
  return (
    <Layout title={strings.title()}>
      <TextInput placeholder='Username' style={{ borderColor: R.colors.GREY, borderWidth: 1 }} />
      <TextInput placeholder='Display name' style={{ borderColor: R.colors.GREY, borderWidth: 1 }} />
      <TextInput placeholder='Password' style={{ borderColor: R.colors.GREY, borderWidth: 1 }} />
    </Layout>
  );
};

export default SignUpScreen;