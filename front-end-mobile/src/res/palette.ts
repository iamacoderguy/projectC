import { StyleSheet, TextStyle, Platform } from 'react-native';

type Style = {
  title: TextStyle
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
  },
});

export default palette;