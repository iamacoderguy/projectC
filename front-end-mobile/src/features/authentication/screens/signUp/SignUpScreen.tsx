import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Layout from '../../components/layout/Layout';
import R from 'res/R';
import TextInput from 'res/components/textInput/TextInput';
import Button from 'res/components/button/Button';
import PasswordInputWithAction from 'features/authentication/components/passwordInputWithAction/PasswordInputWithAction';

const strings = R.strings.authentication.signUp;

const SignUpScreen = () => {
  const [isPasswordShown, showPassword] = useState(false);

  return (
    <Layout title={strings.title()}>
      <View style={styles.container}>
        <View style={styles.buzzSignUpContainer}>
          <TextInput placeholder={strings.usernamePlaceholder()} />
          <TextInput placeholder={strings.displayNamePlaceholder()} />
          <PasswordInputWithAction
            placeholder={strings.passwordPlaceholder()}
            isShown={isPasswordShown}
            onPress={() => showPassword(!isPasswordShown)} />
          <TextInput placeholder={strings.confirmPasswordPlaceholder()} />
        </View>
        {/* OR component */}
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
});

export default SignUpScreen;