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
import SeparateLine from 'features/authentication/components/separateLine/SeparateLine';

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

        <SeparateLine style={styles.OR} />

        <View style={styles.socialSignUpContainer}>
          <Button
            style={styles.socialButton}
            title='Sign up with GitHub'
            imageSource={R.images.ic_github}
            onPress={() => { }} />
          <Button
            style={styles.socialButton}
            title='Sign up with Google'
            imageSource={R.images.ic_google}
            onPress={() => { }} />
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
    marginTop: dimens.itemMargin - dimens.inputMargin,
    marginBottom: dimens.itemMargin,
  },
  OR: {
    marginTop: dimens.separateLineMargin,
    marginBottom: dimens.separateLineMargin - dimens.itemMargin,
  },
  signUpButton: {},
  socialButton: {
    marginTop: dimens.itemMargin,
  },
});

export default SignUpScreen;