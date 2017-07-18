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
   Image
 } from 'react-native';
 import moment from '../../node_modules/moment/src/moment.js';

var REQUEST_URL = 'https://www.wpoppin.com/api/myaccount/';
//var DUMMY_01 = 'https://www.wpoppin.com/api/accounts/922/';
var NOTIFICATION_URL = 'http://www.wpoppin.com/api/notificationfeed';


const placeholder = require('../images/placeholder.jpg');



export default class Profile extends Component {

  constructor(props) {
      super(props);
      this.fetchUserData();
      this.state = {
        name: "",
        college: "",
        about:  "",
        url: "",
        avatar: "",
      }
      this.goToEditProfile = this.goToEditProfile.bind(this);
    }

    parseResponse(userArray){
      var userInfo = userArray[0];
      console.log(userInfo["avatar"])
      this.setState({
        name: userInfo["user"]["username"],
        college: userInfo["college"],
        about: userInfo["about"],
        url: userInfo["url"],
        avatar: userInfo["avatar"],
      })
    }


    // class Notification{
    //   constructor(actor,recipient,moment){
    //     this.actor = actor;
    //     this.recipient = recipient;
    //     this.moment = moment;
    //   }
    //
    // }
    //
    // class Actor {
    //   constructor(name,url,avatar){
    //     this.name = name;
    //     this.url = url;
    //     this.avatar = avatar;
    //   }
    // }
    //
    // class Recipient {
    //   constructor(name,url){
    //     this.name = name;
    //     this.url = url;
    //   }
    // }
    //
    // class Moment{
    //   constructor(category,caption,time){
    //     this.category = category;
    //     this.caption = caption;
    //     this.time = time;
    //   }
    //
    // }


    // getUserNotifications(){
    //   var myHeaders = new Headers();
    //   myHeaders.append('Authorization', 'Token a9edb73eb1ecfa66b87037cbfeada07406749f96');
    //   var myInit = { method: 'GET',
    //            headers: myHeaders,
    //          };
    //   fetch(NOTIFICATION_URL,myInit)
    //       .then((response) => response.json())
    //       .then((notifications) => {
    //
    //           for(let notification of notifications){
    //
    //           }
    //           //this.parseResponse(responseData)
    //           //this.parseResponseDummy(responseData)
    //           //this.fetchUserProfile();
    //       })
    //       .done();
    //
    // }



    parseResponseDummy(userInfo){
      this.setState({
        name: userInfo["user"]["username"],
        college: userInfo["college"],
        about: userInfo["about"],
        url: userInfo["url"],
        avatar: userInfo["avatar"],
      })
    }

    fetchUserData() {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Token 30d7ec16a933d5f934745add649b8c1e1d4000c2');
        var myInit = { method: 'GET',
                 headers: myHeaders,
               };
      fetch(REQUEST_URL,myInit)
          .then((response) => response.json())
          .then((responseData) => {
              this.parseResponse(responseData)
              //this.parseResponseDummy(responseData)
              //this.fetchUserProfile();
          })
          .done();
      }

    render() {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center',}}>
                <View>
                  {this.state.avatar != null ? <Image style={{ width: 50, height: 50 }}
                  source={{ uri: this.state.avatar }} defaultSource={placeholder}></Image>: console.log("hell")}
                  <Text>Name: {this.state.name}</Text>
                </View>
                <View>
                  <Text>About: {this.state.about}</Text>
                  <Text>College: {this.state.college}</Text>
                  <Text>Url: {this.state.url}</Text>
                  <Button onPress={this.goToEditProfile} title="Edit" ></Button>
                </View>
        </View>
      );
    }
    goToEditProfile(){
      // this.props.navigator.push({
      //   screen: 'futuremoments.EditProfile',
      //   title: 'Edit',
      //   passProps: {name: this.state.name, about: this.state.about,
      //     college: this.state.college, url: this.state.url}
      // })
      this.props.navigator.push({
        screen: 'futuremoments.Notifications',
        title: 'Edit',
      })

    }
  }

  var styles = StyleSheet.create({});
