/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import UnauthorizedPage from './unauthorizedPage';


var REQUEST_URL = 'https://www.wpoppin.com/api/filteredevents.json';

export default class Feed extends Component {

  static navigatorButtons = {
   rightButtons: [
     {
       title: 'add friends', // for a textual button, provide the button title (label)
       id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
       testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
       buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
       buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
       buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
     }
   ]
 };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'add') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.push({
                    screen: 'futuremoments.FindUser',
                    //title: 'FindUser',
                    navigatorStyle: {}
                });
      }
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  async userLogout(){

    try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('username');
        console.log(await AsyncStorage.getItem('token'));
    } catch (error) {
      console.log("asyncstorage error " + error);
    }
    Navigation.startSingleScreenApp({
              screen: {
                screen: 'futuremoments.UnauthorizedPage',
                //title: 'Login',
                navigatorStyle: {}
              }
            });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
      <TouchableOpacity activeOpacity={.5}
        onPress={() => this.userLogout()}>
      <View>
        <Text >Logout</Text>
      </View>
    </TouchableOpacity>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}/>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (

      <View style={styles.container}>
        <Image
          //source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.title}</Text>
        </View>
      </View>
    );
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
