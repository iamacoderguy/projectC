import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import Layout from '../../components/layout/Layout';
import R from 'res/R';
import TextInput from 'res/components/textInput/TextInput';
import Button from 'res/components/button/Button';
import PasswordInputWithAction from 'features/authentication/components/passwordInputWithAction/PasswordInputWithAction';

const strings = R.strings.authentication.signUp;
const dimens = R.dimens.authentication;

const SignUpScreen = () => {
  const [isPasswordShown, showPassword] = useState(false);

  return (
    <Layout title={strings.title()}>
      <View style={styles.container}>
        <View style={styles.buzzSignUpContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={strings.usernamePlaceholder()} />
          <TextInput
            style={styles.textInput}
            placeholder={strings.displayNamePlaceholder()} />
          <PasswordInputWithAction
            style={styles.textInput}
            placeholder={strings.passwordPlaceholder()}
            isShown={isPasswordShown}
            onPress={() => showPassword(!isPasswordShown)} />
          <TextInput
            style={styles.textInput}
            placeholder={strings.confirmPasswordPlaceholder()} />
          <Text style={styles.termsOfServiceText}>
            By clicking any of the Sign Up buttons, I agree to the terms of service
          </Text>
          <Button
            style={styles.signUpButton}
            title={strings.signUpButton()}
            onPress={() => { }} />
        </View>
        {/* OR component */}
        <View style={styles.OR}>

        </View>
        <View style={styles.socialSignUpContainer}>
          <Button onPress={() => { }} title='something' />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buzzSignUpContainer: {
  },
  socialSignUpContainer: {
  },
  textInput: {
    marginBottom: dimens.inputMargin,
  },
  termsOfServiceText: {
    ...R.palette.normal,
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: Platform.select({
      // it depends on action content and font size
      ios: 250,
      android: 240,
    }),
    marginTop: 20 - dimens.inputMargin,
    marginBottom: 20,
  },
  OR: {
    marginVertical: 35,
  },
  signUpButton: {},
});

export default SignUpScreen;