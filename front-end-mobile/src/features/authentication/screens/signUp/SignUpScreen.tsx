import React, {
  useState,
  useRef,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Layout from '../../components/layout/Layout';
import R from 'shared/res/R';
import TextInput, {
  TextInputRef,
} from 'shared/components/textInput/TextInput';
import Button from 'shared/components/button/Button';
import PasswordInputWithAction from '../../components/passwordInputWithAction/PasswordInputWithAction';
import SeparateLine from '../../components/separateLine/SeparateLine';
import Hyperlink from 'shared/components/hyperlink/Hyperlink';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { usernameValidation, passwordValidation, emailValidation } from '../../utils/yupValidation';
import { clearInputRefs, addInputRef, goNext } from '../../utils/inputRefs';
import auth0, {
  SocialConnection,
} from '../../utils/auth0';
import { SignUpScreenPropsForMapDispatch, mapDispatchToProps } from './SignUpScreen.container';
import { connect } from 'react-redux';
import MODULE_TAG from '../../constants/tag';
import toast from 'shared/utils/toast';

const TAG = `${MODULE_TAG} - SIGN_UP_SCREEN`;
const strings = {
  signUp: R.strings.authentication.signUp,
  shared: R.strings.authentication.shared,
};
const dimens = R.dimens.authentication;

type SignUpScreenProps = SignUpScreenPropsForMapDispatch;

const SignUpScreen: React.FC<SignUpScreenProps> = (props: SignUpScreenProps) => {
  const [isPasswordShown, showPassword] = useState(false);
  const inputRefs = useRef<Array<TextInputRef>>([]);
  const usernameId = 'username';
  const emailId = 'email';
  const displayNameId = 'displayName';
  const passwordId = 'password';
  const confirmPasswordId = 'confirmPassword';
  const signInScreenId = 'https://gotoLoginScreen';

  const _handleOnShowPress = () => {
    showPassword(!isPasswordShown);
    _handleOnLayoutChange();
  };

  const _handleOnLayoutChange = () => {
    clearInputRefs(inputRefs);
  };

  const _handleOnSocialButtonPress = async (connection: SocialConnection, setSubmitting: (isSubmitting: boolean) => void) => {
    setSubmitting(true);

    await auth0.signUpOrSignInWithSocialConnection(connection)
      .then(credentials => {
        props.onAuthenticated(credentials);
      })
      .catch(error => {
        toast.warn(`${TAG} - ${error}`);
      });

    setSubmitting(false);
  };

  const _handleOnSignInScreenLinkPress = (url: string, _text: string) => {
    if (url == signInScreenId) {
      props.onSignInLinkPress();
      return;
    }

    toast.warn(`${TAG} - Nani?!?`);
  };

  return (
    <Layout
      title={strings.signUp.title()}
      subtitleProps={{
        children: strings.signUp.alreadyHaveAnAccount(),
        links: [signInScreenId],
        onPress: _handleOnSignInScreenLinkPress,
      }}
      onLayoutChange={_handleOnLayoutChange}
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
          [emailId]: emailValidation(strings.shared.emailPlaceholder()),
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

          await auth0.signUpManual(values)
            .then(_success => auth0.signInManual({
              username: values[usernameId],
              password: values[passwordId],
            }))
            .then(credentials => {
              props.onAuthenticated(credentials);
            })
            .catch(error => {
              toast.warn(`${TAG} - ${error}`);
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
                  <TextInput
                    id={emailId}
                    ref={addInputRef(inputRefs)}
                    style={styles.textInput}
                    placeholder={strings.shared.emailPlaceholder()}
                    keyboardType='email-address'
                    returnKeyType='next'
                    onSubmitEditing={goNext(inputRefs, emailId)}
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
                    ref={addInputRef(inputRefs)}
                    style={styles.textInput}
                    placeholder={strings.shared.displayNamePlaceholder()}
                    autoCapitalize='words'
                    returnKeyType='next'
                    onSubmitEditing={goNext(inputRefs, displayNameId)}
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
                    ref={addInputRef(inputRefs)}
                    style={styles.textInput}
                    placeholder={strings.shared.passwordPlaceholder()}
                    isShown={isPasswordShown}
                    onPress={_handleOnShowPress}
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
                  {!isPasswordShown &&
                    <TextInput
                      id={confirmPasswordId}
                      ref={addInputRef(inputRefs)}
                      style={styles.textInput}
                      placeholder={strings.shared.confirmPasswordPlaceholder()}
                      secureTextEntry
                      returnKeyType='next'
                      onSubmitEditing={goNext(inputRefs, confirmPasswordId)}
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
                    onPress={() => _handleOnSocialButtonPress('github', setSubmitting)}
                    disabled={isSubmitting}
                  />
                  <Button
                    style={styles.socialButton}
                    title={strings.signUp.signUpWithGoogleButton()}
                    imageSource={R.images.ic_google}
                    onPress={() => _handleOnSocialButtonPress('google-oauth2', setSubmitting)}
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

export default connect(null, mapDispatchToProps)(SignUpScreen);