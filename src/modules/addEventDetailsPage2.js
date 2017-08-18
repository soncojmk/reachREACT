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
   DatePickerIOS,
   Text,
   View,
   Button,
   Picker,
   TextInput,
   ImagePickerIOS,
   NativeModules,
   Image,
 } from 'react-native';
 import moment from '../../node_modules/moment/src/moment.js';

 import PhotoUpload from 'react-native-photo-upload';
 import fs from 'react-native-fs';
 import ImagePicker from 'react-native-image-picker';


var REQUEST_URL = 'https://www.wpoppin.com/api/events.json';
var POST_URL = 'https://www.wpoppin.com/api/events/';


export default class AddEventDetailsPage2 extends Component {

  constructor(props) {
      super(props);
      this.goToShareScreen = this.goToShareScreen.bind(this);
      this.state = {
        description: this.props.description,
        category: this.props.category,
        caption: this.props.caption,
        description:this.props.description,
        street_address: "",
        price:"",
        city:"",
        zipcode:"",
        date: new Date(),
        time: "",
        image: null,
        state: "PA",
      }
      this.postEvent = this.postEvent.bind(this);
    }

    postEvent() {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Token 74952f08f14ad80af8f8f0cb24a9aed4490ab69c');
        myHeaders.append('Content-type', 'application/json');

        var myInit = { method: 'POST',
                 headers: myHeaders,
                 body: JSON.stringify({
                   category: "5",
                   title: this.state.caption,
                   price: "4",
                   //date: this.state.date,
                   image: this.state.image,
                   description: this.state.description,
                   zip_code: this.state.zipcode,
                   city: this.state.city,
                   //time: this.state.time,
                   state: this.state.state,
                   street_address: this.state.street_address,
                 }),
               };

        console.log("AddEventDetailsPage2 url" + POST_URL)
        fetch(POST_URL ,myInit)
          .then((response) => console.log("AddEventDetailsPage2 " + response.status + " " + response.statusText + " editprofile + image " + this.state.image))
          .then((responseData) => {
            this.goToShareScreen();
          })
          .done();
      }


  onDateChange(date) {
    this.setState({
      date: date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate(),
      time: date.getHour() + ":" + date.getMinutes(),
    });
  }


    render() {
      return (
        <View>

          <Text>Street Address</Text>
            <TextInput
              style={{height: 40}}
              placeholder="Title"
              onChangeText={(text) => this.setState({street_address: text})}
            />

            <Text>City</Text>
              <TextInput
                style={{height: 40}}
                placeholder="City"
                onChangeText={(text) => this.setState({city: text})}
              />


          <Text>Zipcode</Text>
            <TextInput
              style={{height: 40}}
              placeholder="zipcode"
              onChangeText={(text) => this.setState({zip_code: text})}
            />

          <Text>date and time</Text>
          <DatePickerIOS
            date={this.state.date}
            mode="datetime"
            onDateChange={() => this.onDateChange}
          />
          <View style={{height:30}}>
          <PhotoUpload
               onPhotoSelect={profilePicture => {
                 if (profilePicture) {
                   console.log('AddEventDetailsPage2 Image base64 string: ', profilePicture)
                   this.setState({
                     image: profilePicture
                   });
                 }
               }}
             >
             <Text> Upload Image</Text>
          </PhotoUpload>
          </View>


          <Button onPress={this.postEvent} title="Submit"></Button>
        </View>
      );
    }

    goToShareScreen(){
      var times = {
        "1": moment().add(30,'m'),
        "2": moment().add(1,'h'),
        "3": moment({hour: 20}),
        "4": moment({hour: 12}).add(1,'d'),
      }
      // console.log(moment().format('hh:mm:ss'))
      // console.log(moment().format('YYYY-MM-D'))

      this.props.navigator.push({
        screen: 'futuremoments.ShareScreen',
        title: 'Share',
        passProps: {moment: this.props.moment, category: times[this.state.category], caption: this.state.caption, description: this.state.description, price: this.state.price}
      })
    }
  }

  var styles = StyleSheet.create({

  });
