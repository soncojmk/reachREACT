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
//import Icon from 'react-native-vector-icons/FontAwesome';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import iconMoonSelection from '../selection.json';
const Icon = createIconSetFromIcoMoon(iconMoonSelection);


export default class PostNew extends Component {
  constructor(props) {
      super(props);
      this.state = {
        moment: "",
      };
      this.goToMomentDetails = this.goToMomentDetails.bind(this);
    }

    // <Picker
    //     selectedValue={this.state.moment}
    //     onValueChange={(itemValue, itemIndex) => this.setState({moment: itemValue},
    //                                              this.props.navigator.push({
    //                                                screen: 'futuremoments.MomentDetails',
    //                                                title: 'Moment Details',
    //                                                passProps: {moment: itemValue}
    //                                              }))}>
    //     <Picker.Item label="Club" value="1" />
    //     <Picker.Item label="Bar" value="2" />
    //     <Picker.Item label="Netflix" value="3" />
    //     <Picker.Item label="Movies" value="4" />
    //     <Picker.Item label="Homework" value="5" />
    //     <Picker.Item label="Party" value="6" />
    // </Picker>
    goToMomentDetails(momentChoosen){
      this.props.navigator.push({
        screen: 'futuremoments.MomentDetails',
        title: 'Moment Details',
        passProps: {moment: momentChoosen}
      })
    }


    goToaddEventDetailsPage(){
      this.props.navigator.push({
        screen: 'futuremoments.AddEventDetailsPage',
        title: 'Event Details',
      })
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.callToAction}></Text>
          <View style={styles.iconsContainer}>

            <View style={styles.horizontalContainer}>
              <Icon color="#519E8A" onPress={() =>
              this.goToMomentDetails("drink")
              } name="drink"  size={60}  color="#426A5A" />

              <Icon  onPress={() =>
              this.goToaddEventDetailsPage()
              } name="music" size={60}  color="#7FB685" />
            </View>

          </View>
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    iconsContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 50,
      //backgroundColor: 'blue',

    },

    horizontalContainer: {
      flex: 1,
      flexDirection: 'row'
    },

    callToAction: {
      fontSize: 25,
      marginTop: 50,
      textAlign: 'center',
    },
    topLayer: {
      height: 100,
      width: 200,
      flexDirection: 'row',
      justifyContent: 'center',
      //backgroundColor: 'yellow',
    },
    bottomLayer: {
      height: 100,
      width: 200,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      //backgroundColor: 'yellow',
    },
    icons: {
      width: 90,
      height: 80,
    },
    spacedLayer: {
      width:300,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //backgroundColor: 'green',
    },
  });
