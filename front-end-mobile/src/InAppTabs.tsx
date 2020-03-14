import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivitiesStack } from 'features/activities';
import { BuzzStack } from 'features/buzz';
import { ProfileStack } from 'features/profile';
import { Image, Text, View, StyleProp, ViewStyle } from 'react-native';
import R from 'res/R';

const Tab = createBottomTabNavigator();

const navigationMap = {
  Activities: 'ActivitiesTab',
  Buzz: 'BuzzTab',
  Profile: 'ProfileTab',
};

const InAppTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={navigationMap.Buzz}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ color }: { focused: boolean, color: string, size: number }) => {
          let iconSource;

          switch (route.name) {
            case navigationMap.Activities:
              iconSource = R.images.ic_nav_activities;
              break;
            case navigationMap.Buzz:
              iconSource = R.images.ic_nav_buzz;
              break;
            case navigationMap.Profile:
              iconSource = R.images.ic_nav_profile;
              break;
            default:
              throw new Error(`Route's name ${route.name} is not supported, yet`);
          }

          return <Image source={iconSource} style={{ tintColor: color }} />;
        },
        // eslint-disable-next-line react/display-name
        tabBarLabel: ({ focused, color }: { focused: boolean, color: string }) => {
          let labelText;
          switch (route.name) {
            case navigationMap.Activities:
              labelText = R.strings.inAppTabs.activitiesLabel;
              break;
            case navigationMap.Buzz:
              labelText = R.strings.inAppTabs.buzzLabel;
              break;
            case navigationMap.Profile:
              labelText = R.strings.inAppTabs.profileLabel;
              break;
            default:
              throw new Error(`Route's name ${route.name} is not supported, yet`);
          }

          return <Text style={{ fontSize: 12, lineHeight: 14, color: color, fontWeight: focused ? 'bold' : 'normal', marginBottom: 5 }} >{labelText.toUpperCase()}</Text>;
        },
      })}
      tabBarOptions={{
        activeTintColor: R.colors.YELLOW,
        inactiveTintColor: R.colors.WHITE,
        style: {
          height: 75,
          backgroundColor: R.colors.BLACK,
        },
      }}
    >
      <Tab.Screen name={navigationMap.Activities} component={ActivitiesStack} />
      <Tab.Screen name={navigationMap.Buzz} component={BuzzStack} />
      <Tab.Screen name={navigationMap.Profile} component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default InAppTabs;