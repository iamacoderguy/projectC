import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import R from 'res/R';
import StatusBar from 'res/components/statusBar/StatusBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <>
      <StatusBar backgroundColor={R.colors.YELLOW} barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.backgroundTopContainer}>
          <View style={styles.backgroundTopRectangle} />
          <View style={styles.backgroundTopEllipse} />
        </View>
        <View style={styles.contentContainer}>
          <Image source={R.images.ic_black_yellow} style={styles.contentImage} />
          <Text style={styles.contentTitle} >{props.title}</Text>
          <View style={styles.contentInnerContainer} >
            <ScrollView
              style={{ ...styles.contentInnerScrollView, ...(props.style as object) }}
              contentContainerStyle={{ ...styles.contentInnerScrollViewContainerStyle, ...(props.contentContainerStyle as object) }} >
              {props.children}
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};

const circleDiameter = Dimensions.get('window').width * 0.7;
const statusBarHeight = getStatusBarHeight();
const contentMargin = 50;
const contentContainerTop = contentMargin - statusBarHeight;
const contentContainerHeight = (Dimensions.get('window').height - contentContainerTop - statusBarHeight);
const logoHeight = 80;
const titleHeight = Number(R.palette.title.height);
const contentSpace = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.WHITE,
  },
  backgroundTopContainer: {
    width: '100%',
    height: circleDiameter,
  },
  backgroundTopRectangle: {
    width: '100%',
    height: circleDiameter / 2,
    backgroundColor: R.colors.YELLOW,
  },
  backgroundTopEllipse: {
    position: 'absolute',
    alignSelf: 'center',
    width: circleDiameter,
    height: circleDiameter,
    borderRadius: circleDiameter / 2,
    backgroundColor: R.colors.YELLOW,
    transform: [
      { scaleX: 2 },
    ],
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: contentContainerHeight,
    top: contentContainerTop,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  contentImage: {
    height: logoHeight,
    width: logoHeight,
  },
  contentTitle: {
    ...R.palette.title,
    marginVertical: contentSpace,
  },
  contentInnerContainer: {
    maxHeight: contentContainerHeight - (logoHeight + titleHeight + contentSpace * 2 + contentMargin),
    width: '100%',
    paddingHorizontal: 25,
    paddingBottom: 20,
    paddingTop: 40,
    backgroundColor: R.colors.WHITE,
    borderRadius: 25,
    elevation: 10,
    shadowOffset: {
      width: 0, // X
      height: 10, // Y
    },
    shadowRadius: 5, // Blur
    shadowColor: R.colors.BLACK,
    shadowOpacity: 0.25,
  },
  contentInnerScrollView: {},
  contentInnerScrollViewContainerStyle: {
    alignItems: 'center',
  },
});

export default Layout;