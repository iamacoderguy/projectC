import React, { useState, useEffect } from 'react';
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
  Keyboard,
  Platform,
} from 'react-native';
import R from 'res/R';
import StatusBar from 'lib/components/statusBar/StatusBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Hyperlink, { HyperlinkProps } from 'lib/components/hyperlink/Hyperlink';

enum Theme {
  OutsideScrolling = 0,
  InsideScrolling = 1,
  InsideScrollingWithMaxHeight = 2,
}

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitleProps?: HyperlinkProps;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onLayoutChange?: () => void;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const [theme, changeTheme] = useState(Theme.OutsideScrolling);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [theme]);

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

  const _renderAboveItems = (props: LayoutProps) => {
    return (
      <>
        <TouchableWithoutFeedback onLongPress={_handleOnLogoPress}>
          <Image source={R.images.ic_black_yellow} style={styles.image} />
        </TouchableWithoutFeedback>
        <Text style={styles.title} >{props.title}</Text>
        {
          (props.subtitleProps &&
            <Hyperlink {...props.subtitleProps}
              style={{ ...styles.subtitle, ...(props.subtitleProps.style as object) }} />)
        }
      </>
    );
  };

  const _renderContent = (props: LayoutProps) => {
    switch (theme) {
      case Theme.InsideScrolling:
        return (
          <View style={styleSheetInsideScrolling.contentContainer}>
            {_renderAboveItems(props)}
            <View style={styleSheetInsideScrolling.formContainer(props.subtitleProps)}>
              <KeyboardAvoidingView
                behavior={'padding'}
                keyboardVerticalOffset={isKeyboardVisible ? 0 : (aboveItemsHeight(props.subtitleProps) + formContainerVerticalPaddingForInsideScrolling)}
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
          </View>
        );

      case Theme.OutsideScrolling:
        return (
          <KeyboardAvoidingView
            style={styleSheetOutsideScrolling.contentContainer}
            behavior={'padding'}
            keyboardVerticalOffset={isKeyboardVisible ? 0 : statusBarHeight}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                ...styleSheetOutsideScrolling.scrollViewContainerStyle,
                ...(props.contentContainerStyle as object),
              }}>
              {_renderAboveItems(props)}
              <View style={styleSheetOutsideScrolling.formContainer} >
                {props.children}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        );

      case Theme.InsideScrollingWithMaxHeight:
      default:
        return (
          <View style={styleSheetInsideScrolling.contentContainer}>
            {_renderAboveItems(props)}
            <View style={styleSheetInsideScrollingWithMaxHeight.formContainer(props.subtitleProps)}>
              <KeyboardAvoidingView
                behavior={'padding'}
                keyboardVerticalOffset={isKeyboardVisible ? 0 : (aboveItemsHeight(props.subtitleProps) + formContainerVerticalPaddingForInsideScrolling)}
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

const contentContainerHeight = (Dimensions.get('window').height - statusBarHeight);
const contentContainerHorizontalPadding = 30;
const contentContainerVerticalPadding = 60;
const contentContainerPaddingTop = contentContainerVerticalPadding - statusBarHeight;
const contentContainerSpacingBetweenItems = 25;
const scrollViewSafeAreaHorizontalPadding = 10;

const formContainerHorizontalPadding = 30;
const formContainerVerticalPadding = 50;

const logoHeight = 80;
const titleHeight = Number(R.palette.title.height);
const subtitleHeight = Number(Platform.select({
  // default font's height
  ios: 17,
  android: 19,
}));
const contentInnerContainerBorderRadius = 25;

const aboveItemsHeight = (subtitleProps?: HyperlinkProps) => {
  const _subtitleHeight = subtitleProps ? (subtitleHeight + contentContainerSpacingBetweenItems) : 0;
  return contentContainerPaddingTop + logoHeight + titleHeight + contentContainerSpacingBetweenItems * 2 + _subtitleHeight;
};

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
  image: {
    height: logoHeight,
    width: logoHeight,
  },
  title: {
    ...R.palette.title,
    marginVertical: contentContainerSpacingBetweenItems,
  },
  subtitle: {
    ...R.palette.normal,
    marginBottom: contentContainerSpacingBetweenItems,
  },
  formContainer: {
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
    paddingHorizontal: contentContainerHorizontalPadding - scrollViewSafeAreaHorizontalPadding,
  },
  formContainer: {
    ...styles.formContainer,
    paddingHorizontal: formContainerHorizontalPadding,
    paddingVertical: formContainerVerticalPadding,
    elevation: 8,
  },
  scrollViewContainerStyle: {
    ...styles.scrollViewContainerStyle,
    paddingHorizontal: scrollViewSafeAreaHorizontalPadding,
    paddingBottom: contentContainerVerticalPadding,
    paddingTop: contentContainerPaddingTop,
  },
});

const formContainerVerticalPaddingForInsideScrolling = formContainerVerticalPadding - scrollViewSafeAreaHorizontalPadding;
const styleSheetInsideScrollingShared = (subtitleProps?: HyperlinkProps) => StyleSheet.create({
  contentContainer: {
    ...styles.contentContainer,
    paddingHorizontal: contentContainerHorizontalPadding,
    alignItems: 'center',
    paddingTop: contentContainerPaddingTop,
  },
  formContainer: {
    ...styles.formContainer,
    maxHeight: contentContainerHeight - (aboveItemsHeight(subtitleProps) + contentContainerVerticalPadding),
    paddingHorizontal: formContainerHorizontalPadding - scrollViewSafeAreaHorizontalPadding,
    paddingVertical: formContainerVerticalPaddingForInsideScrolling,
    elevation: 10,
  },
  scrollViewContainerStyle: {
    ...styles.scrollViewContainerStyle,
    padding: scrollViewSafeAreaHorizontalPadding,
  },
});
const styleSheetInsideScrolling = {
  contentContainer: styleSheetInsideScrollingShared().contentContainer,
  formContainer: (subtitleProps?: HyperlinkProps) => styleSheetInsideScrollingShared(subtitleProps).formContainer,
  scrollViewContainerStyle: styleSheetInsideScrollingShared().scrollViewContainerStyle,
};

const hiddenHeight = contentInnerContainerBorderRadius;
const styleSheetInsideScrollingWithMaxHeightShared = (subtitleProps?: HyperlinkProps) => StyleSheet.create({
  formContainer: {
    ...styleSheetInsideScrolling.formContainer(subtitleProps),
    maxHeight: contentContainerHeight - (aboveItemsHeight()) + hiddenHeight,
  },
  scrollViewContainerStyle: {
    ...styleSheetInsideScrolling.scrollViewContainerStyle,
    paddingBottom: hiddenHeight + scrollViewSafeAreaHorizontalPadding + formContainerVerticalPaddingForInsideScrolling,
  },
});
const styleSheetInsideScrollingWithMaxHeight = {
  formContainer: (subtitleProps?: HyperlinkProps) => styleSheetInsideScrollingWithMaxHeightShared(subtitleProps).formContainer,
  scrollViewContainerStyle: styleSheetInsideScrollingWithMaxHeightShared().scrollViewContainerStyle,
};

export default Layout;
