import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivitiesStack } from 'features/activities';
import { BuzzStack } from 'features/buzz';
import { Profile } from 'features/profile';
import { Image, Text, StyleProp, ImageStyle, TouchableWithoutFeedback, View } from 'react-native';
import R from 'shared/res/R';
import styles from './InAppTabs.styles';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { Theme } from 'shared/types/theme';
import { localizer } from 'features/localization';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './InAppTabs.container';

const Tab = createBottomTabNavigator();

const navigationMap = {
  Activities: 'ActivitiesTab',
  Buzz: 'BuzzTab',
  Profile: 'ProfileTab',
};

export type InAppTabsPropsForMapState = {
  lng?: string;
  isLocalizationInstalled?: boolean;
}

export type InAppTabsPropsForMapDispatch = {
  onLanguageChangeTriggered?: (lng: string) => void;

  onLocalizationInstallationTriggered?: () => void;
  onLocalizationUninstallationTriggered?: () => void;
}

type InAppTabsPropsForContainer = InAppTabsPropsForMapState & InAppTabsPropsForMapDispatch;

type InAppTabsProps = InAppTabsPropsForContainer & {}

const InAppTabs: React.FC<InAppTabsProps> = (props: InAppTabsProps) => {
  const [theme, changeTheme] = useState(Theme.Theme1);

  const _handleLanguageChangeTrigger = (lng: string) => {
    if (props.onLanguageChangeTriggered) {
      props.onLanguageChangeTriggered(lng);
    }
  };

  const _handleonLocalizationInstallationTrigger = () => {
    if (props.onLocalizationInstallationTriggered) {
      props.onLocalizationInstallationTriggered();
    }
  };

  const _handleLocalizationUninstallationTrigger = () => {
    if (props.onLocalizationUninstallationTriggered) {
      props.onLocalizationUninstallationTriggered();
    }
  };

  return (
    <Tab.Navigator
      initialRouteName={navigationMap.Buzz}
      screenOptions={({ route }) => ({
        tabBarButton: ({ style, children, ...rest }: BottomTabBarButtonProps) => {
          switch (route.name) {
            case navigationMap.Activities:
            case navigationMap.Profile:
              return (
                <TouchableWithoutFeedback {...rest}>
                  <View style={[style, styles.tabBarButtonNormal.outer]}>
                    <View style={styles.tabBarButtonNormal.shadow} />
                    <View style={styles.tabBarButtonNormal.inner} >
                      {children}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            case navigationMap.Buzz:
              return (
                <TouchableWithoutFeedback {...rest}>
                  <View style={[style, styles.tabBarCenterButton.outer]}>
                    <View style={styles.tabBarCenterButton.circleShadow} />
                    <View style={styles.tabBarCenterButton.rectShadow} />
                    <View style={styles.tabBarCenterButton.inner} />
                    {children}
                  </View>
                </TouchableWithoutFeedback>
              );
            default:
              throw new Error(`Route's name ${route.name} is not supported, yet`);
          }
        },
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused, color }: { focused: boolean, color: string, size: number }) => {
          let iconSource;
          let style: StyleProp<ImageStyle> = { tintColor: color };
          const themeAndIconSoucePairs = {
            [Theme.Theme1]: R.images.ic_nav_buzz_activated_1,
            [Theme.Theme2]: R.images.ic_nav_buzz_activated_2,
            [Theme.Theme3]: R.images.ic_nav_buzz_activated_3,
          };

          switch (route.name) {
            case navigationMap.Activities:
              iconSource = R.images.ic_nav_activities;
              break;
            case navigationMap.Profile:
              iconSource = R.images.ic_nav_profile;
              break;
            case navigationMap.Buzz:
              iconSource = focused ? themeAndIconSoucePairs[theme] : R.images.ic_nav_buzz_inactivated;
              style = {};
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
              labelText = R.strings.inAppTabs.activitiesLabel();
              break;
            case navigationMap.Buzz:
              labelText = R.strings.inAppTabs.buzzLabel();
              break;
            case navigationMap.Profile:
              labelText = R.strings.inAppTabs.profileLabel();
              break;
            default:
              throw new Error(`Route's name ${route.name} is not supported, yet`);
          }

          return <Text style={styles.tabBarLabel(focused, color)}>{labelText.toUpperCase()}</Text>;
        },
      })}
      tabBarOptions={{
        activeTintColor: R.colors.YELLOW,
        inactiveTintColor: R.colors.WHITE,
        style: styles.tabBarClickableRegion,
        tabStyle: styles.tabBar,
      }}
    >
      <Tab.Screen name={navigationMap.Activities} component={ActivitiesStack} />
      <Tab.Screen name={navigationMap.Buzz} component={BuzzStack} />
      <Tab.Screen name={navigationMap.Profile} >
        {() =>
          <Profile
            theme={theme} onThemeChangeTriggered={changeTheme}
            lng={props.lng || localizer.getLanguageCodeOnly()} onLanguageChangeTriggered={_handleLanguageChangeTrigger}
            isLocalizationInstalled={props.isLocalizationInstalled || false}
            onLocalizationInstallationTriggered={_handleonLocalizationInstallationTrigger}
            onLocalizationUninstallationTriggered={_handleLocalizationUninstallationTrigger}
          />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InAppTabs);