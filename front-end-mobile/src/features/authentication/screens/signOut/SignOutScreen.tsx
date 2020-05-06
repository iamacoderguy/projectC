/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
} from 'react';
import R from 'shared/res/R';
import Layout from '../../components/layout/Layout';
import {
  Alert,
} from 'react-native';
import {
  SignOutScreenPropsForMapState,
  mapStateToProps,
  SignOutScreenPropsForMapDispatch,
  mapDispatchToProps,
} from './SignOutScreen.container';
import { connect } from 'react-redux';
import auth0, {
  UserInfo,
} from '../../utils/auth0';
import apiFetcher from 'shared/utils/apiFetcher';
import MODULE_TAG from '../../constants/tag';
import TestLayout from '../../components/testLayout/TestLayout';

const TAG = `${MODULE_TAG} - SIGN_OUT_SCREEN`;
const strings = {
  signOut: R.strings.authentication.signOut,
  components: R.strings.authentication.components,
};

type SignOutScreenProps = SignOutScreenPropsForMapState & SignOutScreenPropsForMapDispatch;

const SignOutScreen: React.FC<SignOutScreenProps> = (props: SignOutScreenProps) => {
  const [profile, setProfile] = useState<UserInfo>({
    email: '',
    emailVerified: false,
    name: '',
    picture: '',
    sub: '',
    updatedAt: '',
    nickname: '',
    'https://buzz.iamacoderguy.me/displayName': '',
  });
  useEffect(() => {
    async function fetchProfile() {
      if (props.accessToken) {
        const profile = await auth0.getProfile(props.accessToken);
        setProfile(profile);
        apiFetcher.setToken(props.accessToken);
      }
    }
    fetchProfile();
  }, [props.accessToken]);

  const _handleOnHelloWorldButtonPress = async () => {
    try {
      const result = await apiFetcher.fetch(
        'GET',
        '/api/helloWorld',
      );
      Alert.alert(strings.components.helloWorldButton(), `${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      console.warn(`${TAG} - ${error}`);
    }
  };

  const _handleOnHelloWorldPrivateButtonPress = async () => {
    try {
      const result = await apiFetcher.fetch(
        'GET',
        '/api/helloWorld/private',
        undefined,
        true,
      );
      Alert.alert(strings.components.helloWorldPrivateButton(), `${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      console.warn(`${TAG} - ${error}`);
    }
  };

  const _handleOnHelloWorldPrivateScopedButtonPress = async () => {
    try {
      const result = await apiFetcher.fetch(
        'GET',
        '/api/helloWorld/private-scoped',
        undefined,
        true,
      );
      Alert.alert(strings.components.helloWorldPrivateScopedButton(), `${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      console.warn(`${TAG} - ${error}`);
    }
  };

  return (
    <Layout
      title={strings.signOut.title()}
    >
      <TestLayout
        profile={profile}
        onHelloWorldButtonPress={_handleOnHelloWorldButtonPress}
        onHelloWorldPrivateButtonPress={_handleOnHelloWorldPrivateButtonPress}
        onHelloWorldPrivateScopedButtonPress={_handleOnHelloWorldPrivateScopedButtonPress}
        onSignOutPress={() => props.signOut(profile.sub)}
      />
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOutScreen);