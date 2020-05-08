import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Button from 'shared/components/button/Button';
import toast from 'shared/utils/toast';
import StatusBar from 'shared/components/statusBar/StatusBar';
import R from 'shared/res/R';

const ToastSandbox: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor={R.colors.WHITE} barStyle='dark-content' />
      <View style={styles.container}>
        <Button
          style={styles.button}
          title={'Error'}
          onPress={() => {
            toast.error('This is an error popup');
            console.error('This is an error popup');
          }}
        />
        <Button
          style={styles.button}
          title={'Warn'}
          onPress={() => {
            toast.warn('This is an error popup');
            console.warn('This is a warn popup');
          }}
        />
        <Button
          style={styles.button}
          title={'Info'}
          onPress={() => {
            toast.info('This is an info popup');
          }}
        />
        <Button
          style={styles.button}
          title={'Success'}
          onPress={() => {
            toast.success('This is a success popup');
          }}
        />
        <Button
          style={styles.button}
          title={'Log'}
          onPress={() => {
            toast.log('This is a log popup');
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    marginBottom: 20,
  },
});

export default ToastSandbox;