import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BuzzScreen from './BuzzScreen';

const Stack = createStackNavigator();

const navigationMap = {
  Buzz: 'Buzz',
};

const BuzzStack = () => {
  return (
    <Stack.Navigator initialRouteName={navigationMap.Buzz}>
      <Stack.Screen name={navigationMap.Buzz} component={BuzzScreen} />
    </Stack.Navigator>
  );
};

export default BuzzStack;