import React, { useState } from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import R from 'res/R';
import StatusBar from 'res/components/statusBar/StatusBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';

enum Theme {
  OutsideScrolling = 0,
  InsideScrolling = 1,
  InsideScrollingWithMaxHeight = 2,
}

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onLayoutChange?: () => void;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const [theme, changeTheme] = useState(Theme.InsideScrollingWithMaxHeight);

  const _handleOnLogoPress = () => {
    const themeCount = Object.keys(Theme).length / 2;
    let nextTheme = theme + 1;
    nextTheme = nextTheme >= themeCount ? 0 : nextTheme;

    _changeTheme(nextTheme);
  };

  const _changeTheme = (nextTheme: number) => {
    changeTheme(nextTheme);
    if (props.onLayoutChange) {
      props.onLayoutChange();
    }
  };

  const _renderLogoAndTitle = (props: LayoutProps) => {
    return (
      <>
        <TouchableWithoutFeedback onPress={_handleOnLogoPress}>
          <Image source={R.images.ic_black_yellow} style={styles.contentImage} />
        </TouchableWithoutFeedback>
        <Text style={styles.contentTitle} >{props.title}</Text>
      </>
    );
  };

  const _renderContent = (props: LayoutProps) => {
    switch (theme) {
      case Theme.InsideScrolling:
        return (
          <View style={styleSheetInsideScrolling.contentContainer}>
            {_renderLogoAndTitle(props)}
            <KeyboardAvoidingView
              style={styleSheetInsideScrolling.contentInnerContainer}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS == 'ios' ? keyboardVerticalOffset : 0}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  ...styleSheetInsideScrolling.scrollViewContainerStyle,
                  ...(props.contentContainerStyle as object),
                }}>
                {props.children}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        );

      case Theme.OutsideScrolling:
        return (
          <KeyboardAvoidingView
            style={styleSheetOutsideScrolling.contentContainer}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                ...styleSheetOutsideScrolling.scrollViewContainerStyle,
                ...(props.contentContainerStyle as object),
              }}>
              {_renderLogoAndTitle(props)}
              <View style={styleSheetOutsideScrolling.contentInnerContainer} >
                {props.children}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        );

      case Theme.InsideScrollingWithMaxHeight:
      default:
        return (
          <View style={styleSheetInsideScrolling.contentContainer}>
            {_renderLogoAndTitle(props)}
            <KeyboardAvoidingView
              style={styleSheetInsideScrollingWithMaxHeight.contentInnerContainer}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS == 'ios' ? keyboardVerticalOffset : 0}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  ...styleSheetInsideScrollingWithMaxHeight.scrollViewContainerStyle,
                  ...(props.contentContainerStyle as object),
                }}>
                {props.children}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        );
    }
  };

  return (
    <>
      <StatusBar backgroundColor={R.colors.YELLOW} barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.backgroundTopContainer}>
          <View style={styles.backgroundTopRectangle} />
          <View style={styles.backgroundTopEllipse} />
        </View>
        {_renderContent(props)}
      </View>
    </>
  );
};

const circleDiameter = Dimensions.get('window').width * 0.7;
const statusBarHeight = getStatusBarHeight();
const contentMargin = 50;
const contentContainerPaddingTop = contentMargin - statusBarHeight;
const contentContainerHeight = (Dimensions.get('window').height - statusBarHeight);
const logoHeight = 80;
const titleHeight = Number(R.palette.title.height);
const contentSpace = 20;
const contentInnerContainerBorderRadius = 25;
const scrollViewPadding = 10;
const keyboardVerticalOffset = R.dimens.inputHeight - R.dimens.inputPadding;

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
    top: 0,
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
    width: '100%',
    backgroundColor: R.colors.WHITE,
    borderRadius: contentInnerContainerBorderRadius,
    shadowOffset: {
      width: 0, // X
      height: 10, // Y
    },
    shadowRadius: 5, // Blur
    shadowColor: R.colors.BLACK,
    shadowOpacity: 0.25,
  },
  scrollViewContainerStyle: {
    alignItems: 'center',
  },
});

const styleSheetOutsideScrolling = StyleSheet.create({
  contentContainer: {
    ...styles.contentContainer,
    paddingHorizontal: 25,
  },
  contentInnerContainer: {
    ...styles.contentInnerContainer,
    paddingHorizontal: 35,
    paddingBottom: 35,
    paddingTop: 35,
    elevation: 8,
  },
  scrollViewContainerStyle: {
    ...styles.scrollViewContainerStyle,
    paddingHorizontal: 10,
    paddingBottom: contentMargin,
    paddingTop: contentContainerPaddingTop,
  },
});

const styleSheetInsideScrolling = StyleSheet.create({
  contentContainer: {
    ...styles.contentContainer,
    paddingHorizontal: 35,
    alignItems: 'center',
    paddingTop: contentContainerPaddingTop,
  },
  contentInnerContainer: {
    ...styles.contentInnerContainer,
    maxHeight: contentContainerHeight - (contentContainerPaddingTop + logoHeight + titleHeight + contentSpace * 2 + contentMargin),
    paddingHorizontal: 25,
    paddingBottom: 35,
    paddingTop: 35,
    elevation: 10,
  },
  scrollViewContainerStyle: {
    ...styles.scrollViewContainerStyle,
    padding: scrollViewPadding,
    paddingTop: 0,
  },
});

const styleSheetInsideScrollingWithMaxHeight = StyleSheet.create({
  contentInnerContainer: {
    ...styleSheetInsideScrolling.contentInnerContainer,
    maxHeight: contentContainerHeight - (contentContainerPaddingTop + logoHeight + titleHeight + contentSpace * 2) + contentInnerContainerBorderRadius + scrollViewPadding,
  },
  scrollViewContainerStyle: {
    ...styleSheetInsideScrolling.scrollViewContainerStyle,
    paddingBottom: contentMargin,
  },
});

export default Layout;
