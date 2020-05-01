import React, { useRef, useState } from 'react';
import R from 'res/R';
import Layout from '../../components/layout/Layout';
import { navigateToSignUpScreen } from './SignInScreen.container';
import TextInput, { TextInputRef } from 'res/components/textInput/TextInput';
import { Formik } from 'formik';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import SeparateLine from '../../components/separateLine/SeparateLine';
import Button from 'res/components/button/Button';
import PasswordInputWithAction from '../../components/passwordInputWithAction/PasswordInputWithAction';
import Hyperlink from 'res/components/hyperlink/Hyperlink';
import * as Yup from 'yup';
import { usernameValidation, passwordValidation } from '../../utils/yupValidation';
import { clearInputRefs, addInputRef, goNext } from '../../utils/inputRefs';

const strings = {
  signIn: R.strings.authentication.signIn,
  shared: R.strings.authentication.shared,
};
const dimens = R.dimens.authentication;

type SignInScreenProps = {
  onSignIn: (username: string, password: string) => void;
};

const SignInScreen: React.FC<SignInScreenProps> = (props: SignInScreenProps) => {
  const [isPasswordShown, showPassword] = useState(false);
  const inputRefs = useRef<Array<TextInputRef>>([]);
  const usernameId = 'username';
  const passwordId = 'password';

  const _handleOnShowPressed = () => {
    showPassword(!isPasswordShown);
    _handleOnLayoutChange();
  };

  const _handleOnLayoutChange = () => {
    clearInputRefs(inputRefs);
  };

  return (
    <Layout
      title={strings.signIn.title()}
      subtitleProps={{
        children: strings.signIn.dontHaveAnAccount(),
        links: ['https://gotoSignUpScreen'],
        onPress: (url, _text) => {
          if (url == 'https://gotoSignUpScreen') {
            navigateToSignUpScreen();
            return;
          }

          console.warn('Nani?!?');
        },
      }}
      onLayoutChange={_handleOnLayoutChange}
    >
      <Formik
        initialValues={{
          [usernameId]: '',
          [passwordId]: '',
        }}
        validationSchema={Yup.object({
          [usernameId]: usernameValidation(strings.shared.usernamePlaceholder()),
          [passwordId]: passwordValidation(strings.shared.passwordPlaceholder()),
        })}
        onSubmit={() => { }}
      >
        {
          ({ isSubmitting, isValid, handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <View style={styles.container}>
              <Image
                source={R.images.avatar_default}
                style={styles.avatar} />

              <View style={styles.socialSignUpContainer}>
                <Button
                  style={styles.socialButton}
                  title={strings.signIn.signInWithGithubButton()}
                  imageSource={R.images.ic_github}
                  disabled={isSubmitting}
                />
                <Button
                  style={styles.socialButton}
                  title={strings.signIn.signInWithGoogleButton()}
                  imageSource={R.images.ic_google}
                  disabled={isSubmitting}
                />
              </View>

              <SeparateLine style={styles.OR} />

              <View style={styles.buzzSignUpContainer}>
                <TextInput
                  id={usernameId}
                  ref={addInputRef(inputRefs)}
                  style={styles.textInput}
                  placeholder={strings.shared.usernamePlaceholder()}
                  autoCapitalize='none'
                  returnKeyType='next'
                  onSubmitEditing={goNext(inputRefs, usernameId)}
                  onChangeText={handleChange(usernameId)}
                  onBlur={handleBlur(usernameId)}
                  value={values[usernameId]}
                  error={{
                    isError: !!(touched[usernameId] && errors[usernameId]),
                    message: errors[usernameId],
                  }}
                />
                <PasswordInputWithAction
                  id={passwordId}
                  ref={addInputRef(inputRefs)}
                  style={styles.textInput}
                  placeholder={strings.shared.passwordPlaceholder()}
                  isShown={isPasswordShown}
                  onPress={_handleOnShowPressed}
                  returnKeyType='next'
                  onSubmitEditing={goNext(inputRefs, passwordId)}
                  onChangeText={handleChange(passwordId)}
                  onBlur={handleBlur(passwordId)}
                  value={values[passwordId]}
                  error={{
                    isError: !!(touched[passwordId] && errors[passwordId]),
                    message: errors[passwordId],
                  }}
                />

                <Hyperlink
                  style={styles.dontRememberPassword}
                  links={['https://gotoForgotPasswordScreen']}
                  disabled={isSubmitting}
                >
                  {strings.signIn.dontRememberPassword()}
                </Hyperlink>
                <Button
                  style={styles.signUpButton}
                  title={strings.signIn.signInButton()}
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                />
              </View>
            </View>
          )
        }
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: dimens.spacingBetweenForms,
  },
  buzzSignUpContainer: {
  },
  socialSignUpContainer: {
  },
  textInput: {
    marginBottom: dimens.spacingBetweenInputs,
  },
  dontRememberPassword: {
    ...R.palette.normal,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: dimens.spacingBetweenFormItems - dimens.spacingBetweenInputs,
    marginBottom: dimens.spacingBetweenFormItems,
  },
  OR: {
    marginTop: dimens.spacingBetweenForms - dimens.spacingBetweenFormItems,
    marginBottom: dimens.spacingBetweenForms,
  },
  signUpButton: {},
  socialButton: {
    marginBottom: dimens.spacingBetweenFormItems,
  },
});

export default SignInScreen;