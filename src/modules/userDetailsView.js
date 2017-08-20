
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
  Button,
  TouchableOpacity,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import UnauthorizedPage from './unauthorizedPage';

var REQUEST_URL = 'https://www.wpoppin.com/api/events/386/';
const placeholder = require('../images/placeholder.jpg');

export default class UserDetailsView extends Component {

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
    this.fetchData();
    this.state = {
      url: this.props.url,
      username: '',
      num_followers: '',
      num_following:'',
      num_requesting:'',
      avatar:'',
      about:'',
      follow_status:'',
      college:'',
      loaded: false,
    };
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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


  parseResponse(userObject){
    console.log("details object" + userObject);
    console.log("details user " + userObject["user"]["username"])
    this.setState({
      avatar: userObject["avatar"],
      about: userObject["about"],
      url: userObject["url"],
      num_following: userObject["num_following"],
      num_followers: userObject["num_followers"],
      college: userObject["college"],
      follow_status: userObject["follow_status"],
      username: userObject["user"]["username"],
      loaded:true,
    })
  }

  fetchData() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token 30d7ec16a933d5f934745add649b8c1e1d4000c2');
    var myInit = { method: 'GET',
             headers: myHeaders,
           };
           console.log('props url' + this.props.url)
    fetch(this.props.url, myInit)
    .then((response) => response.json())
    .then((responseData) => {
        this.parseResponse(responseData)
      })
      .done();
  }

  capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }



  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    username = this.capitalizeFirstLetter(this.state.username)
    follow_status = this.capitalizeFirstLetter(this.state.follow_status).toString()
    return (

      <View style={styles.container}>
      <View style={styles.padding}>
      <View style={styles.horizontalContainer}>
    <TouchableOpacity>
            {this.state.avatar ?
            <Image
                source={{uri: this.state.avatar}}
              style={styles.avatar}/> :
              <Image
                  source={placeholder}
                style={styles.avatar}/> }


    </TouchableOpacity>
    <View style={styles.padding}>
      < View>
      <Text style={styles.title}>{username}</Text>

          <Text style={styles.year}>{this.state.num_followers} followers    {this.state.num_following} following </Text>
            <View style={styles.separator} />

            <Button title={follow_status} style={styles.year}></Button>
      </View>
      </View>
      </View>
      </View>
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

  renderComments = (event) => {

    return (

      <View style={styles.container}>
        <Image
          //source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>

                  <Text style={styles.title}>{event.comment}</Text>

          <Text style={styles.year}>{event.author}</Text>

        </View>
      </View>
    );
  }


  }

  var styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'row',

      backgroundColor: '#fff',
      marginBottom: 10,
      marginTop: 15,
    },
    padding:{
      flexDirection: 'column',
      textAlign: 'left',
      alignItems: 'flex-start',
    },
    rightContainer: {
      flex: 1,
    },
    horizontalContainer: {
      flex: 1,
      flexDirection: 'row',
      marginLeft: 10,

    },
    textWrap: {
      flexDirection: 'column',
      flex: 0.8,
      flexWrap: 'wrap'
    },

    link:{
      color: 'blue',
    },

    title: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: 10,
      marginLeft: 15,
    },
    year: {
      textAlign: 'center',
      marginTop: 2,
      marginLeft: 15,
    },
    thumbnail: {
      width: 600,
      height: 200,
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    avatar: {
      width: 75,
      height: 75,
      borderRadius: 37,
      alignItems: 'center',

    },

    listView: {
      paddingTop: 20,
      backgroundColor: '#fff',
      marginBottom: 70,
    },
  });
