import React, {
  useState,
  useRef,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Layout from '../../components/layout/Layout';
import R from 'res/R';
import TextInput, {
  TextInputRef,
} from 'res/components/textInput/TextInput';
import Button from 'res/components/button/Button';
import PasswordInputWithAction from '../../components/passwordInputWithAction/PasswordInputWithAction';
import SeparateLine from '../../components/separateLine/SeparateLine';
import Hyperlink from 'res/components/hyperlink/Hyperlink';
import { findNextIndex, clean, contain } from 'lib/utils/array';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Auth0 from 'react-native-auth0';
import { User } from 'lib/types/user';
import { navigateToSignInScreen } from './SignUpScreen.container';
import { usernameValidation, passwordValidation } from '../../yupValidation';

const strings = {
  signUp: R.strings.authentication.signUp,
  shared: R.strings.authentication.shared,
};
const dimens = R.dimens.authentication;
const auth0 = new Auth0(R.config.AUTH0.credentials);

const SignUpScreen = () => {
  const [isPasswordShown, showPassword] = useState(false);
  const inputRefs = useRef<Array<TextInputRef>>([]);
  const usernameId = 'username';
  const emailId = 'email';
  const displayNameId = 'displayName';
  const passwordId = 'password';
  const confirmPasswordId = 'confirmPassword';
  const currentPredicate = (currentId: string | undefined) => (txtInpt: TextInputRef) => txtInpt.id() == currentId;

  const _addInputRef = (ref: TextInputRef | null) => {
    if (ref && !contain(inputRefs.current, currentPredicate(ref.id()))) {
      inputRefs.current.push(ref);
    }
  };

  const _clearInputRefs = () => {
    clean(inputRefs.current);
  };

  const _goNext = (currentId: string) => () => {
    const nextIndex = findNextIndex(inputRefs.current, currentPredicate(currentId));
    if (nextIndex != -1) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const _handleOnShowPressed = () => {
    showPassword(!isPasswordShown);
    _handleOnLayoutChange();
  };

  const _handleOnLayoutChange = () => {
    _clearInputRefs();
  };

  const _createUser = async (user: User) => {
    await auth0.auth
      .createUser({
        username: user.username,
        email: user.email,
        password: user.password,
        connection: R.config.AUTH0.connections.database,
        metadata: { displayName: user.displayName },
      })
      .then(success => {
        console.warn(success);
      })
      .catch(error => {
        console.warn(error.json.description);
      });
  };

  const _webAuth = async (connection: string, setSubmitting: (isSubmitting: boolean) => void) => {
    setSubmitting(true);
    await auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        connection: connection,
        audience: 'https://' + R.config.AUTH0.credentials.domain + '/userinfo',
      })
      .then(credentials => {
        console.warn(credentials);
      })
      .catch(error => {
        console.warn(error.error_description);
      });
    setSubmitting(false);
  };

  return (
    <Layout
      title={strings.signUp.title()}
      subtitleProps={{
        children: strings.signUp.alreadyHaveAnAccount(),
        links: ['https://gotoLoginScreen'],
        onPress: (url, _text) => {
          if (url == 'https://gotoLoginScreen') {
            navigateToSignInScreen();
            return;
          }

          console.warn('Nani?!?');
        },
      }}
      onLayoutChange={_handleOnLayoutChange}
      keyboardVerticalOffset={R.dimens.inputHeight - R.dimens.inputPadding}
    >
      <Formik
        initialValues={{
          [usernameId]: '',
          [emailId]: '',
          [displayNameId]: '',
          [passwordId]: '',
          [confirmPasswordId]: '',
        }}
        validationSchema={Yup.object({
          [usernameId]: usernameValidation(strings.shared.usernamePlaceholder()),
          [emailId]: Yup.string()
            .email(strings.shared.validationMessageEmail(strings.shared.emailPlaceholder()))
            .required(strings.shared.validationMessageRequired(strings.shared.emailPlaceholder())),
          [displayNameId]: Yup.string()
            .max(128, strings.shared.validationMessageMaxLength(strings.shared.displayNamePlaceholder(), 128)),
          [passwordId]: passwordValidation(strings.shared.passwordPlaceholder()),
          [confirmPasswordId]: passwordValidation(strings.shared.confirmPasswordPlaceholder()),
        })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          if (!isPasswordShown && values[passwordId] != values[confirmPasswordId]) {
            setErrors({
              confirmPassword: strings.shared.validationMessageDoesNotMatch(strings.shared.confirmPasswordPlaceholder()),
            });

            setSubmitting(false);
            return;
          }

          await _createUser({
            username: values[usernameId],
            email: values[emailId],
            displayName: values[displayNameId],
            password: values[passwordId],
          });
          setSubmitting(false);
        }}
      >
        {
          ({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isSubmitting,
            isValid,
            setSubmitting,
          }) =>
            (
              <View style={styles.container}>
                <View style={styles.buzzSignUpContainer}>
                  <TextInput
                    id={usernameId}
                    ref={_addInputRef}
                    style={styles.textInput}
                    placeholder={strings.shared.usernamePlaceholder()}
                    autoCapitalize='none'
                    returnKeyType='next'
                    onSubmitEditing={_goNext(usernameId)}
                    onChangeText={handleChange(usernameId)}
                    onBlur={handleBlur(usernameId)}
                    value={values[usernameId]}
                    error={{
                      isError: !!(touched[usernameId] && errors[usernameId]),
                      message: errors[usernameId],
                    }}
                  />
                  <TextInput
                    id={emailId}
                    ref={_addInputRef}
                    style={styles.textInput}
                    placeholder={strings.shared.emailPlaceholder()}
                    keyboardType='email-address'
                    returnKeyType='next'
                    onSubmitEditing={_goNext(emailId)}
                    onChangeText={handleChange(emailId)}
                    onBlur={handleBlur(emailId)}
                    value={values[emailId]}
                    error={{
                      isError: !!(touched[emailId] && errors[emailId]),
                      message: errors[emailId],
                    }}
                  />
                  <TextInput
                    id={displayNameId}
                    ref={_addInputRef}
                    style={styles.textInput}
                    placeholder={strings.shared.displayNamePlaceholder()}
                    autoCapitalize='words'
                    returnKeyType='next'
                    onSubmitEditing={_goNext(displayNameId)}
                    onChangeText={handleChange(displayNameId)}
                    onBlur={handleBlur(displayNameId)}
                    value={values[displayNameId]}
                    error={{
                      isError: !!(touched[displayNameId] && errors[displayNameId]),
                      message: errors[displayNameId],
                    }}
                  />
                  <PasswordInputWithAction
                    id={passwordId}
                    ref={_addInputRef}
                    style={styles.textInput}
                    placeholder={strings.shared.passwordPlaceholder()}
                    isShown={isPasswordShown}
                    onPress={_handleOnShowPressed}
                    returnKeyType='next'
                    onSubmitEditing={_goNext(passwordId)}
                    onChangeText={handleChange(passwordId)}
                    onBlur={handleBlur(passwordId)}
                    value={values[passwordId]}
                    error={{
                      isError: !!(touched[passwordId] && errors[passwordId]),
                      message: errors[passwordId],
                    }}
                  />
                  {!isPasswordShown &&
                    <TextInput
                      id={confirmPasswordId}
                      ref={_addInputRef}
                      style={styles.textInput}
                      placeholder={strings.shared.confirmPasswordPlaceholder()}
                      secureTextEntry
                      returnKeyType='next'
                      onSubmitEditing={_goNext(confirmPasswordId)}
                      onChangeText={handleChange(confirmPasswordId)}
                      onBlur={handleBlur(confirmPasswordId)}
                      value={values[confirmPasswordId]}
                      error={{
                        isError: !!(touched[confirmPasswordId] && errors[confirmPasswordId]),
                        message: errors[confirmPasswordId],
                      }}
                    />}
                  <Hyperlink
                    style={styles.termsOfService}
                    links={[strings.signUp.termsOfServiceLink()]}
                    disabled={isSubmitting}
                  >
                    {strings.signUp.agreeWithTermsOfService()}
                  </Hyperlink>
                  <Button
                    style={styles.signUpButton}
                    title={strings.signUp.signUpButton()}
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                  />
                </View>

                <SeparateLine style={styles.OR} />

                <View style={styles.socialSignUpContainer}>
                  <Button
                    style={styles.socialButton}
                    title={strings.signUp.signUpWithGithubButton()}
                    imageSource={R.images.ic_github}
                    onPress={() => _webAuth('github', setSubmitting)}
                    disabled={isSubmitting}
                  />
                  <Button
                    style={styles.socialButton}
                    title={strings.signUp.signUpWithGoogleButton()}
                    imageSource={R.images.ic_google}
                    onPress={() => _webAuth('google-oauth2', setSubmitting)}
                    disabled={isSubmitting}
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
  buzzSignUpContainer: {
  },
  socialSignUpContainer: {
  },
  textInput: {
    marginBottom: dimens.spacingBetweenInputs,
  },
  termsOfService: {
    ...R.palette.normal,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: dimens.spacingBetweenFormItems - dimens.spacingBetweenInputs,
    marginBottom: dimens.spacingBetweenFormItems,
  },
  OR: {
    marginTop: dimens.spacingBetweenForms,
    marginBottom: dimens.spacingBetweenForms - dimens.spacingBetweenFormItems,
  },
  signUpButton: {},
  socialButton: {
    marginTop: dimens.spacingBetweenFormItems,
  },
});

export default SignUpScreen;