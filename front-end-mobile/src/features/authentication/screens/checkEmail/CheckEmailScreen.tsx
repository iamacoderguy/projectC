import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import R from 'shared/res/R';
import Button from 'shared/components/button/Button';
import MODULE_TAG from '../../constants/tag';
import {
  CheckEmailScreenPropsForMapDispatch,
  mapDispatchToProps,
  CheckEmailScreenPropsForMapState,
  mapStateToProps,
} from './CheckEmailScreen.container';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { usernameForm } from '../forgotPassword/ForgotPasswordScreen';
import SeparateLine from '../../components/separateLine/SeparateLine';
import Hyperlink from 'shared/components/hyperlink/Hyperlink';
import toast from 'shared/utils/toast';

const TAG = `${MODULE_TAG} - CHECK_EMAIL_SCREEN`;
const strings = {
  checkEmail: R.strings.authentication.checkEmail,
  shared: R.strings.authentication.shared,
};

type CheckEmailScreenProps = CheckEmailScreenPropsForMapDispatch & CheckEmailScreenPropsForMapState;

const CheckEmailScreen: React.FC<CheckEmailScreenProps> = (props: CheckEmailScreenProps) => {
  const resendEmailId = 'https://gotoForgotPasswordScreen';
  const _handleOnHyperlinkLinkPress = (url: string, _text: string) => {
    switch (url) {
      case resendEmailId:
        props.onGoToForgotPasswordScreen();
        return;

      default:
        toast.warn(`${TAG} - Nani?!?`);
    }
  };

  return (
    <Layout
      title={strings.checkEmail.title()}
    >
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {props.selectedForm == usernameForm
              ? strings.checkEmail.usernameMessage(props.username || 'Nani?!?')
              : strings.checkEmail.emailMessage()}
          </Text>
          <Button
            style={styles.doneButton}
            title={strings.shared.doneButton()}
            onPress={props.onDone}
          />
        </View>

        <SeparateLine style={styles.OR} />

        <Hyperlink
          style={styles.didntReceiveAnEmail}
          links={[resendEmailId]}
          onPress={_handleOnHyperlinkLinkPress}
        >
          {strings.checkEmail.didntReceiveAnEmail()}
        </Hyperlink>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  descriptionContainer: {
    marginBottom: R.dimens.authentication.spacingBetweenForms,
  },
  descriptionText: {
    ...R.palette.normal,
    textAlign: 'center',
    marginBottom: R.dimens.authentication.spacingBetweenInputs,
  },
  doneButton: {},
  OR: {
    marginBottom: R.dimens.authentication.spacingBetweenForms,
  },
  didntReceiveAnEmail: {
    ...R.palette.normal,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckEmailScreen);