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

var REQUEST_URL = 'https://www.wpoppin.com/api/events.json';
var POST_URL = 'https://www.wpoppin.com/api/events/';


export default class MomentDetails extends Component {
  constructor(props) {
      super(props);
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
              <Picker.Item label="This week" value="5" />
              <Picker.Item label="Next week" value="6" />
              <Picker.Item label="Next month" value="7" />
          </Picker>
          <Text>{this.state.time}</Text>
          <Text>{this.state.caption}</Text>
          <Text>{this.props.moment}</Text>
          <Button onPress={this.goToShareScreen} title="Share with .."></Button>
        </View>
      );
    }

    goToShareScreen(){
      this.props.navigator.push({
        screen: 'futuremoments.ShareScreen',
        title: 'Share with..',
        passProps: {moment: this.props.moment, caption: this.state.caption,
                          time: this.state.time}});
    }
  }

  var styles = StyleSheet.create({

  });
