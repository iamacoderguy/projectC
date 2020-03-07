import React, { useState } from 'react';
import { LoadingScreen } from 'features/loading';
import { AuthenticationStack } from 'features/authentication';
import { Text } from 'react-native';

const RootStack = () => {
  const [isLoading, handleLoadingFinished] = useState(true);
  const [token, handleAuthentication] = useState('');

  const _render = () => {
    if (isLoading) {
      return <LoadingScreen onLoadingFinished={() => handleLoadingFinished(false)} />;
    }

    if (token === '') {
      return <AuthenticationStack onAuthenticated={(token: string) => handleAuthentication(token)}/>;
    }

    return <Text>{token}</Text>;
  };

  return (
    <>
      {_render()}
    </>
  );
};

export default RootStack;