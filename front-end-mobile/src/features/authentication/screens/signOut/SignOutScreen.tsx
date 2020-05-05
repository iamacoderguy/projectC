/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
} from 'react';
import R from 'shared/res/R';
import Layout from '../../components/layout/Layout';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
} from 'react-native';
import Button from 'shared/components/button/Button';
import {
  SignOutScreenPropsForMapState,
  mapStateToProps,
  SignOutScreenPropsForMapDispatch,
  mapDispatchToProps,
} from './SignOutScreen.container';
import { connect } from 'react-redux';
import {
  getProfile,
  UserInfo,
} from '../../utils/auth0';
import { isNullOrWhitespace } from 'shared/utils/string';
import apiFetcher from 'shared/utils/apiFetcher';

const strings = {
  signOut: R.strings.authentication.signOut,
};
const dimens = R.dimens.authentication;

type SignOutScreenProps = SignOutScreenPropsForMapState & SignOutScreenPropsForMapDispatch;

const SignOutScreen: React.FC<SignOutScreenProps> = (props: SignOutScreenProps) => {
  const [profile, setProfile] = useState<UserInfo>();
  useEffect(() => {
    async function fetchProfile() {
      if (props.accessToken) {
        const profile = await getProfile(props.accessToken);
        setProfile(profile);
        apiFetcher.setToken(props.accessToken);
      }
    }
    fetchProfile();
  }, [props.accessToken]);

  const _handleOnHelloWorldButtonPress = async () => {
    const result = await apiFetcher.fetchToJson(
      'GET',
      '/api/helloWorld',
    );

    Alert.alert(strings.signOut.helloWorldButton(), `${JSON.stringify(result, null, 2)}`);
  };

  const _handleOnHelloWorldPrivateButtonPress = async () => {
    const result = await apiFetcher.fetchToJson(
      'GET',
      '/api/helloWorld/private',
      undefined,
      true,
    );

    Alert.alert(strings.signOut.helloWorldPrivateButton(), `${JSON.stringify(result, null, 2)}`);
  };

  const _handleOnHelloWorldPrivateScopedButtonPress = async () => {
    const result = await apiFetcher.fetchToJson(
      'GET',
      '/api/helloWorld/private-scoped',
      undefined,
      true,
    );

    Alert.alert(strings.signOut.helloWorldPrivateScopedButton(), `${JSON.stringify(result, null, 2)}`);
  };

  const _renderInfo = () => {
    if (!profile) {
      return null;
    }

    const profileArr = Object.entries(profile);
    return (
      <>
        {
          profileArr.map((value, index) => {
            return <Text key={index} style={styles.info}>{`${value[0]}: ${value[1]}`}</Text>;
          })
        }
      </>
    );
  };
  return (
    <Layout
      title={strings.signOut.title()}
    >
      <View style={styles.container}>
        <Image
          source={isNullOrWhitespace(profile?.picture) ? R.images.avatar_default :
            {
              uri: profile?.picture,
            }}
          defaultSource={R.images.avatar_default}
          style={styles.avatar} />

        <View style={styles.infoContainer}>
          {_renderInfo()}
        </View>

        <View style={styles.apiContainer}>
          <Button
            style={styles.apiButton}
            title={strings.signOut.helloWorldButton()}
            onPress={_handleOnHelloWorldButtonPress}
          />
          <Button
            style={styles.apiButton}
            title={strings.signOut.helloWorldPrivateButton()}
            onPress={_handleOnHelloWorldPrivateButtonPress}
          />
          <Button
            style={styles.apiButton}
            title={strings.signOut.helloWorldPrivateScopedButton()}
            onPress={_handleOnHelloWorldPrivateScopedButtonPress}
          />
        </View>

        <Button
          style={styles.signOutButton}
          title={strings.signOut.signOutButton()}
          onPress={() => props.signOut(profile?.sub || '')}
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
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    marginBottom: dimens.spacingBetweenForms - dimens.spacingBetweenInputs,
  },
  info: {
    ...R.palette.normal,
    marginBottom: dimens.spacingBetweenInputs,
  },
  apiContainer: {
    marginBottom: dimens.spacingBetweenForms - dimens.spacingBetweenInputs,
  },
  apiButton: {
    marginBottom: dimens.spacingBetweenInputs,
  },
  signOutButton: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOutScreen);