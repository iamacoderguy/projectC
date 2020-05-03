import React from 'react';

import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  Text,
  ImageSourcePropType,
  Image,
} from 'react-native';
import R from 'shared/res/R';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  imageSource?: ImageSourcePropType;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { style, title, imageSource, ...otherProps } = props;
  return (
    <TouchableOpacity
      style={{ ...styles.container(props.disabled, imageSource), ...(style as object) }}
      {...otherProps}>
      {imageSource && (
        <Image
          source={imageSource}
          style={styles.image} />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styleSheet = (enabled?: boolean, imageSource?: ImageSourcePropType) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...(
      enabled && {
        backgroundColor: imageSource ? R.colors.WHITE : R.colors.YELLOW,
        elevation: 4,
        shadowOffset: {
          width: 0, // X
          height: 2, // Y
        },
        shadowRadius: 2, // Blur
        shadowColor: R.colors.BLACK,
        shadowOpacity: 0.25,
      }),
    ...(
      !enabled && {
        backgroundColor: R.colors.GREY,
      }
    ),
  },
  text: {
    ...R.palette.normal,
  },
  image: {
    marginRight: 15,
  },
});

const styles = {
  container: (disabled?: boolean, imageSource?: ImageSourcePropType) => styleSheet(!disabled, imageSource).container,
  text: styleSheet().text,
  image: styleSheet().image,
};

export default Button;