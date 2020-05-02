/**
 * @format
 */

// see https://github.com/facebook/react-native/issues/14796
// Buffer allows to use whatwg-url
import { Buffer } from 'buffer';
global.Buffer = Buffer;

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
