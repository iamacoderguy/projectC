import React from 'react';
import HyperlinkRN from 'react-native-hyperlink';
import {
  StyleProp,
  TextStyle,
  Text,
  StyleSheet,
} from 'react-native';
import R from 'res/R';
import { convertToReactNativeHyperlink, generateLinkTexts } from './Hyperlink.container';

type HyperlinkProps = {
  style?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
  links?: Array<string>;
  children: string;
  disabled?: boolean;
}

const Hyperlink: React.FC<HyperlinkProps> = (props: HyperlinkProps) => {
  return (
    <HyperlinkRN
      linkDefault={!props.disabled}
      linkStyle={{ ...styles.linkStyle, ...(props.linkStyle as object) }}
      linkText={generateLinkTexts(props.children, props.links || [])}
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