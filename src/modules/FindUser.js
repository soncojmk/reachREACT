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

  renderMovie = (movie) => {

    if(this.state.reloading == true){
      return (
        <View>
        <Text>loading ...</Text>
        </View>
      );
    }

     //this.isFollowing(movie.url);

     //console.log('follow_statusess ' + this.state.follow_status);
          //return follow_statuses




    //var follow_statuses = this.state.follow_status;

    return (
      <View>
      <TouchableOpacity  onPress = {() => this.followUser(movie)} >
      <Text style={styles.title}>{movie.follow_status}</Text>
          </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.url}</Text>
          <Text style={styles.year}>{movie.user.username}</Text>
        </View>
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
