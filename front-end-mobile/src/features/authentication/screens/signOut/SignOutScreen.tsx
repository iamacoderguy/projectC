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
      }
    }
    fetchProfile();
  }, [props.accessToken]);

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
          source={{
            uri: profile?.picture,
          }}
          defaultSource={R.images.avatar_default}
          style={styles.avatar} />

        <View style={styles.infoContainer}>
          {_renderInfo()}
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
  signOutButton: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOutScreen);