/**
 * @format
 */

// https://reactnative.dev/blog/2020/03/26/version-0.62#other-improvements
require('react-native').unstable_enableLogBox();

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
