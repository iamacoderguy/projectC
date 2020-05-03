/* eslint-disable react/prop-types */
import React, { } from 'react';
import R from 'shared/res/R';
import Layout from '../../components/layout/Layout';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import Button from 'shared/components/button/Button';
import {
  SignOutScreenPropsForMapState,
  mapStateToProps,
} from './SignOutScreen.container';
import { connect } from 'react-redux';

const strings = {
  signOut: R.strings.authentication.signOut,
};
const dimens = R.dimens.authentication;

type SignOutScreenProps = SignOutScreenPropsForMapState;

const SignOutScreen: React.FC<SignOutScreenProps> = (props: SignOutScreenProps) => {
  const _renderInfo = () => {
    return (
      <>
        <Text style={styles.info}>{`accessToken: ${props.accessToken}`}</Text>
        <Text style={styles.info}>{`refreshToken: ${props.refreshToken}`}</Text>
      </>
    );
  };
  return (
    <Layout
      title={strings.signOut.title()}
    >
      <View style={styles.container}>
        <Image
          source={R.images.avatar_default}
          style={styles.avatar} />

        <View style={styles.infoContainer}>
          {_renderInfo()}
        </View>

        <Button
          style={styles.signOutButton}
          title={strings.signOut.signOutButton()}
        />
      </View>
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
  infoContainer: {
    marginBottom: dimens.spacingBetweenForms - dimens.spacingBetweenInputs,
  },
  info: {
    ...R.palette.normal,
    marginBottom: dimens.spacingBetweenInputs,
  },
  signOutButton: {},
});

export default connect(mapStateToProps, null)(SignOutScreen);