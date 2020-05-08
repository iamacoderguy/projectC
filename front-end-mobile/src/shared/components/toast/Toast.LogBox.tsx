import React from 'react';
import FadingView, {
  FadingViewRef,
} from '../fadingView/FadingView';
import {
  StyleSheet,
  View,
  Text,
  GestureResponderEvent,
} from 'react-native';
import {
  ToastType,
} from './types';
import R from 'shared/res/R';

type LogBoxProps = {
  type: ToastType;
  message: string;
  onClose: (event: GestureResponderEvent) => void;
  ref: React.RefObject<FadingViewRef>;
}

const LogBox: React.FC<LogBoxProps> = (props: LogBoxProps) => {
  return (
    <FadingView style={styles.container} ref={props.ref}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{props.message}</Text>
      </View>
    </FadingView>
  );
};

const shared = (type?: ToastType) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: R.colors.GRAY20,
      borderRadius: 5,
      elevation: 4,
    },
    contentContainer: {
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
};

const styles = {
  container: shared().container,
  contentContainer: shared().contentContainer,
  text: shared().text,
};

export default LogBox;