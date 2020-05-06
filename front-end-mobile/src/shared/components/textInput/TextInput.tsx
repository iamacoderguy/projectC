import React, {
  useImperativeHandle,
  useRef,
} from 'react';
import {
  View,
  TextInput as TextInputRN,
  TextInputProps as TextInputPropsRN,
  StyleSheet,
  Text,
} from 'react-native';
import R from 'shared/res/R';

export type TextInputRef = {
  focus: () => void;
  blur: () => void;
  id: () => string | undefined;
}

type TextInputError = {
  isError: boolean;
  message?: string;
}

export type TextInputProps = TextInputPropsRN & {
  children?: React.ReactChild;
  id?: string;
  error?: TextInputError;
};

type PropsWithForwardedRef = TextInputProps & {
  myForwardedRef: React.Ref<TextInputRef>;
}

const TextInput: React.FC<PropsWithForwardedRef> = (props: PropsWithForwardedRef) => {
  const inputRef = useRef<TextInputRN>(null);
  const { style, children, id, error, ...otherProps } = props;

  useImperativeHandle(props.myForwardedRef, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur,
    id: () => id,
  }));

  return (
    <>
      {(error && error.isError && error.message &&
        <Text style={styles.errorMessage}>{error.message}</Text>)}
      <View style={{ ...styles.container(error), ...(style as object) }}>
        <View style={styles.inputContainer}>
          <TextInputRN
            ref={inputRef}
            style={styles.textInput}
            placeholderTextColor={R.colors.GREY}
            {...otherProps} />
        </View>
        {children && (
          <View style={styles.actionContainer}>
            {children}
          </View>
        )}
      </View>
    </>
  );
};

const shared = (error?: TextInputError) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: (error && error.isError) ? R.colors.SUNSET : R.colors.GREY,
    borderWidth: 1,
    height: R.dimens.inputHeight,
    borderRadius: 5,
    paddingHorizontal: R.dimens.inputPadding,
    alignItems: 'center',
  },
  inputContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  actionContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    marginLeft: R.dimens.inputPadding,
  },
  textInput: {
    ...R.palette.normal,
    flex: 1,
    padding: 0,
  },
  errorMessage: {
    ...R.palette.normal,
    color: R.colors.SUNSET,
    marginBottom: 5,
  },
});

const styles = {
  container: (error?: TextInputError) => shared(error).container,
  inputContainer: shared().inputContainer,
  actionContainer: shared().actionContainer,
  textInput: shared().textInput,
  errorMessage: shared().errorMessage,
};

// eslint-disable-next-line react/display-name
export default React.forwardRef((props: TextInputProps, ref: React.Ref<TextInputRef>) => <TextInput {...props} myForwardedRef={ref} />);