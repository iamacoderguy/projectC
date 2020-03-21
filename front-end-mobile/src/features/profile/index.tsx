import React from 'react';
import { Theme } from 'lib/types/theme';
import ProfileStack from './ProfileStack';

type ProfileProps = {
  locale: string;
  onLanguageChanged: (lng: string) => void;
  onThemeChanged: (theme: Theme) => void
}

// TODO: https://github.com/iamacoderguy/projectC/issues/57
// Profile module should provide an ITheme (e.g. {name: string})
// When using the Profile module, we should put a list of available themes which follows ITheme format
// Profile module will display the list dynamically
export const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  return (
    <ProfileStack
      onThemeChanged={props.onThemeChanged}
      locale={props.locale} onLanguageChanged={props.onLanguageChanged}
    />
  );
};