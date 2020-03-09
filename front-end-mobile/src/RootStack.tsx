import React from 'react';
import { LoadingScreen } from 'features/loading';
import { AuthenticationStack } from 'features/authentication';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivitiesStack } from 'features/activities';
import { BuzzStack } from 'features/buzz';
import { ProfileStack } from 'features/profile';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps, Stage } from './RootStack.container';

type RootStackProps = {
  stage: Stage;
  onLoadingFinished: () => void;
  onAuthenticationFinished: (token: string) => void;
}

const RootStack : React.FunctionComponent<RootStackProps> = ({
  stage,
  onLoadingFinished,
  onAuthenticationFinished,
} : RootStackProps) => {
  const _render = () => {
    switch (stage) {
      case Stage.Authenticating:
        return <AuthenticationStack onAuthenticated={onAuthenticationFinished}/>;

      case Stage.InApp:
        return <InAppTabs />;
    
      case Stage.Loading:
      default:
        return <LoadingScreen onLoadingFinished={onLoadingFinished} />;
    }
  };

  return (<>{_render()}</>);
};

export default connect(mapStateToProps, mapDispatchToProps)(RootStack);

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