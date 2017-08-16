
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

var REQUEST_URL = 'https://www.wpoppin.com/api/events/386/';

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



  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

      <View style={styles.container}>

        <Image
          //source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}/>
          <View>

              <View style={styles.rightContainer}>
                <Text style={styles.title}>{this.state.username}</Text>
                <Text style={styles.year}>{this.state.about}</Text>
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
