/**
 * @format
 * CommonJS entry so URL polyfill runs before `react-native` loads (see polyfills/setup-url.js).
 */

require('./polyfills/setup-url');

const {AppRegistry} = require('react-native');
const App = require('./App').default;
const {name: appName} = require('./app.json');

AppRegistry.registerComponent(appName, () => App);
