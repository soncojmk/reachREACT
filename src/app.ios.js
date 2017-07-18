import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { Provider } from "react-redux"
import { Text, AppState, AsyncStorage, View, StyleSheet, AppRegistry } from "react-native"
import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk";

import { registerScreens } from './screens';
import logger from "redux-logger"
import * as reducers from "./reducers";

import PostMoment from './modules/postMoment';
import MomentDetails from './modules/momentDetails';
import ShareScreen from './modules/shareScreen';
import Profile from './modules/profile';
import EditProfile from './modules/editProfile';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);


registerScreens(store, Provider);

const navigatorStyle = {
  navBarTranslucent: false,
  drawUnderNavBar: true,
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  statusBarTextColorScheme: 'light',
  drawUnderTabBar: true
};

export default class APPS extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        store: store,
        token: null
      }
      this.startFeed();
    }

  componentWillMount() {
    AsyncStorage.getItem('token').then((tokenValue) => {
      this.token = JSON.parse(tokenValue)
      this.setState({
        isLoading: false
        });
      });
  }

  render() {

  concole.log("rendeer");
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

renderLoadingView() {
  console.log("renderloadingview");
  if(this.state.isLoading){

    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }
}



startLogin() {
// start the app
console.log("loginpage");
Navigation.startSingleScreenApp({
          screen: {
            screen: 'futuremoments.Login',
            title: 'Login',
            navigatorStyle: {}
          }
        });
}

startFeed(){
  console.log("feed");
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Feed',
          screen: 'futuremoments.Feed', // this is a registered name for a screen
          //icon: require('../img/one.png'),
          //selectedIcon: require('../img/one_selected.png'), // iOS only
          title: 'Feed'
        },
        {
      label: 'Post',
      screen: 'futuremoments.PostMoment',
      //icon: require('../img/two.png'),
      //selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Share a Moment'
    },
    {
      label: 'Profile',
      screen: 'futuremoments.Profile',
      //icon: require('../img/two.png'),
      //selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Profile'
    },
      ]
    });
}


}

//AppRegistry.registerComponent('App', () => App);



var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});


// export default App;
