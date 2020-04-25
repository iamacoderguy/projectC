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
import { findNextIndex, clean } from 'lib/utils/array';

const strings = R.strings.authentication.signUp;
const dimens = R.dimens.authentication;

const SignUpScreen = () => {
  const [isPasswordShown, showPassword] = useState(false);
  const inputRefs = useRef<Array<TextInputRef>>([]);

  const _addInputRef = (ref: TextInputRef | null) => {
    if (ref) {
      inputRefs.current.push(ref);
    }
  };

  const _clearInputRefs = () => {
    clean(inputRefs.current);
  };

  const _goNext = (currentId: string) => {
    const nextIndex = findNextIndex(inputRefs.current, (txtInpt) => txtInpt.id() == currentId);
    if (nextIndex != -1) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const _handleOnShowPressed = () => {
    showPassword(!isPasswordShown);
    _handleOnStateChange();
  };

  const _handleOnStateChange = () => {
    _clearInputRefs();
  };

  return (
    <Layout title={strings.title()} onStateChange={_handleOnStateChange}>
      <View style={styles.container}>
        <View style={styles.buzzSignUpContainer}>
          <TextInput
            id={'usernameInput'}
            ref={_addInputRef}
            style={styles.textInput}
            placeholder={strings.usernamePlaceholder()}
            autoFocus
            autoCapitalize='none'
            returnKeyType='next'
            onSubmitEditing={() => _goNext('usernameInput')}
          />
          <TextInput
            id={'displayNameInput'}
            ref={_addInputRef}
            style={styles.textInput}
            placeholder={strings.displayNamePlaceholder()}
            autoCapitalize='words'
            returnKeyType='next'
            onSubmitEditing={() => _goNext('displayNameInput')}
          />
          <PasswordInputWithAction
            id={'passwordInput'}
            ref={_addInputRef}
            style={styles.textInput}
            placeholder={strings.passwordPlaceholder()}
            isShown={isPasswordShown}
            onPress={_handleOnShowPressed}
            returnKeyType='next'
            onSubmitEditing={() => _goNext('passwordInput')}
          />
          {!isPasswordShown &&
            <TextInput
              id={'confirmPasswordInput'}
              ref={_addInputRef}
              style={styles.textInput}
              placeholder={strings.confirmPasswordPlaceholder()}
              secureTextEntry
              returnKeyType='next'
              onSubmitEditing={() => _goNext('confirmPasswordInput')}
            />}
          <Hyperlink
            style={styles.termsOfService}
            links={[strings.termsOfServiceLink()]}>
            {strings.agreeWithTermsOfService()}
          </Hyperlink>
          <Button
            style={styles.signUpButton}
            title={strings.signUpButton()}
            onPress={() => { }}
          />
        </View>

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