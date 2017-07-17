import { Navigation } from 'react-native-navigation';

import SampleAppMovies from './modules/feed';
import Login from './modules/login';
import UnauthorizedPage from './modules/unauthorizedPage';
import Signup from './modules/signup';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('futuremoments.SampleAppMovies', () => SampleAppMovies);
  Navigation.registerComponent('futuremoments.Login', () => Login);
  Navigation.registerComponent('futuremoments.Signup', () => Signup);
  Navigation.registerComponent('futuremoments.UnauthorizedPage', () => UnauthorizedPage);
}
