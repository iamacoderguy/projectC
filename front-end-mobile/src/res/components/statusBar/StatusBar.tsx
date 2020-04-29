import React from 'react';
import { StatusBar as StatusBarRN, SafeAreaView, StatusBarProps } from 'react-native';

const StatusBar: React.FC<StatusBarProps> = (props: StatusBarProps) => {
  return (
    <>
      <StatusBarRN {...props} />
      <SafeAreaView style={{
        flex: 0,
        backgroundColor: props.backgroundColor,
      }} />
    </>
  );
};

export default StatusBar;