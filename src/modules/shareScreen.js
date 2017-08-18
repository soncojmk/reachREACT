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
 } from 'react-native';
 import moment from '../../node_modules/moment/src/moment.js';

var REQUEST_URL = 'https://www.wpoppin.com/api/events.json';
var POST_URL = 'https://www.wpoppin.com/api/events/';


export default class ShareScreen extends Component {

  constructor(props) {
      super(props);
      this.uploadMoment = this.uploadMoment.bind(this);
    }



    uploadMoment(){

      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Token 77ea22f962b2366f1503277aff9bacdc8199edcd');
      myHeaders.append('Content-type', 'application/json');
      var myInit = {
               method: 'POST',
               headers: myHeaders,
               body: JSON.stringify({
                 category: "15",
                 title: this.props.caption,
                 //time: this.state.time,
                 //date: thi.state.date,
                 is_personal: true,
                //  price: this.state.price,
                 street_address: "personal",
                 city: "personal",
                 state: "PA",
                 zip_code: "pers",
                 description: "personal",
               }),
             };

      fetch(POST_URL,myInit)
        .then((response) => console.log(response.status) )
        .then((responseData) => {
           console.log("SENT ");
        })
        .done();
    }

    render() {
      return (
        <View>
          <Button onPress={this.uploadMoment()} title="Send!"></Button>
        </View>
      );
    }
  }

  var styles = StyleSheet.create({});
