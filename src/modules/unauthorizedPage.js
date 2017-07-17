import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';

import { Navigation } from 'react-native-navigation';

export default class UnauthorizedPage extends Component {

  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  navigateToLogin(){
    console.log("navigating to loginpage");
    this.props.navigator.push({
                screen: 'futuremoments.Login',
                title: 'Login',
                navigatorStyle: {}
            });
  }

  navigateToSignUp(){
    console.log("navigating to loginpage");
    this.props.navigator.push({
                screen: 'futuremoments.Signup',
                title: 'Signup',
                navigatorStyle: {}
        });
  }

  render() {
    return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>

    <View style = {{flex:1, justifyContent: 'center', alignItems: 'center',}}>
    <Text style = {{fontSize: 50, paddingTop: 100}}> Reach. </Text>
    <Text style = {{fontSize: 15, paddingTop: 2}}> Share and Discover Future Moments </Text>
    </View>

    <View style={{flex:2}}/>

    <View style={{flex: 1, flexDirection: 'row', }}>
    <Button
      style={{flex:1, color:'white' }}
      title="login"
      onPress={() => this.navigateToLogin()}>
  </Button>
  <Button
    style={{flex:1, color:'red'}}
    title="Sign up"
    onPress={() => this.navigateToSignUp()}>
    </Button>
  </View>
  </View>
)
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
