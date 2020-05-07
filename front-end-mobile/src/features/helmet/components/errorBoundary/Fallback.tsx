import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Button from 'shared/components/button/Button';
import R from 'shared/res/R';
import StatusBar from 'shared/components/statusBar/StatusBar';

const strings = R.strings.helmet.errorBoundary;

type FallbackComponentProps = {
  error: Error,
  resetError: (event?: GestureResponderEvent) => void;
}

const FallbackComponent: React.FC<FallbackComponentProps> = (props: FallbackComponentProps) => (
  <>
    <StatusBar backgroundColor={R.colors.WHITE} barStyle='dark-content' />
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{strings.title()}</Text>
        <Text style={styles.subtitle}>{strings.subTitle()}</Text>
        <Text style={styles.error}>{props.error.toString()}</Text>
        <Button title={strings.button()} onPress={props.resetError} />
      </View>
    </SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.WHITE,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 20,
  },
  title: {
    ...R.palette.title,
    marginBottom: 10,
  },
  subtitle: {
    ...R.palette.title,
    textTransform: 'none',
  },
  error: {
    ...R.palette.normal,
    marginVertical: 20,
  },
});

export default FallbackComponent;