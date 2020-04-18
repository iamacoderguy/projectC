import React from 'react';
import { View, Dimensions, Image, Text, StatusBar, StyleSheet } from 'react-native';
import R from 'res/R';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <>
      <StatusBar backgroundColor={R.colors.YELLOW} />
      <View style={styles.container}>
        <View style={styles.backgroundTopContainer}>
          <View style={styles.backgroundTopRectangle} />
          <View style={styles.backgroundTopEllipse} />
        </View>
        <View style={styles.contentContainer}>
          <Image source={R.images.ic_black_yellow} />
          <Text style={styles.contentTitle} >{props.title}</Text>
          <View style={styles.contentInnerContainer} >
            {props.children}
          </View>
        </View>
      </View>
    </>
  );
};

const backgroundTopHeight = 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.WHITE,
  },
  backgroundTopContainer: {
    width: '100%',
    height: Dimensions.get('screen').width * backgroundTopHeight,
  },
  backgroundTopRectangle: {
    width: '100%',
    height: Dimensions.get('screen').width * (backgroundTopHeight / 2),
    backgroundColor: R.colors.YELLOW,
  },
  backgroundTopEllipse: {
    position: 'absolute',
    alignSelf: 'center',
    width: Dimensions.get('screen').width * backgroundTopHeight,
    height: Dimensions.get('screen').width * backgroundTopHeight,
    borderRadius: Dimensions.get('screen').width * (backgroundTopHeight / 2),
    backgroundColor: R.colors.YELLOW,
    transform: [
      { scaleX: 2 },
    ],
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 30,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingBottom: 60,
  },
  contentTitle: {
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  contentInnerContainer: {
    width: '100%',
    paddingHorizontal: 35,
    paddingBottom: 25,
    paddingTop: 50,
    backgroundColor: R.colors.WHITE,
    elevation: 5,
    borderRadius: 25,
  },
})

export default Layout;