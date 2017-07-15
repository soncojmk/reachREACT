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


export default class MomentDetails extends Component {

  constructor(props) {
      super(props);
      this.goToShareScreen = this.goToShareScreen.bind(this);
      this.state = {
        time: "",
        caption: "",
      }
    }

    render() {
      return (
        <View>
          <TextInput
            style={{height: 40}}
            placeholder="Caption"
            onChangeText={(text) => this.setState({caption: text})}
          />
          <Picker
              selectedValue={this.state.time}
              onValueChange={(itemValue, itemIndex) => this.setState(
                {time: itemValue})}>
              <Picker.Item label="In half an hour" value="1" />
              <Picker.Item label="In an hour" value="2" />
              <Picker.Item label="Tonight" value="3" />
              <Picker.Item label="Tomorrow" value="4" />
          </Picker>
          <Text>{this.state.time}</Text>
          <Text>{this.state.caption}</Text>
          <Text>{this.props.moment}</Text>
          <Button onPress={this.goToShareScreen} title="Share with .."></Button>
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
        passProps: {moment: this.props.moment, time: times[this.state.time], caption: this.state.caption}
      })
    }
  }

  var styles = StyleSheet.create({

  });
