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


var REQUEST_URL = 'https://www.wpoppin.com/api/notificationfeed.json';

export default class Notification extends Component {

//for add friends button top nav
 //  static navigatorButtons = {
 //   rightButtons: [
 //     {
 //       title: 'add friends', // for a textual button, provide the button title (label)
 //       id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
 //       testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
 //       buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
 //       buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
 //       buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
 //     }
 //   ]
 // };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      token:"",
    };
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

//on navigator for add friends top nav button
  // onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
  //   if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
  //     if (event.id == 'add') { // this is the same id field from the static navigatorButtons definition
  //       this.props.navigator.push({
  //                   screen: 'futuremoments.FindUser',
  //                   //title: 'FindUser',
  //                   navigatorStyle: {}
  //               });
  //     }
  //   }
  // }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {


      await AsyncStorage.getItem('token').then((tokenValue) => {
        this.token = JSON.parse(tokenValue)
        console.log("token componentWillMount usr " + this.token);
        });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token ' + this.token);

    var myInit = { method: 'GET',
             headers: myHeaders,
           };
    fetch(REQUEST_URL, myInit)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  onUserPress (object_url, object_title) {
    this.props.navigator.push({
        screen: 'futuremoments.UserDetailsView', // unique ID registered with Navigation.registerScreen
        title: object_title, // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
        // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
      passProps: {url: object_url}, // simple serializable object that will pass as props to all top screens (optional)
      animationType: 'slide-down'
    });
  }


  followUser(user) {
    console.log('followuser ' + user.url)

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token a9edb73eb1ecfa66b87037cbfeada07406749f96');

    current_method = ''
    if(user.follow_status == 'follow'){
      current_method = 'POST'
      console.log('followuser POST' + user.follow_status)
    }else if (user.follow_status == 'requested'){
      current_method = 'DELETE'
        console.log('followuser DELETE' + user.follow_status)
    }else if (user.follow_status == 'following'){
      current_method = 'DELETE'
        console.log('followuser DELETE' + user.follow_status)
    }else {
      current_method = 'DELETE'
        console.log('followuser DELETE' + user.follow_status)
    }

    var myInit = {
             method: current_method,
             headers: myHeaders,
           };
    url = user.url + 'follow/'
      console.log('followuser ' + url)
    fetch(url, myInit)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('saveevent ' + responseData)
        this.setState({
          reloading: true,
        });
        this.fetchData();
      })
      .done();
  }



  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>

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

  renderMovie = (movie) => {

    return (

      <View style={styles.container}>
        <Image
          //source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
            <Text style={styles.title}> <Text style={styles.thumbnail}  onPress = {() => this.onUserPress(movie.actor_account.url, movie.actor)}> {movie.actor}</Text> {movie.verb}
            {movie.action_object_event ? <Text style={styles.thumbnail}  onPress = {() => this.onEventPress(movie.action_object_event.url, movie.action_object_event.title)}>
            <Text> {movie.action_object_event.title}</Text></Text>:<Text onPress = {() => this.followUser(movie.recipient_account)}>Accept Request</Text>}</Text>

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
    width: 5,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
