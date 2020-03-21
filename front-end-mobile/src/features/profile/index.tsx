import React from 'react';
import { Theme } from 'lib/types/theme';
import ProfileStack from './ProfileStack';

type ProfileProps = {
  lng: string;
  onLanguageChanged: (lng: string) => void;

  theme: Theme;
  onThemeChanged: (theme: Theme) => void
}

// TODO: https://github.com/iamacoderguy/projectC/issues/57
// Profile module should provide an ITheme (e.g. {name: string})
// When using the Profile module, we should put a list of available themes which follows ITheme format
// Profile module will display the list dynamically
export const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  return (
    <ProfileStack
      theme={props.theme} onThemeChanged={props.onThemeChanged}
      lng={props.lng} onLanguageChanged={props.onLanguageChanged}
    />
  );
};