import React, { useState } from 'react';
import { LoadingScreen } from 'features/loading';
import { AuthenticationStack } from 'features/authentication';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivitiesStack } from 'features/activities';
import { BuzzStack } from 'features/buzz';
import { ProfileStack } from 'features/profile';

const Tab = createBottomTabNavigator();

const navigationMap = {
  Activities: 'ActivitiesTab',
  Buzz: 'BuzzTab',
  Profile: 'ProfileTab',
};

const InAppTabs = () => {  
  return (
    <Tab.Navigator initialRouteName={navigationMap.Buzz}>
      <Tab.Screen name={navigationMap.Activities} component={ActivitiesStack} />
      <Tab.Screen name={navigationMap.Buzz} component={BuzzStack} />
      <Tab.Screen name={navigationMap.Profile} component={ProfileStack} />
    </Tab.Navigator>
  );
};

const RootStack = () => {
  const [isLoading, handleLoadingFinished] = useState(true);
  const [token, setToken] = useState('');

  const _handleAuthentication = (token: string) => {
    setToken(token);
    //TODO: store token to storage
  };

  const _render = () => {
    if (isLoading) {
      return <LoadingScreen onLoadingFinished={() => handleLoadingFinished(false)} />;
    }

    if (token === '') {
      return <AuthenticationStack onAuthenticated={(token: string) => _handleAuthentication(token)} />;
    }

    return <InAppTabs />;
  };

  return (
    <>
      {_render()}
    </>
  );
};

export default RootStack;