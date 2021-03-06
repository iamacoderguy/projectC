import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import R from 'shared/res/R';
import Layout from '../../components/layout/Layout';
import TextInput, { TextInputRef } from 'shared/components/textInput/TextInput';
import { Formik } from 'formik';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import SeparateLine from '../../components/separateLine/SeparateLine';
import Button from 'shared/components/button/Button';
import PasswordInputWithAction from '../../components/passwordInputWithAction/PasswordInputWithAction';
import Hyperlink from 'shared/components/hyperlink/Hyperlink';
import * as Yup from 'yup';
import { usernameValidation, passwordValidation } from '../../utils/yupValidation';
import { clearInputRefs, addInputRef, goNext } from '../../utils/inputRefs';
import auth0, {
  SocialConnection,
} from '../../utils/auth0';
import {
  SignInScreenPropsForMapDispatch,
  mapDispatchToProps,
  mapStateToProps,
  SignInScreenPropsForMapState,
} from './SignInScreen.container';
import { connect } from 'react-redux';
import { isNullOrWhitespace } from 'shared/utils/string';
import MODULE_TAG from '../../constants/tag';
import toast from 'shared/utils/toast';

const TAG = `${MODULE_TAG} - SIGN_IN_SCREEN`;
const strings = {
  signIn: R.strings.authentication.signIn,
  shared: R.strings.authentication.shared,
};
const dimens = R.dimens.authentication;

type SignInScreenProps = SignInScreenPropsForMapDispatch & SignInScreenPropsForMapState;

const SignInScreen: React.FC<SignInScreenProps> = (props: SignInScreenProps) => {
  const [isPasswordShown, showPassword] = useState(false);
  const [picture, setPicture] = useState('');
  const inputRefs = useRef<Array<TextInputRef>>([]);
  const usernameId = 'username';
  const passwordId = 'password';
  const signUpScreenId = 'https://gotoSignUpScreen';
  const forgotPasswordScreenId = 'https://gotoForgotPasswordScreen';

  useEffect(() => {
    if (props.idToken) {
      const profile = auth0.getProfileFromToken(props.idToken);
      if (profile.picture) {
        setPicture(profile.picture);
      }
    }
  }, [props.idToken]);

  const _handleOnShowPressed = () => {
    showPassword(!isPasswordShown);
    _handleOnLayoutChange();
  };

  const _handleOnLayoutChange = () => {
    clearInputRefs(inputRefs);
  };

  const _handleOnHyperlinkLinkPress = (url: string, _text: string) => {
    switch (url) {
      case signUpScreenId:
        props.onSignUpLinkPress();
        return;

      case forgotPasswordScreenId:
        props.onForgotPasswordLinkPress();
        return;

      default:
        toast.warn(`${TAG} - Nani?!?`);
    }
  };

  const _handleOnSocialSignInButtonPress = async (connection: SocialConnection, setSubmitting: (isSubmitting: boolean) => void) => {
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

  return (
    <Layout
      title={strings.signIn.title()}
      subtitleProps={{
        children: strings.signIn.dontHaveAnAccount(),
        links: [signUpScreenId],
        onPress: _handleOnHyperlinkLinkPress,
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
        onSubmit={async (values, { setSubmitting }) => {
          await auth0.signInManual(values)
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
          ({ isSubmitting,
            isValid,
            setSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) =>
            (
              <View style={styles.container}>
                <Image
                  source={isNullOrWhitespace(picture) ? R.images.avatar_default : {
                    uri: picture,
                  }}
                  defaultSource={R.images.avatar_default}
                  style={styles.avatar} />

                <View style={styles.socialSignUpContainer}>
                  <Button
                    style={styles.socialButton}
                    title={strings.signIn.signInWithGithubButton()}
                    imageSource={R.images.ic_github}
                    onPress={() => _handleOnSocialSignInButtonPress('github', setSubmitting)}
                    disabled={isSubmitting}
                  />
                  <Button
                    style={styles.socialButton}
                    title={strings.signIn.signInWithGoogleButton()}
                    imageSource={R.images.ic_google}
                    onPress={() => _handleOnSocialSignInButtonPress('google-oauth2', setSubmitting)}
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
                    links={[forgotPasswordScreenId]}
                    onPress={_handleOnHyperlinkLinkPress}
                    disabled={isSubmitting}
                  >
                    {strings.signIn.dontRememberPassword()}
                  </Hyperlink>
                  <Button
                    style={styles.signInButton}
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
  signInButton: {},
  socialButton: {
    marginBottom: dimens.spacingBetweenFormItems,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);