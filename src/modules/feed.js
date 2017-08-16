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
import EventDetailsView from './eventDetailsView';

const placeholder = require('../images/placeholder.jpg');
var REQUEST_URL = 'https://www.wpoppin.com/api/filteredevents.json';

export default class Feed extends Component {

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

  fetchData() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token 30d7ec16a933d5f934745add649b8c1e1d4000c2');
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


  saveEvent(event) {
    console.log('saveevent ' + event.url)

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token 30d7ec16a933d5f934745add649b8c1e1d4000c2');

    current_method = ''
    if(event.save_status == 'false'){
      current_method = 'POST'
      console.log('saveevent POST' + event.save_status)
    }else{
      current_method = 'DELETE'
        console.log('saveevent DELETE' + event.save_status)
    }

    var myInit = { method: current_method,
             headers: myHeaders,
           };
    url = event.url.replace('.json', '/save/')
    fetch(url, myInit)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('saveevent ' + responseData)
        this.setState({
          loaded: false,
        });
        this.fetchData();
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


  onObjectPress(object_url, object_title){
    this.props.navigator.push({
        screen: 'futuremoments.EventDetailsView', // unique ID registered with Navigation.registerScreen
        title: object_title, // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
        // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
      passProps: {url: object_url}, // simple serializable object that will pass as props to all top screens (optional)
      animationType: 'slide-down'
    });
}

getPeopleSaving(user_url, event_url){

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

  renderMovie = (event) => {

    button_text = 'like'
    if(event.save_status == 'true'){
      button_text = 'unlike'
    }
    return (

      <View style={styles.container}>

        <View style={styles.rightContainer}>

        <View style={styles.horizontalContainer}>
        <View>
        {event.account.avatar ?
        <Image
            source={{uri: event.account.avatar}}
          style={styles.avatar}/> :
          <Image
              source={placeholder}
            style={styles.avatar}/> }

            <Text style={styles.year}>{event.account.user.username}</Text>

        </View>

        <TouchableOpacity  onPress = {() => this.onObjectPress(event.url, event.title)}>
          <Text  style={styles.title}>{event.title}</Text>
          <Text  style={styles.year}>{event.street_address}</Text>
        </TouchableOpacity>
        </View>

        {event.image ?
        <Image
            source={{uri: event.image}}
          style={styles.thumbnail}/> : <Image
            
            style={styles.thumbnail}/> }

        <View style={styles.horizontalContainer}>

            <TouchableOpacity  onPress = {() => this.saveEvent(event)}>
                <View>
                  <Text >{event.num_attending} {button_text}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress = {() => this.onObjectPress(event.url, event.title)}>
                <View>
                  <Text >{event.num_comments} comments</Text>
                </View>

            </TouchableOpacity>
        </View>

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
    marginBottom: 10,
  },
  rightContainer: {
    flex: 1,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'left',
  },
  thumbnail: {
    width: 600,
    height: 200,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,

  },

  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
