import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { Provider } from "react-redux"
import { Text, AppState, AsyncStorage, View, StyleSheet, AppRegistry } from "react-native"
import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk";

import { registerScreens } from './screens';
import logger from "redux-logger"
import * as reducers from "./reducers";

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
          label: 'One',
          screen: 'futuremoments.SampleAppMovies', // this is a registered name for a screen
          //icon: require('../img/one.png'),
          //selectedIcon: require('../img/one_selected.png'), // iOS only
          title: 'Screen One'
        },
        {
          label: 'Two',
          screen: 'futuremoments.SampleAppMovies',
          //icon: require('../img/two.png'),
          //selectedIcon: require('../img/two_selected.png'), // iOS only
          title: 'Screen Two'
        }
      ]
    });
}


}

export default App;
