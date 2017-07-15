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
   Image,
   ListView,
   StyleSheet,
   Text,
   View,
   Button,
   Picker,
 } from 'react-native';

var REQUEST_URL = 'https://www.wpoppin.com/api/events.json';
var POST_URL = 'https://www.wpoppin.com/api/events/';


export default class PostMoment extends Component {
  constructor(props) {
      super(props);
      this.state = {
        moment: "",
      };
    }

    //
    // componentDidMount() {
    //   //this.fetchData();
    // }

    // postData(){
    //   var myHeaders = new Headers();
    //   myHeaders.append('Authorization', 'Token 77ea22f962b2366f1503277aff9bacdc8199edcd');
    //   myHeaders.append('Content-type', 'application/json');
    //
    //   var myInit = { method: 'POST',
    //            headers: myHeaders,
    //            body: JSON.stringify({
    //              "author": "PennState_University_Libraries",
    //              "category": "10",
    //              "title": "TEST",
    //              "street_address": "Redifer Commons lobby area",
    //              "city": "University Park",
    //              "state": "PA",
    //              "zip_code": "16802",
    //              "date": "2017-08-10",
    //              "time": "16:00:00",
    //              "description": "TESTING",
    //            }),
    //          };
    //
    //   fetch(POST_URL,myInit)
    //     .then((response) => console.log(response.status) )
    //     .then((responseData) => {
    //        console.log("SENT INFO");
    //     })
    //     .done();
    // }



    render() {
      return (
        <View>
          <Text>Share a future moment...</Text>
          <Picker
              selectedValue={this.state.moment}
              onValueChange={(itemValue, itemIndex) => this.setState({moment: itemValue},
                                                       this.props.navigator.push({
                                                         screen: 'futuremoments.MomentDetails',
                                                         title: 'Moment Details',
                                                         passProps: {moment: itemValue}
                                                       }))}>
              <Picker.Item label="Club" value="1" />
              <Picker.Item label="Bar" value="2" />
              <Picker.Item label="Netflix" value="3" />
              <Picker.Item label="Movies" value="4" />
              <Picker.Item label="Homework" value="5" />
              <Picker.Item label="Party" value="6" />
          </Picker>
          <Text>{this.state.moment}</Text>
        </View>
        // <ListView
        //   dataSource={this.state.dataSource}
        //   renderRow={this.renderMovie}
        //   style={styles.listView}/>
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
