import { StyleSheet, TextStyle, Platform } from 'react-native';
import colors from './colors';

type Style = {
  title: TextStyle;
  normal: TextStyle;
}

const palette = StyleSheet.create<Style>({
  title: {
    fontSize: 24,
    height: Platform.select({
      // default font's height
      ios: 28,
      android: 32,
    }),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.BLACK,
  },
  normal: {
    fontSize: 14,
    fontWeight: 'normal',
    textTransform: 'none',
    color: colors.BLACK,
  },
});

export default palette;