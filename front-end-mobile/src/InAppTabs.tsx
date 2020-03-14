import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivitiesStack } from 'features/activities';
import { BuzzStack } from 'features/buzz';
import { ProfileStack } from 'features/profile';
import { Image, Text, StyleProp, ImageStyle } from 'react-native';
import R from 'res/R';
import styles from './InAppTabs.styles';

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
        tabBarIcon: ({ focused, color }: { focused: boolean, color: string, size: number }) => {
          let iconSource;
          let style: StyleProp<ImageStyle>;

          switch (route.name) {
            case navigationMap.Activities:
              iconSource = R.images.ic_nav_activities;
              style = { tintColor: color };
              break;
            case navigationMap.Buzz:
              iconSource = focused ? R.images.ic_buzz_actiavated : R.images.ic_buzz_inactiavated;
              style = { position: 'absolute', top: -28 };
              break;
            case navigationMap.Profile:
              iconSource = R.images.ic_nav_profile;
              style = { tintColor: color };
              break;
            default:
              throw new Error(`Route's name ${route.name} is not supported, yet`);
          }

          return <Image style={style} source={iconSource} />;
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

          return <Text style={styles(focused, color).labelStyle}>{labelText.toUpperCase()}</Text>;
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