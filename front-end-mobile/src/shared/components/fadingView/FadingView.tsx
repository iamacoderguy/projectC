import React, {
  useEffect,
} from 'react';
import {
  ViewProps,
  Animated,
} from 'react-native';

type FadingViewProps = ViewProps & {
  children: React.ReactNode;
}

const FadingView: React.FC<FadingViewProps> = (props: FadingViewProps) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 300,
      },
    ).start();
  }, [opacity]);

  const fadeOut = (callback: () => void) => {
    Animated.timing(
      opacity,
      {
        toValue: 0,
        duration: 300,
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

export default FadingView;