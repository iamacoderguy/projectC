import { StyleSheet, TextStyle } from 'react-native';

type Style = {
  title: TextStyle
}

const palette = StyleSheet.create<Style>({
  title: {
    fontSize: 24,
    height: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default palette;