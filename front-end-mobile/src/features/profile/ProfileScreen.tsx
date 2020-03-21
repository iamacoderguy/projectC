import React from 'react';
import { Text, View, Button } from 'react-native';
import R from 'res/R';
import { Theme } from 'lib/types/theme';

type ProfileScreenProps = {
  onThemeChanged: (theme: Theme) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = (props: ProfileScreenProps) => {
  return (
    <View style={{ backgroundColor: R.colors.WHITE, flex: 1 }}>
      <Text>ProfileScreen.tsx</Text>
      <Button title="Theme 1" onPress={() => props.onThemeChanged(Theme.Theme1)}/>
      <Button title="Theme 2" onPress={() => props.onThemeChanged(Theme.Theme2)}/>
      <Button title="Theme 3" onPress={() => props.onThemeChanged(Theme.Theme3)}/>
    </View>
  );
};

export default ProfileScreen;