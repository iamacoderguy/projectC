import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const rootNavigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (screenName: string, params?: any) => {
  rootNavigationRef.current?.navigate(screenName, params);
};