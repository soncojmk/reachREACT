import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';

import { registerScreens } from './screens';

registerScreens(); // this is where you register all of your app's screens

const navigatorStyle = {
  navBarTranslucent: false,
  drawUnderNavBar: true,
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  statusBarTextColorScheme: 'light',
  drawUnderTabBar: true
};

class App extends Component {
  constructor(props) {
    super(props);

      this.startApp();
  }

  startApp() {
// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'futuremoments.SampleAppMovies', // this is a registered name for a screen
      //icon: require('../img/one.png'),
      //selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Screen One'
    },
    {
      label: 'Post',
      screen: 'futuremoments.PostMoment',
      //icon: require('../img/two.png'),
      //selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Screen Three'
    },
    {
      label: 'Three',
      screen: 'futuremoments.SampleAppMovies',
      //icon: require('../img/two.png'),
      //selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Screen Two'
    },
  ]
});

  }
}

export default App;
