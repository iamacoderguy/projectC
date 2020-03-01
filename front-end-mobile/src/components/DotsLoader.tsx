import React, { useState, useEffect } from 'react';
import { Surface, Image, Animated, View, ViewProps, ViewStyle, StyleProp } from 'react-native';
import images from 'src/assets/images';

interface IDotsLoaderProps {
  size: number;
  style: StyleProp<ViewStyle>;
}

const DotsLoader: React.FC<IDotsLoaderProps> = (props: IDotsLoaderProps) => {

  const opacity = new Animated.Value(0);
  const opacity2 = new Animated.Value(0);
  const opacity3 = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity3, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacity2, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacity3, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <View style={{...{width: (props.size*3), flexDirection: 'row', justifyContent: 'space-between'}, ...(props.style as object)}}>
      <Animated.Image style={{ opacity }} source={images.dot} />
      <Animated.Image style={{ opacity: opacity2 }} source={images.dot} />
      <Animated.Image style={{ opacity: opacity3 }} source={images.dot} />
    </View>
  );
};

export default DotsLoader;