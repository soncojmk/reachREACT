import { Navigation } from 'react-native-navigation';

import SampleAppMovies from './modules/feed';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('futuremoments.SampleAppMovies', () => SampleAppMovies);
 
}