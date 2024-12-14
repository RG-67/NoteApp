import { AppRegistry } from 'react-native';
import App from '../NoteApplication/src/App'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Render the app to the web
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});