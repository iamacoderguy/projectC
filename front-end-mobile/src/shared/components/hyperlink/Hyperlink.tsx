import React from 'react';
import HyperlinkRN from 'react-native-hyperlink';
import {
  StyleProp,
  TextStyle,
  Text,
  StyleSheet,
} from 'react-native';
import R from 'shared/res/R';
import { convertToReactNativeHyperlink, generateLinkTexts } from './Hyperlink.container';

export type HyperlinkProps = {
  style?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
  links: Array<string>;
  children: string;
  disabled?: boolean;
  onPress?: (url: string, text: string) => void;
}

const Hyperlink: React.FC<HyperlinkProps> = (props: HyperlinkProps) => {
  return (
    <HyperlinkRN
      linkDefault={!props.disabled && !props.onPress}
      linkStyle={{ ...styles.linkStyle, ...(props.linkStyle as object) }}
      linkText={generateLinkTexts(props.children, props.links || [])}
      onPress={props.onPress}
    >
      <Text style={props.style}>
        {convertToReactNativeHyperlink(props.children, props.links || [])}
      </Text>
    </HyperlinkRN>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  linkStyle: {
    ...R.palette.hyperlink,
  },
});

export default Hyperlink;