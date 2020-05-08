import React, {
  useEffect,
  useImperativeHandle,
} from 'react';
import {
  ViewProps,
  Animated,
} from 'react-native';

type FadingViewProps = ViewProps & {
  children: React.ReactNode;
}

export type FadingViewRef = {
  fadeOut: (callback: () => void) => void;
}

type PropsWithForwardedRef = FadingViewProps & {
  myForwardedRef: React.Ref<FadingViewRef>;
}

const FadingView: React.FC<PropsWithForwardedRef> = (props: PropsWithForwardedRef) => {
  const opacity = new Animated.Value(0);

  useImperativeHandle(props.myForwardedRef, () => ({
    fadeOut: _fadeOut,
  }));

  useEffect(() => {
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      },
    ).start();
  }, [opacity]);

  const _fadeOut = (callback: () => void) => {
    Animated.timing(
      opacity,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      },
    ).start(() => callback());
  };

  return (
    <Animated.View
      style={{
        ...(props.style as object),
        opacity,
      }}>
      {props.children}
    </Animated.View>
  );
};

// eslint-disable-next-line react/display-name
export default React.forwardRef((props: FadingViewProps, ref: React.Ref<FadingViewRef>) => <FadingView {...props} myForwardedRef={ref} />);