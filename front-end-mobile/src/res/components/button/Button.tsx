import React from 'react';

import {
  Button as ButtonRN,
  ButtonProps as ButtonPropsRN,
} from 'react-native';

enum Theme {
  Primary,
  WhiteWithIcon,
}

type ButtonProps = ButtonPropsRN & {
  theme?: Theme;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <ButtonRN {...props} />
  );
};

export default Button;