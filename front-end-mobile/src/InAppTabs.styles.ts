import { StyleSheet } from 'react-native';
import R from 'res/R';

const tabBarHeight = 75;
const tabBarColor = R.colors.BLACK;
const extraCenterButtonHeight = 25;
const tabBarElevation = 0;
const tabBarShadow = 1;

const styles = (focused?: boolean, color?: string ) => (StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: focused ? 'bold' : 'normal',
    color: color,
    marginBottom: 5,
  },
  tabBarButtonNormalOuter: {
    backgroundColor: R.colors.TRANSPARENT,
  },
  tabBarButtonNormalInner: {
    backgroundColor: tabBarColor,
    height: tabBarHeight,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  tabBarButtonNormalRectShadow: {
    backgroundColor: R.colors.BLACK_07,
    height: tabBarHeight + tabBarShadow,
    width: '100%',
    position: 'absolute',
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
  tabBarCenterButtonCircleShadow: {
    position: 'absolute',
    alignSelf:'center',
    backgroundColor: R.colors.BLACK_07,
    width: 80 + 2*tabBarShadow, // size of the icon
    height: 80 + 2*tabBarShadow, // size of the icon
    borderRadius: 50,
    top: -tabBarShadow,
  },
  tabBarCenterButtonRectShadow: {
    backgroundColor: R.colors.BLACK_07,
    height: tabBarHeight + tabBarShadow,
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
  tabBarButtonNormal: {
    outer: styles().tabBarButtonNormalOuter,
    inner: styles().tabBarButtonNormalInner,
    shadow: styles().tabBarButtonNormalRectShadow,
  },
  tabBarCenterButton: {
    outer: styles().tabBarCenterButtonOuter,
    inner: styles().tabBarCenterButtonInner,
    circleShadow: styles().tabBarCenterButtonCircleShadow,
    rectShadow: styles().tabBarCenterButtonRectShadow,
  },
};