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
import Notification from './modules/notification';
import EventDetailsView from './modules/eventDetailsView';
import UserDetailsView from './modules/userDetailsView';
import PostNew from './modules/postNew';
import AddEventDetailsPage from './modules/addEventDetailsPage';
import AddEventDetailsPage2 from './modules/addEventDetailsPage2';

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
  Navigation.registerComponent('futuremoments.Notification', () => Notification);
  Navigation.registerComponent('futuremoments.EventDetailsView', () => EventDetailsView);
  Navigation.registerComponent('futuremoments.UserDetailsView', () => UserDetailsView);
  Navigation.registerComponent('futuremoments.PostNew', () => PostNew);
  Navigation.registerComponent('futuremoments.AddEventDetailsPage', () => AddEventDetailsPage);
  Navigation.registerComponent('futuremoments.AddEventDetailsPage2', () => AddEventDetailsPage2);
}
