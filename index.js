import { AppRegistry,Text } from 'react-native';
import App from './App';
import RootScene from './src/RootScene'
Text.defaultProps.allowFontScaling = false
AppRegistry.registerComponent('wanted', () => RootScene);
