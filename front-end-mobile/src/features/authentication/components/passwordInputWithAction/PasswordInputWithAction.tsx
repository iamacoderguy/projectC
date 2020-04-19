import React from 'react';
import {
  TextInputProps,
  GestureResponderEvent,
  View,
  TouchableWithoutFeedback,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import TextInput from 'res/components/textInput/TextInput';
import R from 'res/R';

type PasswordInputWithActionProps = TextInputProps & {
  isShown?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

const PasswordInputWithAction: React.FC<PasswordInputWithActionProps> = (props: PasswordInputWithActionProps) => {
  const { isShown, onPress, ...otherProps } = props;
  return (
    <TextInput secureTextEntry={!isShown} {...otherProps} >
      <View style={styles.actionContainer}>
        <TouchableWithoutFeedback onPress={props.onPress} >
          <Text style={styles.actionText}>{props.isShown ? 'Hide' : 'Show'}</Text>
        </TouchableWithoutFeedback>
      </View>
    </TextInput>
  );
};

type Style = {
  actionContainer: ViewStyle;
  actionText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  actionContainer: {
    minWidth: 40,
    alignItems: 'center',
  },
  actionText: {
    ...R.palette.normal,
    textDecorationLine: 'underline',
  },
});

export default PasswordInputWithAction;