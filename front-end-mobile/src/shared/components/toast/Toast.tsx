import React, {
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  FadingViewRef,
} from '../fadingView/FadingView';
import {
  ToastType,
  ToastTheme,
  ToastMessage,
  ToastRef,
} from './types';
import Toastify from './Toast.Toastify';
import LogBox from './Toast.LogBox';

type ToastProps = {
  theme?: ToastTheme;
}

type PropsWithForwardedRef = ToastProps & {
  myForwardedRef: React.Ref<ToastRef>;
}

const Toast: React.FC<PropsWithForwardedRef> = (props: PropsWithForwardedRef) => {
  const [type, setType] = useState<ToastType>('log');
  const [message, setMessage] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const [_onClose, setOnClose] = useState<Function>();
  const fadingViewRef = useRef<FadingViewRef>(null);

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
    if (!fadingViewRef.current) {
      setIsShowing(false);
      return;
    }

    fadingViewRef.current.fadeOut(() => setIsShowing(false));
  };

  useEffect(() => {
    if (!isShowing && _onClose) {
      _onClose();
    }
  }, [isShowing, _onClose]);

  const _renderToast = (theme?: ToastTheme) => {
    theme = theme ? theme : 'Toastify';

    switch (theme) {
      case 'Toastify':
        return (
          <Toastify
            type={type}
            message={message}
            onClose={_hidePopup}
            ref={fadingViewRef}
          />
        );

      case 'LogBox':
      default:
        return (
          <LogBox
            type={type}
            message={message}
            onClose={_hidePopup}
            ref={fadingViewRef}
          />
        );
    }
  };

  return (
    <>
      {isShowing && <View style={styles.absoluteContainer}>
        <SafeAreaView style={styles.safeAreaContainer}>
          {_renderToast(props.theme)}
        </SafeAreaView>
      </View>}
    </>
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
    padding: safeAreaContainerPadding,
  },
});

// eslint-disable-next-line react/display-name
export default React.forwardRef((props: ToastProps, ref: React.Ref<ToastRef>) => <Toast {...props} myForwardedRef={ref} />);