import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import R from 'shared/res/R';
import apiFetcher from 'shared/utils/apiFetcher';
import MODULE_TAG from './tag';
import { TestLayout } from 'features/authentication';
import toast from 'shared/utils/toast';

const TAG = `${MODULE_TAG} - BUZZ_SCREEN`;
const strings = {
  components: R.strings.authentication.components,
};

const BuzzScreen = () => {
  const [profile] = useState({
    email: '',
    emailVerified: false,
    name: '',
    picture: '',
    sub: '',
    updatedAt: '',
    nickname: '',
    'https://buzz.iamacoderguy.me/displayName': '',
  });

  const _handleOnHelloWorldButtonPress = async () => {
    try {
      const result = await apiFetcher.fetch(
        'GET',
        '/api/helloWorld',
      );
      Alert.alert(strings.components.helloWorldButton(), `${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      toast.warn(`${TAG} - ${error}`);
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
      toast.warn(`${TAG} - ${error}`);
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
      toast.warn(`${TAG} - ${error}`);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 100,
      }}>
      <TestLayout
        profile={profile}
        onHelloWorldButtonPress={_handleOnHelloWorldButtonPress}
        onHelloWorldPrivateButtonPress={_handleOnHelloWorldPrivateButtonPress}
        onHelloWorldPrivateScopedButtonPress={_handleOnHelloWorldPrivateScopedButtonPress}
        onSignOutPress={() => toast.warn(`${TAG} - SIGN OUT`)}
      />
    </ScrollView>
  );
};

export default BuzzScreen;