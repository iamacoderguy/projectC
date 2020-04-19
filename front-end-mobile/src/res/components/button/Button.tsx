import React from 'react';

import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  Text,
} from 'react-native';
import R from 'res/R';

type ButtonProps = TouchableOpacityProps & {
  title: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { style, title, ...otherProps } = props;
  return (
    <TouchableOpacity
      style={{ ...styles.container(props.disabled), ...(style as object) }}
      {...otherProps}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styleSheet = (enabled?: boolean) => StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...(
      enabled && {
        backgroundColor: R.colors.YELLOW,
        elevation: 4,
        shadowOffset: {
          width: 0, // X
          height: 2, // Y
        },
        shadowRadius: 4, // Blur
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
});

const styles = {
  container: (disabled?: boolean) => styleSheet(!disabled).container,
  text: styleSheet().text,
};

export default Button;