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

type ToastType = 'error' | 'info' | 'warn' | 'success' | 'log';

type ToastProps = {
  type: ToastType;
}

const Toast: React.FC<ToastProps> = (props: ToastProps) => {
  return (
    <View style={styles.absoluteContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container(props.type)}>
          <View style={styles.textContainer}>
            <Text style={styles.text(props.type)}>{'This is an error popup!'}</Text>
          </View>
          <View style={styles.closeButtonContainer}>
            <Image source={R.images.ic_close} style={styles.closeImage(props.type)} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const padding = 20;
const safeAreaContainerPadding = 10;

const shared = (type?: ToastType) => {
  let bgColor: string = R.colors.BLACK;
  let contentColor: string = R.colors.WHITE;

  switch (type) {
    case 'error':
      bgColor = R.colors.SUNSET;
      break;

    case 'info':
      bgColor = R.colors.BLUE;
      break;

    case 'success':
      bgColor = R.colors.GREEN;
      break;

    case 'warn':
      bgColor = R.colors.YELLOW;
      contentColor = R.colors.BLACK;
      break;

    case 'log':
      R.colors.BLACK;
      break;
  }

  return StyleSheet.create({
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
      padding: safeAreaContainerPadding,
    },
    container: {
      alignItems: 'center',
      backgroundColor: bgColor,
      borderRadius: 5,
      elevation: 4,
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    closeImage: {
      tintColor: contentColor,
    },
    textContainer: {
      flex: 1,
      width: '100%',
      padding: 15,
    },
    text: {
      ...R.palette.normal,
      color: contentColor,
      textAlign: 'center',
    },
  });
};

const styles = {
  absoluteContainer: shared().absoluteContainer,
  safeAreaContainer: shared().safeAreaContainer,
  container: (type: ToastType) => shared(type).container,
  closeButtonContainer: shared().closeButtonContainer,
  closeImage: (type: ToastType) => shared(type).closeImage,
  textContainer: shared().textContainer,
  text: (type: ToastType) => shared(type).text,
};

export default Toast;