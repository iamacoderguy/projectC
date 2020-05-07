import React, { useImperativeHandle, useState } from 'react';
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

type ToastProps = {}

export type ToastRef = {
  error: (msg: string) => void;
  info: (msg: string) => void;
  warn: (msg: string) => void;
  success: (msg: string) => void;
  log: (msg: string) => void;
}

type PropsWithForwardedRef = ToastProps & {
  myForwardedRef: React.Ref<ToastRef>;
}

const Toast: React.FC<PropsWithForwardedRef> = (props: PropsWithForwardedRef) => {
  const [type, setType] = useState<ToastType>('log');
  const [message, setMessage] = useState('');
  const [isShowing, setIsShowing] = useState(false);

  useImperativeHandle(props.myForwardedRef, () => ({
    error: (msg: string) => {
      _showPopup('error', msg);
    },
    info: (msg: string) => {
      _showPopup('info', msg);
    },
    warn: (msg: string) => {
      _showPopup('warn', msg);
    },
    success: (msg: string) => {
      _showPopup('success', msg);
    },
    log: (msg: string) => {
      _showPopup('log', msg);
    },
  }));

  const _showPopup = (type: ToastType, msg: string) => {
    setType(type);
    setMessage(msg);
    setIsShowing(true);
  };

  return (
    <>
      {isShowing && <View style={styles.absoluteContainer}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.container(type)}>
            <View style={styles.textContainer}>
              <Text style={styles.text(type)}>{message}</Text>
            </View>
            <View style={styles.closeButtonContainer}>
              <Image source={R.images.ic_close} style={styles.closeImage(type)} />
            </View>
          </View>
        </SafeAreaView>
      </View>}
    </>
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

// eslint-disable-next-line react/display-name
export default React.forwardRef((props: ToastProps, ref: React.Ref<ToastRef>) => <Toast {...props} myForwardedRef={ref} />);