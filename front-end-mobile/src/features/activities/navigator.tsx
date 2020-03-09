import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitiesScreen from './ActivitiesScreen';

const Stack = createStackNavigator();

const navigationMap = {
  Activities: 'Activities',
};

const ActivitiesStack = () => {
  return (
    <Stack.Navigator initialRouteName={navigationMap.Activities}>
      <Stack.Screen name={navigationMap.Activities} component={ActivitiesScreen} />
    </Stack.Navigator>
  );
};

export default ActivitiesStack;