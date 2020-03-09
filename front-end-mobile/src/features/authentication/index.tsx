import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import AuthenticationStack from './AuthenticationStack';

type AuthProps = {
  onAuthenticated: (token: string) => void
}

export const Authentication = (props: AuthProps) => {
  return (
    <Provider store={store}>
      <AuthenticationStack onAuthenticated={props.onAuthenticated} />
    </Provider>
  );
};