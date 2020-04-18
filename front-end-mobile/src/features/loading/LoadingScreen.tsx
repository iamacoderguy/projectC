import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import R from 'res/R';
import DotsLoader from './components/DotsLoader';
import StatusBar from 'res/components/statusBar/StatusBar';

const LoadingScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={R.colors.WHITE} barStyle='dark-content' />
      <View style={styles.container}>
        <Image source={R.images.ic_splash} />
        <DotsLoader style={styles.dotLoaders} width={100} dotNumber={4} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.WHITE,
  },
  dotLoaders: {
    marginTop: 20,
  },
});

export default LoadingScreen;