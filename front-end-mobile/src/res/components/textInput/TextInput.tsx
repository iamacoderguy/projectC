import React from 'react';
import {
  View,
  TextInput as TextInputRN,
  TextInputProps as TextInputPropsRN,
  StyleSheet,
} from 'react-native';
import R from 'res/R';

type TextInputProps = TextInputPropsRN & {
  children?: React.ReactChild;
}

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  const { style, children, ...otherProps } = props;
  return (
    <View style={{ ...styles.container, ...(style as object) }}>
      <View style={styles.inputContainer}>
        <TextInputRN
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
  );
};

const paddingHorizontal = 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: R.colors.GREY,
    borderWidth: 1,
    height: R.dimens.inputHeight,
    borderRadius: 5,
    paddingHorizontal: paddingHorizontal,
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
    marginLeft: paddingHorizontal,
  },
  textInput: {
    ...R.palette.normal,
    flex: 1,
    padding: 0,
  },
});

export default TextInput;