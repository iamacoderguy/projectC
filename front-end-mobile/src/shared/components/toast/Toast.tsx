import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
} from 'react-native';
import R from 'shared/res/R';

const Toast: React.FC = () => {
  return (
    <View style={styles.absoluteContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{'This is an error popup!'}</Text>
          </View>
          <View style={styles.closeButtonContainer}>
            <Image source={R.images.ic_close} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const padding = 20;
const safeAreaContainerPadding = 10;

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: padding - safeAreaContainerPadding,
    marginTop: Platform.select({
      ios: 20,
      android: 0,
    }),
  },
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: safeAreaContainerPadding,
    paddingBottom: safeAreaContainerPadding,
  },
  container: {
    alignItems: 'center',
    backgroundColor: R.colors.SUNSET,
    borderRadius: 5,
    elevation: 4,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  textContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
  },
  text: {
    ...R.palette.normal,
    color: R.colors.WHITE,
    textAlign: 'center',
  },
});

export default Toast;