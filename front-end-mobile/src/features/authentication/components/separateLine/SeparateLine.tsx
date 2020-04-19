import React from 'react';
import {
  ViewProps,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import R from 'res/R';

const strings = R.strings.authentication.components;
type SeparateLineProps = ViewProps;

const SeparateLine: React.FC<SeparateLineProps> = (props: SeparateLineProps) => {
  const { style, ...otherProps } = props;
  return (
    <View
      style={{ ...styles.container, ...(style as object) }}
      {...otherProps}>
      <View style={styles.line} />
      <Text style={styles.orText}>
        {strings.or()}
      </Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: R.colors.GREY,
  },
  orText: {
    ...R.palette.normal,
    color: R.colors.GREY,
    textTransform: 'uppercase',
    marginHorizontal: 15,
  },
});

export default SeparateLine;