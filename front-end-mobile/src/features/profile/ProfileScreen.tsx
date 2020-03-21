import React from 'react';
import { Text, View, Button } from 'react-native';
import R from 'res/R';
import { Theme } from 'lib/types/theme';

type ProfileScreenProps = {
  lng: string;
  onLanguageChanged: (lng: string) => void;

  theme: Theme;
  onThemeChanged: (theme: Theme) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = (props: ProfileScreenProps) => {
  return (
    <View style={{ backgroundColor: R.colors.WHITE, flex: 1 }}>

      <View style={{ flexDirection: 'row', width: '100%' }} >
        <View style={{ flex: 1 }}>
          <Button title="Theme 1" onPress={() => props.onThemeChanged(Theme.Theme1)} disabled={props.theme == Theme.Theme1} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Theme 2" onPress={() => props.onThemeChanged(Theme.Theme2)} disabled={props.theme == Theme.Theme2} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Theme 3" onPress={() => props.onThemeChanged(Theme.Theme3)} disabled={props.theme == Theme.Theme3} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', width: '100%' }} >
        <View style={{ flex: 1 }}>
          <Button title="Change to vi" onPress={() => props.onLanguageChanged('vi')} disabled={props.lng == 'vi'} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Change to en" onPress={() => props.onLanguageChanged('en')} disabled={props.lng == 'en'} />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;