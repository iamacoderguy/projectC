/**
 * @format
 */

// see https://github.com/facebook/react-native/issues/14796
// Buffer allows to use whatwg-url
import { Buffer } from 'buffer';
global.Buffer = Buffer;

// https://reactnative.dev/blog/2020/03/26/version-0.62#other-improvements
require('react-native').unstable_enableLogBox();

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
