import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { Provider } from "react-redux"
import { Text, AppState, AsyncStorage, View, StyleSheet, AppRegistry } from "react-native"
import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk";

import { registerScreens } from './src/screens';
import logger from "redux-logger"
import * as reducers from "./src/reducers";

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

export default class App extends Component {

  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        store: store,
        token: null
      }
}

  componentWillMount() {
      this.getCache();
  }

  async getCache(){
    await AsyncStorage.getItem('token').then((tokenValue) => {
      this.token = JSON.parse(tokenValue)
      console.log("token componentWillMount usr" + tokenValue);
      this.setState({
        isLoading: false
        });
      });
  }

  render() {

  console.log("rendeer");
    if(this.state.isLoading){
      return this.renderLoadingView();
    }
    if(this.token){
      console.log("rendeer token");
      return this.startFeed();
    }else{
      console.log("rendeer no  token");
      return this.startUnauthorizedPage();
    }
  }

renderLoadingView() {
  console.log("renderloadingview");
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    );
}

startUnauthorizedPage() {
// start the app
console.log("loginpage");
Navigation.startSingleScreenApp({
          screen: {
            screen: 'futuremoments.UnauthorizedPage',
            //title: '',
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


Navigation.registerComponent('App', () => App);
Navigation.startSingleScreenApp({
  screen: {
    screen: 'App',
    title: 'App'
  }
});
