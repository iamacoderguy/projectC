import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import R from 'shared/res/R';
import Button from 'shared/components/button/Button';
import auth0 from '../../utils/auth0';
import MODULE_TAG from '../../constants/tag';
import { ForgotPasswordScreenPropsForMapDispatch, mapDispatchToProps } from './ForgotPasswordScreen.container';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import SwitchSelector from 'shared/components/switchSelector/SwitchSelector';
import TextInput from 'shared/components/textInput/TextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { usernameValidation, emailValidation } from 'features/authentication/utils/yupValidation';

const TAG = `${MODULE_TAG} - FORGOT_PASSWORD_SCREEN`;
const strings = {
  forgotPassword: R.strings.authentication.forgotPassword,
  shared: R.strings.authentication.shared,
};

export const emailForm = 0;
export const usernameForm = 1;
type ForgotPasswordScreenProps = ForgotPasswordScreenPropsForMapDispatch;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props: ForgotPasswordScreenProps) => {
  const selectors = [
    {
      label: strings.forgotPassword.emailButton(), value: emailForm,
    },
    {
      label: strings.shared.usernamePlaceholder(), value: usernameForm,
    },
  ];
  const [selectedForm, setSelectedForm] = useState(emailForm);
  const [_validateForm, setValidateForm] = useState<Function>();

  const usernameId = 'username';
  const emailId = 'email';
  const signInScreenId = 'https://gotoLoginScreen';

  const _handleOnHyperlinkLinkPress = (url: string, _text: string) => {
    switch (url) {
      case signInScreenId:
        props.onSignInLinkPress();
        return;

      default:
        console.warn(`${TAG} - Nani?!?`);
    }
  };

  useEffect(() => {
    if (_validateForm) {
      _validateForm();
    }
  }, [selectedForm, _validateForm]);

  return (
    <Layout
      title={strings.forgotPassword.title()}
      subtitleProps={{
        children: strings.forgotPassword.alreadyRememberPassword(),
        links: [signInScreenId],
        onPress: _handleOnHyperlinkLinkPress,
      }}
    >
      <Formik
        initialValues={{
          [usernameId]: '',
          [emailId]: '',
        }}
        validationSchema={
          selectedForm == usernameForm
            ? Yup.object({
              [usernameId]: usernameValidation(strings.shared.usernamePlaceholder()),
            })
            : Yup.object({
              [emailId]: emailValidation(strings.shared.emailPlaceholder()),
            })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await auth0.forgotPasswordManual(values[emailId]);
            props.onGoToCheckEmail(selectedForm, values[usernameId]);
          } catch (error) {
            console.warn(`${TAG} - ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {
          ({
            isSubmitting,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            validateForm,
          }) =>
            (
              <View style={styles.container}>
                <View style={styles.descriptionContainer}>
                  <SwitchSelector
                    initial={selectedForm}
                    style={styles.switchSelector}
                    options={selectors}
                    onPress={(value) => {
                      setSelectedForm(Number(value));
                      if (!_validateForm) {
                        setValidateForm(() => validateForm);
                      }
                    }}
                    disabled
                  />
                  <Text style={styles.descriptionText}>
                    {selectedForm == usernameForm
                      ? strings.forgotPassword.usernameDescription()
                      : strings.forgotPassword.emailDescription()}
                  </Text>
                </View>

                <View style={styles.formContainer}>
                  {selectedForm == usernameForm && <TextInput
                    id={usernameId}
                    style={styles.textInput}
                    placeholder={strings.shared.usernamePlaceholder()}
                    autoCapitalize='none'
                    onChangeText={handleChange(usernameId)}
                    onBlur={handleBlur(usernameId)}
                    value={values[usernameId]}
                    error={{
                      isError: !!(touched[usernameId] && errors[usernameId]),
                      message: errors[usernameId],
                    }}
                  />}
                  {selectedForm == emailForm && <TextInput
                    id={emailId}
                    style={styles.textInput}
                    placeholder={strings.shared.emailPlaceholder()}
                    keyboardType='email-address'
                    onChangeText={handleChange(emailId)}
                    onBlur={handleBlur(emailId)}
                    value={values[emailId]}
                    error={{
                      isError: !!(touched[emailId] && errors[emailId]),
                      message: errors[emailId],
                    }}
                  />}
                  <Button
                    style={styles.continueButton}
                    title={strings.shared.continueButton()}
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
  descriptionContainer: {
    marginBottom: R.dimens.authentication.spacingBetweenFormItems - R.dimens.authentication.spacingBetweenInputs,
  },
  switchSelector: {
    marginBottom: R.dimens.authentication.spacingBetweenInputs,
  },
  descriptionText: {
    ...R.palette.normal,
    textAlign: 'center',
    marginBottom: R.dimens.authentication.spacingBetweenInputs,
  },
  formContainer: {
  },
  textInput: {
    marginBottom: R.dimens.authentication.spacingBetweenFormItems,
  },
  continueButton: {

  },
});

export default connect(null, mapDispatchToProps)(ForgotPasswordScreen);