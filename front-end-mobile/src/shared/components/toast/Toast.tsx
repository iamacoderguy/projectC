import React, {
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import R from 'shared/res/R';
import FadingView from '../fadingView/FadingView';

type ToastType = 'error' | 'info' | 'warn' | 'success' | 'log';

export type ToastMessage = {
  type: ToastType,
  content: string;
}
export const isToastMessageEqual = (message1: ToastMessage, message2: ToastMessage) => {
  return message1.content === message2.content && message1.type === message2.type;
};

type ToastProps = {}

export type ToastRef = {
  show: (toastMsg: ToastMessage, onClose?: () => void) => void;
  hide: () => void;
}

type PropsWithForwardedRef = ToastProps & {
  myForwardedRef: React.Ref<ToastRef>;
}

const Toast: React.FC<PropsWithForwardedRef> = (props: PropsWithForwardedRef) => {
  const [type, setType] = useState<ToastType>('log');
  const [message, setMessage] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const [_onClose, setOnClose] = useState<Function>();

  useImperativeHandle(props.myForwardedRef, () => ({
    show: (toastMsg: ToastMessage, onClose?: () => void) => {
      _showPopup(toastMsg.type, toastMsg.content, onClose);
    },
    hide: () => {
      _hidePopup();
    },
  }));

  const _showPopup = (type: ToastType, msg: string, onClose?: () => void) => {
    setType(type);
    setMessage(msg);
    setIsShowing(true);
    if (onClose) {
      setOnClose(() => onClose);
    }
  };

  const _hidePopup = () => {
    setIsShowing(false);
  };

  useEffect(() => {
    if (!isShowing && _onClose) {
      _onClose();
    }
  }, [isShowing, _onClose]);

  return (
    <>
      {isShowing && <View style={styles.absoluteContainer}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <FadingView style={styles.container(type)}>
            <View style={styles.textContainer}>
              <Text style={styles.text(type)}>{message}</Text>
            </View>
            <View style={styles.closeButtonContainer}>
              {/* If you cannot click on the button, make sure you put the Toast under other views*/}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={_hidePopup}>
                <Image source={R.images.ic_close} style={styles.closeImage(type)} />
              </TouchableOpacity>
            </View>
          </FadingView>
        </SafeAreaView>
      </View>}
    </>
  );
};

const padding = 20;
const safeAreaContainerPadding = 10;
const closeButtonTop = 10;
const closeButtonPadding = 5;

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
      top: closeButtonTop - closeButtonPadding,
      right: closeButtonTop - closeButtonPadding,
    },
    closeImage: {
      tintColor: contentColor,
    },
    closeButton: {
      padding: closeButtonPadding,
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
  closeButton: shared().closeButton,
  textContainer: shared().textContainer,
  text: (type: ToastType) => shared(type).text,
};

// eslint-disable-next-line react/display-name
export default React.forwardRef((props: ToastProps, ref: React.Ref<ToastRef>) => <Toast {...props} myForwardedRef={ref} />);