import React, {
  useImperativeHandle,
  useRef,
} from 'react';
import {
  GestureResponderEvent,
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import TextInput, {
  TextInputProps, TextInputRef,
} from 'res/components/textInput/TextInput';
import R from 'res/R';

const strings = R.strings.authentication.components;

type PasswordInputWithActionProps = TextInputProps & {
  isShown?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

type PropsWithForwardedRef = PasswordInputWithActionProps & {
  myForwardedRef: React.Ref<TextInputRef>;
}

const PasswordInputWithAction: React.FC<PropsWithForwardedRef> = (props: PropsWithForwardedRef) => {
  const inputRef = useRef<TextInputRef>(null);
  const { isShown, onPress, id, ...otherProps } = props;

  useImperativeHandle(props.myForwardedRef, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur,
    id: () => id,
  }));

  return (
    <TextInput ref={inputRef} secureTextEntry={!isShown} {...otherProps} >
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

// eslint-disable-next-line react/display-name
export default React.forwardRef((props: PasswordInputWithActionProps, ref: React.Ref<TextInputRef>) => <PasswordInputWithAction {...props} myForwardedRef={ref} />);