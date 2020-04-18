import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Layout from '../views/Layout';
import R from 'res/R';

const strings = R.strings.authentication.signUp;

const SignUpScreen = () => {
  return (
    <Layout title={strings.title()}>
      <TextInput placeholder='Username' style={styles.textInput} />
      <TextInput placeholder='Display name' style={styles.textInput} />
      <TextInput placeholder='Password' style={styles.textInput} />
      <TextInput placeholder='Password' style={styles.textInput} />
      <TextInput placeholder='Password' style={styles.textInput} />
      <TextInput placeholder='Password' style={styles.textInput} />
      <TextInput placeholder='Password' style={styles.textInput} />
      <TextInput placeholder='Password-End' style={styles.textInput} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: R.colors.GREY,
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default SignUpScreen;