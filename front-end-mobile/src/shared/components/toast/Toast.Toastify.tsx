import React from 'react';
import FadingView, {
  FadingViewRef,
} from '../fadingView/FadingView';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';
import {
  ToastType,
} from './types';
import R from 'shared/res/R';

type ToastifyProps = {
  type: ToastType;
  message: string;
  onClose: (event: GestureResponderEvent) => void;
  ref: React.RefObject<FadingViewRef>;
}

const Toastify: React.FC<ToastifyProps> = (props: ToastifyProps) => {
  return (
    <FadingView style={styles.container(props.type)} ref={props.ref}>
      <View style={styles.textContainer}>
        <Text style={styles.text(props.type)}>{props.message}</Text>
      </View>
      <View style={styles.closeButtonContainer}>
        {/* If you cannot click on the button, make sure you put the Toast under other views*/}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={props.onClose}>
          <Image source={R.images.ic_close} style={styles.closeImage(props.type)} />
        </TouchableOpacity>
      </View>
    </FadingView>
  );
};

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
      bgColor = R.colors.BLACK;
      break;
  }

  return StyleSheet.create({
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
  container: (type: ToastType) => shared(type).container,
  closeButtonContainer: shared().closeButtonContainer,
  closeImage: (type: ToastType) => shared(type).closeImage,
  closeButton: shared().closeButton,
  textContainer: shared().textContainer,
  text: (type: ToastType) => shared(type).text,
};

export default Toastify;