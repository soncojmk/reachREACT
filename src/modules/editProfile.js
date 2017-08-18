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
   NativeModules,
   Image,
 } from 'react-native';
 //import RNFetchBlob from 'react-native-fetch-to-base64'
 import PhotoUpload from 'react-native-photo-upload';
 import fs from 'react-native-fs';
 import ImagePicker from 'react-native-image-picker';


const DUMMY_PICTURE = '../images/testing.jpg'

export default class EditProfile extends Component {

  constructor(props) {
      super(props);
      this.state = {
        name: this.props.name,
        about: this.props.about,
        college: this.props.college,
        url: this.props.url.replace(".json", "/update_profile/"),
        avatar: this.props.avatar,
      }
      this.updateUserData = this.updateUserData.bind(this);
    }

    updateUserData() {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Token 74952f08f14ad80af8f8f0cb24a9aed4490ab69c');
        myHeaders.append('Content-type', 'application/json');

        var myInit = { method: 'POST',
                 headers: myHeaders,
                 body: JSON.stringify({
                   about: this.state.about,
                   college: this.state.college,
                   avatar: this.state.avatar,
                 }),
               };

        console.log("editprofile url" + this.state.url)
        fetch(this.state.url ,myInit)
          .then((response) => console.log("editprofile " + response.status + " editprofile + avatar " + this.state.avatar))
          .then((responseData) => {
          })
          .done();
      }

    render() {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
          <TextInput
            style={{height: 40}}
            placeholder={this.props.about}
            onChangeText={(text) => this.setState({about: text})}
          />

          <TextInput
            style={{height: 40}}
            placeholder={this.props.college}
            onChangeText={(text) => this.setState({college: text})}
          />



          <Text>Upload Picture</Text>

          <PhotoUpload
             onPhotoSelect={avatar => {
               if (avatar) {
                 console.log('editprofile Image base64 string: ', avatar)
                 this.setState({ avatar: avatar });
               }
             }}
           >
             <Image
               style={{
                 paddingVertical: 30,
                 width: 150,
                 height: 150,
                 borderRadius: 75
               }}
               resizeMode='cover'
               source={{
                 uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
               }}
             />
           </PhotoUpload>

          <Button onPress={this.updateUserData} title="Save"></Button>
        </View>
      );
    }
  }

  var styles = StyleSheet.create({});
