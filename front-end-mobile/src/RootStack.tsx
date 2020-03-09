import React from 'react';
import { LoadingScreen } from 'features/loading';
import { AuthenticationStack } from 'features/authentication';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps, Stage } from './RootStack.container';
import InAppTabs from './InAppTabs';

type RootStackProps = {
  stage: Stage;
  onLoadingStarted: () => void;
  onAuthenticationFinished: (token: string) => void;
  onAppFinished: () => void;
}

const RootStack : React.FunctionComponent<RootStackProps> = ({
  stage,
  onLoadingStarted,
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
        return <LoadingScreen onLoadingStarted={onLoadingStarted} />;
    }
  };

  return (<>{_render()}</>);
};

export default connect(mapStateToProps, mapDispatchToProps)(RootStack);