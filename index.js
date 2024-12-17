import { AppRegistry } from 'react-native';
import App from '../NoteApplication/src/App'; // Correctly points to App.js in the same directory
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// For web-specific rendering
if (typeof document !== 'undefined') {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('app-root'),
  });
}