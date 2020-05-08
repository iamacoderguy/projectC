/* eslint-disable react/prop-types */
import React, { Ref, forwardRef, useImperativeHandle } from 'react';
import LoadingScreen from 'shared/components/loading/LoadingScreen';
import { Authentication } from 'features/authentication';
import { connect } from 'react-redux';
import {
  mapDispatchToProps,
  mapStateToProps,
  Stage,
  RootStackPropsForMapState,
  RootStackPropsForMapDispatch,
} from './RootStack.container';
import InAppTabs from '../inAppTabs/InAppTabs';

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
        return <Authentication
          refreshToken={props.refreshToken}
          idToken={props.idToken}
          onAuthenticated={props.onAuthenticated}
          onSignedOut={props.onSignedOut}
        />;

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