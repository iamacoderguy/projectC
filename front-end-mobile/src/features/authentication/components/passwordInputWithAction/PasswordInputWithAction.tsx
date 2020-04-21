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
  Platform,
} from 'react-native';
import TextInput from 'res/components/textInput/TextInput';
import R from 'res/R';

const strings = R.strings.authentication.components;

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
          <Text style={styles.actionText}>
            {props.isShown ? strings.hide() : strings.show()}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </TextInput>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    minWidth: Platform.select({
      // it depends on action content and font size
      ios: 42,
      android: 40,
    }),
    alignItems: 'flex-end',
  },
  actionText: {
    ...R.palette.hyperlink,
    lineHeight: R.dimens.inputHeight - 2,
  },
});

export default PasswordInputWithAction;