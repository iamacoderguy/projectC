import React from 'react';
import FadingView, {
  FadingViewRef,
} from '../fadingView/FadingView';
import {
  StyleSheet,
  View,
  Text,
  GestureResponderEvent,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  ToastType,
} from './types';
import R from 'shared/res/R';

type LogBoxProps = {
  type: ToastType;
  message: string;
  onClose: (event: GestureResponderEvent) => void;
}

type PropsWithForwardedRef = LogBoxProps & {
  myForwardedRef: React.Ref<FadingViewRef>;
}

const LogBox: React.FC<PropsWithForwardedRef> = (props: PropsWithForwardedRef) => {
  return (
    <FadingView style={styles.container} ref={props.myForwardedRef}>
      <View style={styles.contentContainer}>
        <View style={styles.typeContainer}>
          <Image style={styles.typeIcon(props.type)} source={R.images.ic_exclamation_mark} />
        </View>
        <View style={styles.separateLine} />
        <Text style={styles.text}>{props.message}</Text>
        <TouchableOpacity
          style={styles.closeContainer}
          onPress={props.onClose}
          hitSlop={{
            top: 10,
            bottom: 10,
            right: 10,
            left: 10,
          }}>
          <Image style={styles.closeIcon} source={R.images.ic_cross_mark} />
        </TouchableOpacity>
      </View>
    </FadingView>
  );
};

const spaceBetweenItems = 15;

const shared = (type?: ToastType) => {
  let imageColor = R.colors.BLACK;

  switch (type) {
    case 'error':
      imageColor = R.colors.SUNSET;
      break;
    case 'warn':
      imageColor = R.colors.ORANGE;
      break;
    case 'info':
      imageColor = R.colors.BLUE;
      break;
    case 'log':
      imageColor = R.colors.BLACK;
      break;
    case 'success':
      imageColor = R.colors.GREEN;
      break;
  }

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: R.colors.GRAY20,
      borderRadius: 5,
      elevation: 4,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      padding: 15,
      alignItems: 'center',
    },
    typeContainer: {
      flexDirection: 'column',
      marginRight: spaceBetweenItems,
      height: 24,
      width: 24,
      borderRadius: 12,
      backgroundColor: R.colors.WHITE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    typeIcon: {
      height: 20,
      width: 20,
      tintColor: imageColor,
    },
    separateLine: {
      height: '100%',
      width: 1,
      backgroundColor: R.colors.GRAY,
      marginRight: spaceBetweenItems,
    },
    text: {
      ...R.palette.normal,
      color: R.colors.WHITE,
      textAlign: 'center',
      flex: 1, // flex = 1 will prevent the text overlap its parent
      marginRight: spaceBetweenItems,
    },
    closeContainer: {},
    closeIcon: {
      tintColor: R.colors.GRAY,
    },
  });
};

const styles = {
  container: shared().container,
  contentContainer: shared().contentContainer,
  typeContainer: shared().typeContainer,
  typeIcon: (type: ToastType) => shared(type).typeIcon,
  separateLine: shared().separateLine,
  text: shared().text,
  closeContainer: shared().closeContainer,
  closeIcon: shared().closeIcon,
};

// eslint-disable-next-line react/display-name
export default React.forwardRef((props: LogBoxProps, ref: React.Ref<FadingViewRef>) => <LogBox {...props} myForwardedRef={ref} />);