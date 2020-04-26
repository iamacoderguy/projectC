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
import PasswordInputWithAction from 'features/authentication/components/passwordInputWithAction/PasswordInputWithAction';
import SeparateLine from 'features/authentication/components/separateLine/SeparateLine';
import Hyperlink from 'res/components/hyperlink';
import { findNextIndex, clean, contain } from 'lib/utils/array';
import { Formik } from 'formik';

const strings = R.strings.authentication.signUp;
const dimens = R.dimens.authentication;

const SignUpScreen = () => {
  const [isPasswordShown, showPassword] = useState(false);
  const inputRefs = useRef<Array<TextInputRef>>([]);
  const usernameId = 'username';
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

  return (
    <Layout title={strings.title()} onLayoutChange={_handleOnLayoutChange}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            [usernameId]: '',
            [displayNameId]: '',
            [passwordId]: '',
            [confirmPasswordId]: '',
          }}
          onSubmit={values => console.warn(values)}
        >
          {
            ({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.buzzSignUpContainer}>
                <TextInput
                  id={usernameId}
                  ref={_addInputRef}
                  style={styles.textInput}
                  placeholder={strings.usernamePlaceholder()}
                  autoFocus
                  autoCapitalize='none'
                  returnKeyType='next'
                  onSubmitEditing={_goNext(usernameId)}
                  onChangeText={handleChange(usernameId)}
                  onBlur={handleBlur(usernameId)}
                  value={values[usernameId]}
                />
                <TextInput
                  id={displayNameId}
                  ref={_addInputRef}
                  style={styles.textInput}
                  placeholder={strings.displayNamePlaceholder()}
                  autoCapitalize='words'
                  returnKeyType='next'
                  onSubmitEditing={_goNext(displayNameId)}
                  onChangeText={handleChange(displayNameId)}
                  onBlur={handleBlur(displayNameId)}
                  value={values[displayNameId]}
                />
                <PasswordInputWithAction
                  id={passwordId}
                  ref={_addInputRef}
                  style={styles.textInput}
                  placeholder={strings.passwordPlaceholder()}
                  isShown={isPasswordShown}
                  onPress={_handleOnShowPressed}
                  returnKeyType='next'
                  onSubmitEditing={_goNext(passwordId)}
                  onChangeText={handleChange(passwordId)}
                  onBlur={handleBlur(passwordId)}
                  value={values[passwordId]}
                />
                {!isPasswordShown &&
                  <TextInput
                    id={confirmPasswordId}
                    ref={_addInputRef}
                    style={styles.textInput}
                    placeholder={strings.confirmPasswordPlaceholder()}
                    secureTextEntry
                    returnKeyType='next'
                    onSubmitEditing={_goNext(confirmPasswordId)}
                    onChangeText={handleChange(confirmPasswordId)}
                    onBlur={handleBlur(confirmPasswordId)}
                    value={values[confirmPasswordId]}
                  />}
                <Hyperlink
                  style={styles.termsOfService}
                  links={[strings.termsOfServiceLink()]}>
                  {strings.agreeWithTermsOfService()}
                </Hyperlink>
                <Button
                  style={styles.signUpButton}
                  title={strings.signUpButton()}
                  onPress={handleSubmit}
                />
              </View>
            )}
        </Formik>

        <SeparateLine style={styles.OR} />

        <View style={styles.socialSignUpContainer}>
          <Button
            style={styles.socialButton}
            title={strings.signUpWithGithubButton()}
            imageSource={R.images.ic_github}
            onPress={() => { }}
          />
          <Button
            style={styles.socialButton}
            title={strings.signUpWithGoogleButton()}
            imageSource={R.images.ic_google}
            onPress={() => { }}
          />
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
  termsOfService: {
    ...R.palette.normal,
    alignSelf: 'center',
    textAlign: 'center',
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