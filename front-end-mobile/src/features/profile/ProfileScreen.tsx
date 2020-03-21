import React from 'react';
import { View, Button } from 'react-native';
import R from 'res/R';
import { Theme } from 'lib/types/theme';

export type ProfileScreenPropsForOutput = {
  theme: Theme;
  onThemeChangeTriggered: (theme: Theme) => void;

  lng: string;
  onLanguageChangeTriggered: (lng: string) => void;

  isLocalizationInstalled: boolean;
  onLocalizationInstallationTriggered: () => void;
  onLocalizationUninstallationTriggered: () => void;
}

type ProfileScreenProps = ProfileScreenPropsForOutput & {}

const ProfileScreen: React.FC<ProfileScreenProps> = (props: ProfileScreenProps) => {
  return (
    <View style={{ backgroundColor: R.colors.WHITE, flex: 1 }}>

      <View style={{ flexDirection: 'row', width: '100%' }} >
        <View style={{ flex: 1 }}>
          <Button title="Theme 1" onPress={() => props.onThemeChangeTriggered(Theme.Theme1)} disabled={props.theme == Theme.Theme1} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Theme 2" onPress={() => props.onThemeChangeTriggered(Theme.Theme2)} disabled={props.theme == Theme.Theme2} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Theme 3" onPress={() => props.onThemeChangeTriggered(Theme.Theme3)} disabled={props.theme == Theme.Theme3} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', width: '100%' }} >
        <View style={{ flex: 1 }}>
          <Button title="Change to vi" onPress={() => props.onLanguageChangeTriggered('vi')} disabled={props.lng == 'vi'} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Change to en" onPress={() => props.onLanguageChangeTriggered('en')} disabled={props.lng == 'en'} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', width: '100%' }} >
        <View style={{ flex: 1 }}>
          <Button title="Install localization" onPress={props.onLocalizationInstallationTriggered} disabled={props.isLocalizationInstalled} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Uninstall localization" onPress={props.onLocalizationUninstallationTriggered} disabled={!props.isLocalizationInstalled} />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;