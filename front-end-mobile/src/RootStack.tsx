/* eslint-disable react/prop-types */
import React, { Ref, forwardRef, useImperativeHandle } from 'react';
import LoadingScreen from 'lib/components/loading/LoadingScreen';
import { Authentication } from 'features/authentication';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps, Stage } from './RootStack.container';
import InAppTabs from './InAppTabs';

export type RootStackPropsForMapState = {
  stage: Stage;
}

export type RootStackPropsForMapDispatch = {
  onAppStarted: (stage: Stage) => void;
  onAppFinished: () => void;
  onAuthenticationFinished: (token: string) => void;
}

export interface IRootStack {
  start: () => void;
  finish: () => void;
}

type RootStackProps = RootStackPropsForMapState & RootStackPropsForMapDispatch;

const RootStack = (props: RootStackProps & { myForwardedRef: Ref<IRootStack> }) => {
  useImperativeHandle(props.myForwardedRef, () => ({
    start: () => props.onAppStarted(props.stage),
    finish: () => props.onAppFinished(),
  }));

  const _render = () => {
    switch (props.stage) {
      case Stage.Authenticating:
        return <Authentication onAuthenticated={props.onAuthenticationFinished} testMode />;

      case Stage.InApp:
        return <InAppTabs />;

      case Stage.Loading:
      default:
        return <LoadingScreen />;
    }
  };

  return (<>{_render()}</>);
};

const ConnectedRootStack = connect(mapStateToProps, mapDispatchToProps)(RootStack);

// eslint-disable-next-line react/display-name
export default forwardRef((props: {}, ref: Ref<IRootStack>) => <ConnectedRootStack {...props} myForwardedRef={ref} />);