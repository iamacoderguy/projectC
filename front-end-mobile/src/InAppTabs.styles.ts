import { StyleSheet } from 'react-native';
import R from 'res/R';

const tabBarHeight = 75;
const tabBarColor = R.colors.BLACK;
const extraCenterButtonHeight = 25;
const tabBarElevation = 8;

const styles = (focused?: boolean, color?: string ) => (StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: focused ? 'bold' : 'normal',
    color: color,
    marginBottom: 5,
  },
  tabBarButtonNormal: {
    height: tabBarHeight,
  },
  tabBarCenterButtonOuter: {
    backgroundColor: R.colors.TRANSPARENT,
  },
  tabBarCenterButtonInner: {
    backgroundColor: tabBarColor,
    height: tabBarHeight,
    width: '100%',
    position: 'absolute',
  },
}));

export default {
  tabBarHeight,
  tabBarColor,
  tabBarElevation,
  extraCenterButtonHeight,
  tabBarLabel: (focused: boolean, color: string ) => styles(focused, color).tabBarLabel,
  tabBarButtonNormal: styles().tabBarButtonNormal,
  tabBarCenterButton: {
    outer: styles().tabBarCenterButtonOuter,
    inner: styles().tabBarCenterButtonInner,
  },
};