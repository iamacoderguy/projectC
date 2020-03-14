import { StyleSheet } from 'react-native';

const styles = (focused: boolean, color: string ) => (StyleSheet.create({
  labelStyle: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: focused ? 'bold' : 'normal',
    color: color,
    marginBottom: 5,
  },
}));

export default styles;