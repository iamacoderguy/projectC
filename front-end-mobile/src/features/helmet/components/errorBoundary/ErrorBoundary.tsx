import React from 'react';
import ErrorBoundaryRN, {
  ErrorBoundaryProps as ErrorBoundaryRNProps,
} from 'react-native-error-boundary';

import Fallback from './Fallback';

type ErrorBoundaryProps = ErrorBoundaryRNProps;

const ErrorBoundary: React.FC<ErrorBoundaryProps> = (props: ErrorBoundaryProps) => {
  const { FallbackComponent, ...otherProps } = props;
  return (
    <ErrorBoundaryRN FallbackComponent={Fallback} {...otherProps} />
  );
};

export default ErrorBoundary;