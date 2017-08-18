/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, {
   Component,
 } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Button,
   Picker,
   TextInput,
   Image,
   TouchableOpacity,
 } from 'react-native';
 import moment from '../../node_modules/moment/src/moment.js';

var REQUEST_URL = 'https://www.wpoppin.com/api/accounts/922.json/';
//var DUMMY_01 = 'https://www.wpoppin.com/api/accounts/922/';


const placeholder = require('../images/placeholder.jpg');

export default class Profile extends Component {


  //for add friends button top nav
    static navigatorButtons = {
     rightButtons: [
       {
         title: 'Edit', // for a textual button, provide the button title (label)
         id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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
        name: "",
        num_followers: '',
        num_following:'',
        num_requesting:'',
        avatar:'',
        about:'',
        follow_status:'',
        college:'',
      }
      this.goToEditProfile = this.goToEditProfile.bind(this);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

  //on navigator for add friends top nav button
    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
      if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
        if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
          this.props.navigator.push({
            screen: 'futuremoments.EditProfile',
            title: 'Edit',
            passProps: {name: this.state.name, about: this.state.about, avatar: this.state.avatar,
              college: this.state.college, url: this.state.url}
          })
        }
      }
    }


    componentDidMount() {
    this.fetchUserData();
    }

    parseResponse(userObject){
      var userInfo = userObject;
      console.log('userinfo' + userInfo)
      this.setState({
        avatar: userObject["avatar"],
        about: userObject["about"],
        url: userObject["url"],
        num_following: userObject["num_following"],
        num_followers: userObject["num_followers"],
        college: userObject["college"],
        follow_status: userObject["follow_status"],
        name: userObject["user"]["username"],
      })
    }


    fetchUserData() {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Token 74952f08f14ad80af8f8f0cb24a9aed4490ab69c');
        var myInit = { method: 'GET',
                 headers: myHeaders,
               };
      fetch(REQUEST_URL,myInit)
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

      username = this.capitalizeFirstLetter(this.state.name)

      return (
        <View style={styles.container}>
        <View style={styles.padding}>
        <View style={styles.horizontalContainer}>
      <TouchableOpacity onPress={() => this.goToEditProfile()}>
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
        <Text onPress={() => this.goToEditProfile()} style={styles.title}>{username}</Text>

            <Text style={styles.year}>{this.state.num_followers} followers    {this.state.num_following} following </Text>
              <View style={styles.separator} />
        </View>

        <View>
            <Text style={styles.year}> Saved Events </Text>
            <View style={styles.separator} />
        </View>
        <View>
            <Text style={styles.year}> Posted Events </Text>
            <View style={styles.separator} />
        </View>
        <View>
            <Text style={styles.year}> Invite your friends and get points that can be redeemed for concert tickets</Text>
            <View style={styles.separator} />
        </View>
        <View>
            <Text style={styles.year}> Terms and Services</Text>
            <View style={styles.separator} />
        </View>
        <View>
            <Text style={styles.year}> Logout</Text>
            <View style={styles.separator} />
        </View>
        </View>

      </View>

      </View>



      </View>

      );
    }

    goToEditProfile(){
      this.props.navigator.push({
        screen: 'futuremoments.EditProfile',
        title: 'Edit',
        passProps: {name: this.state.name, about: this.state.about, avatar: this.state.avatar,
          college: this.state.college, url: this.state.url}
      })

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
