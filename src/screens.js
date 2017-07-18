import { Navigation } from 'react-native-navigation';

import SampleAppMovies from './modules/feed';
import PostMoment from './modules/postMoment';
import MomentDetails from './modules/momentDetails';
import ShareScreen from './modules/shareScreen';
import Profile from './modules/profile';
import EditProfile from './modules/editProfile';
import Notifications from './modules/notifications';




// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('futuremoments.SampleAppMovies', () => SampleAppMovies);
  Navigation.registerComponent('futuremoments.PostMoment', () => PostMoment);
  Navigation.registerComponent('futuremoments.MomentDetails', () => MomentDetails);
  Navigation.registerComponent('futuremoments.ShareScreen', () => ShareScreen);
  Navigation.registerComponent('futuremoments.Profile', () => Profile);
  Navigation.registerComponent('futuremoments.EditProfile', () => EditProfile);
  Navigation.registerComponent('futuremoments.Notifications', () => Notifications);

}
