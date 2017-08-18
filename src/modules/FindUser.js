/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

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
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import UnauthorizedPage from './unauthorizedPage';

import SearchBar from 'react-native-search-bar';

const placeholder = require('../images/placeholder.jpg');
var REQUEST_URL = 'https://www.wpoppin.com/api/accounts/?search=';

export default class FindUser extends Component {

  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      reloading: false,
      loaded: false,
      searchTerm: "",
      follow_status:"",
    };
  }

  // componentDidMount() {
  //   this.fetchData();
  // }

fetchData() {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Token a9edb73eb1ecfa66b87037cbfeada07406749f96');
  var myInit = { method: 'GET',
           headers: myHeaders,
         };

    url = REQUEST_URL + this.state.searchTerm
    console.log("finduser " + url)
    fetch(url, myInit)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true,
        reloading:false,
      });
    })
    .done();
    console.log('finduser ' + this.state.dataSource)
  }


  // isFollowing(user_url) {
  //     var follow_statuses = "";
  //     var myHeaders = new Headers();
  //     myHeaders.append('Authorization', 'Token 30d7ec16a933d5f934745add649b8c1e1d4000c2');
  //     var myInit = { method: 'GET',
  //              headers: myHeaders,
  //            };
  //   console.log("user_url" + user_url );
  //   fetch(user_url + 'follow_status/', myInit)
  //       .then((response) => response.json())
  //       .then((responseData) => {
  //           //var value = JSON.stringify(responseData);
  //         console.log("response" + JSON.stringify(responseData));
  //         console.log("following " + JSON.stringify(responseData.following));
  //         console.log("requested " + JSON.stringify(responseData.requested));
  //         console.log("neither " + JSON.stringify(responseData.neither));
  //
  //
  //
  //           if (responseData.following === "true"){
  //             follow_statuses = "following";
  //             console.log("follow_status following user" + follow_statuses);
  //           }else if (responseData.requested === 'true'){
  //             follow_statuses = "requested";
  //             //console.log("follow_status" + follow_status);
  //           }else if (responseData.neither === 'true'){
  //             follow_statuses = "false";
  //             //console.log("follow_status" + follow_status);
  //           }
  //           console.log('follow_status ' + follow_statuses );
  //
  //           this.setState({
  //             follow_status: follow_statuses,
  //           });
  //       })
  //       .done();
  //   }

    followUser(user) {
      console.log('followuser ' + user.url)

      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Token a9edb73eb1ecfa66b87037cbfeada07406749f96');

      current_method = ''
      if(user.follow_status == 'follow'){
        current_method = 'POST'
        console.log('followuser POST' + user.follow_status)
      }else if (user.follow_status == 'requested'){
        current_method = 'DELETE'
          console.log('followuser DELETE' + user.follow_status)
      }else if (user.follow_status == 'following'){
        current_method = 'DELETE'
          console.log('followuser DELETE' + user.follow_status)
      }else {
        current_method = 'DELETE'
          console.log('followuser DELETE' + user.follow_status)
      }

      var myInit = {
               method: current_method,
               headers: myHeaders,
             };
      url = user.url + 'follow/'
        console.log('followuser ' + url)
      fetch(url, myInit)
        .then((response) => response.json())
        .then((responseData) => {
          console.log('saveevent ' + responseData)
          this.setState({
            reloading: true,
          });
          this.fetchData();
        })
        .done();
    }


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    onUserPress (object_url, object_title) {
      url = object_url.replace(".json", "/")
      this.props.navigator.push({
          screen: 'futuremoments.UserDetailsView', // unique ID registered with Navigation.registerScreen
          title: object_title, // title of the screen as appears in the nav bar (optional)
          navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
          navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
          // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
        passProps: {url: url}, // simple serializable object that will pass as props to all top screens (optional)
        animationType: 'slide-down'
      });
    }


onPressBack(){
    this.props.navigator.pop();
}

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={{flex:1}}>
      <View style={{marginTop:20}}>
      <SearchBar
	       ref='searchBar'
	       placeholder={this.state.searchTerm}
         showsCancelButton={this.state.focus}
         onFocus={() => this.setState({focus: true})}
        //  onChangeText={this.searchChanged.bind(this)}
         onSearchButtonPress={() => this.refs.searchBar.unFocus()}
         onCancelButtonPress={() => {
           //this.refs.searchBar.unFocus();
           this.onPressBack();
         }}
	       onChangeText={(searchTerm) => this.setState({ searchTerm })}
	       onSearchButtonPress={() => this.fetchData()}
	      />
        </View>

      <View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}/>
      </View>

      </View>
    );


  }

  renderLoadingView() {
    return (
      <View style={{marginTop:20}}>
      <SearchBar
	       ref='searchBar'
	       placeholder='Search'
         showsCancelButton={this.state.focus}
         onFocus={() => this.setState({focus: true})}
        //  onChangeText={this.searchChanged.bind(this)}
         onSearchButtonPress={() => this.refs.searchBar.unFocus()}
         onCancelButtonPress={() => {
           this.refs.searchBar.unFocus();
           this.onPressBack();
         }}
	       onChangeText={(searchTerm) => this.setState({ searchTerm })}
	       onSearchButtonPress={() => this.fetchData()}
	      />
        </View>
    );
  }

  renderMovie = (user) => {

    if(this.state.reloading == true){
      return (
        <View>
        <Text>loading ...</Text>
        </View>
      );
    }
    username = this.capitalizeFirstLetter(user.user.username);


    return (

      <View style={styles.container}>
        <View style={styles.horizontalContainer}>
      <TouchableOpacity onPress={() => this.onUserPress(user.url, user.user.username)}>
              {user.avatar ?
              <Image
                  source={{uri: user.avatar}}
                style={styles.avatar}/> :
                <Image
                    source={placeholder}
                  style={styles.avatar}/> }




      </TouchableOpacity>
        <Text onPress={() => this.onUserPress(user.url, user.user.username)} style={styles.year}>{username}</Text>
      </View>

      </View>
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
    marginBottom: 10,
  },
  rightContainer: {
    flex: 1,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 50,

  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 15,
  },
  thumbnail: {
    width: 600,
    height: 200,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',

  },

  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
    marginBottom: 70,
  },
});
