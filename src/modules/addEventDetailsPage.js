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


export default class AddEventDetailsPage extends Component {

  constructor(props) {
      super(props);
      this.goToShareScreen = this.goToShareScreen.bind(this);
      this.state = {
        category: "15",
        caption: "",
        description:"",
        price:"",
      }
    }

    render() {
      return (
        <View>
          <Text>Category</Text>
          <Picker
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) => this.setState(
                {category: itemValue})}>
              <Picker.Item label="Music" value="1" />
              <Picker.Item label="Sports" value="2" />
              <Picker.Item label="Fundraisers" value="3" />
              <Picker.Item label="Poetry" value="14" />
              <Picker.Item label="Dance" value="4" />
              <Picker.Item label="Health/Wellbeing" value="19" />
              <Picker.Item label="Performing Arts" value="6" />
              <Picker.Item label="Art" value="8" />
              <Picker.Item label="Movies" value="12" />
              <Picker.Item label="Political" value="21" />
              <Picker.Item label="Debate" value="18" />
              <Picker.Item label="Gaming" value="20" />
              <Picker.Item label="Lecture" value="17" />
              <Picker.Item label="Academic" value="10" />
              <Picker.Item label="Professional" value="11" />
              <Picker.Item label="Other" value="15" />
          </Picker>

          <Text>Title</Text>
            <TextInput
              style={{height: 40}}
              placeholder="Title"
              onChangeText={(text) => this.setState({caption: text})}
            />

            <Text>Price</Text>
              <TextInput
                style={{height: 40}}
                placeholder="Price"
                onChangeText={(text) => this.setState({price: text})}
              />

          <Text>Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={5}
              style={{height: 40}}
              placeholder="Description"
              onChangeText={(text) => this.setState({description: text})}
            />

          <Text>{this.state.category}</Text>
          <Text>{this.state.caption}</Text>
          <Text>{this.props.moment}</Text>
          <Button onPress={this.goToShareScreen} title="Next.."></Button>
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
        screen: 'futuremoments.AddEventDetailsPage2',
        title: 'More Details',
        passProps: {moment: this.props.moment, category: this.state.category, caption: this.state.caption, description: this.state.description, price: this.state.price}
      })
    }
  }

  var styles = StyleSheet.create({

  });
