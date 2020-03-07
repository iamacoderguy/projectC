import React, { useEffect } from 'react';
import { Animated, View, ViewStyle, StyleProp } from 'react-native';
import R from 'res/R';

type DotsLoaderProps = {
  width: number;
  style: StyleProp<ViewStyle>;
  dotNumber?: number;
}

const DotsLoader: React.FC<DotsLoaderProps> = (props: DotsLoaderProps) => {
  const opacities: Animated.Value[] = [];
  const appearingSequence: Animated.CompositeAnimation[] = [];
  const disappearingSequence: Animated.CompositeAnimation[] = [];

  for (let index = 0; index < (props.dotNumber || 3); index++) {
    opacities.push(new Animated.Value(0));
    appearingSequence.push(
      Animated.timing(opacities[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }));
    disappearingSequence.push(
      Animated.timing(opacities[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    );
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        ...appearingSequence,
        Animated.parallel(disappearingSequence),
      ]),
    ).start();
  }, []);

  const _renderDots = (dotNumbers: number) => {
    const animatedDots: Element[] = [];

    for (let index = 0; index < dotNumbers; index++) {
      animatedDots.push(<Animated.Image key={index} style={{ opacity: opacities[index] }} source={R.images.dot} />);
    }

    return animatedDots;
  };

  return (
    <View style={{ ...{ width: props.width, flexDirection: 'row', justifyContent: 'space-between' }, ...(props.style as object) }}>
      {_renderDots(props.dotNumber || 3)}
    </View>
  );
};

export default DotsLoader;