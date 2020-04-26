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
import * as Yup from 'yup';

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
    <Layout
      title={strings.title()}
      onLayoutChange={_handleOnLayoutChange}
      keyboardVerticalOffset={R.dimens.inputHeight - R.dimens.inputPadding}
    >
      <View style={styles.container}>
        <Formik
          initialValues={{
            [usernameId]: '',
            [displayNameId]: '',
            [passwordId]: '',
            [confirmPasswordId]: '',
          }}
          validationSchema={Yup.object({
            [usernameId]: Yup.string()
              .max(15, strings.validationMessageMaxLength(15))
              .matches(/^[a-zA-Z@^$.!`\-#+'~_]+$/, strings.usernameValidationMessageCharactersAllowed('@^$.!`-#+\'~_'))
              .required(strings.validationMessageRequired),
            [displayNameId]: Yup.string()
              .max(128, strings.validationMessageMaxLength(128))
              .required(strings.validationMessageRequired),
            [passwordId]: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            [confirmPasswordId]: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
          })}
          onSubmit={values => console.warn(values)}
        >
          {
            ({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
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
                  error={{
                    isError: !!(touched[usernameId] && errors[usernameId]),
                    message: errors[usernameId],
                  }}
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
                  error={{
                    isError: !!(touched[displayNameId] && errors[displayNameId]),
                    message: errors[displayNameId],
                  }}
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
                    placeholder={strings.confirmPasswordPlaceholder()}
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