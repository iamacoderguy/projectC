import React, { useEffect } from 'react';
import { SafeAreaView, Image } from 'react-native';
import R from 'res/R';
import DotsLoader from './components/DotsLoader';
import styles from './LoadingScreen.styles';

type LoadingScreenProps = {
  onLoadingStarted: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = (props: LoadingScreenProps) => {
  useEffect(() => {
    props.onLoadingStarted();
  });

  return (
    <>
      <SafeAreaView
        style={styles.container}>
        <Image source={R.images.ic_splash} />
        <DotsLoader style={styles.dotLoaders} width={100} dotNumber={4} />
      </SafeAreaView>
    </>
  );
};

export default LoadingScreen;