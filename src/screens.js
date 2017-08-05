import { Navigation } from 'react-native-navigation';

import Feed from './modules/feed';
import Login from './modules/login';
import UnauthorizedPage from './modules/unauthorizedPage';
import Signup from './modules/signup';
import PostMoment from './modules/postMoment';
import MomentDetails from './modules/momentDetails';
import ShareScreen from './modules/shareScreen';
import Profile from './modules/profile';
import EditProfile from './modules/editProfile';
import FindUser from './modules/FindUser';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('futuremoments.Feed', () => Feed);
  Navigation.registerComponent('futuremoments.Login', () => Login);
  Navigation.registerComponent('futuremoments.Signup', () => Signup);
  Navigation.registerComponent('futuremoments.UnauthorizedPage', () => UnauthorizedPage);
  Navigation.registerComponent('futuremoments.PostMoment', () => PostMoment);
  Navigation.registerComponent('futuremoments.MomentDetails', () => MomentDetails);
  Navigation.registerComponent('futuremoments.ShareScreen', () => ShareScreen);
  Navigation.registerComponent('futuremoments.Profile', () => Profile);
  Navigation.registerComponent('futuremoments.EditProfile', () => EditProfile);
  Navigation.registerComponent('futuremoments.FindUser', () => FindUser);

}
