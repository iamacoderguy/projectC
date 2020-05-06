/* eslint-disable react/prop-types */
import React from 'react';
import { View, Image, Text, GestureResponderEvent, StyleSheet } from 'react-native';
import R from 'shared/res/R';
import { isNullOrWhitespace } from 'shared/utils/string';
import { UserInfo } from '../../utils/auth0';
import Button from 'shared/components/button/Button';

const strings = R.strings.authentication.components;
const dimens = R.dimens.authentication;

type TestLayoutProps = {
  profile: UserInfo;
  onHelloWorldButtonPress: (event: GestureResponderEvent) => void;
  onHelloWorldPrivateButtonPress: (event: GestureResponderEvent) => void;
  onHelloWorldPrivateScopedButtonPress: (event: GestureResponderEvent) => void;
  onSignOutPress: (event: GestureResponderEvent) => void;
}

const TestLayout: React.FC<TestLayoutProps> = (props: TestLayoutProps) => {
  const _renderInfo = () => {
    const profileArr = Object.entries(props.profile);
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
    <View style={styles.container}>
      <Image
        source={isNullOrWhitespace(props.profile.picture) ? R.images.avatar_default :
          {
            uri: props.profile.picture,
          }}
        defaultSource={R.images.avatar_default}
        style={styles.avatar} />

      <View style={styles.infoContainer}>
        {_renderInfo()}
      </View>

      <View style={styles.apiContainer}>
        <Button
          style={styles.apiButton}
          title={strings.helloWorldButton()}
          onPress={props.onHelloWorldButtonPress}
        />
        <Button
          style={styles.apiButton}
          title={strings.helloWorldPrivateButton()}
          onPress={props.onHelloWorldPrivateButtonPress}
        />
        <Button
          style={styles.apiButton}
          title={strings.helloWorldPrivateScopedButton()}
          onPress={props.onHelloWorldPrivateScopedButtonPress}
        />
      </View>

      <Button
        style={styles.signOutButton}
        title={strings.signOutButton()}
        onPress={props.onSignOutPress}
      />
    </View>
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

export default TestLayout;