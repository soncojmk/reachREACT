/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
} from 'react-native';
import Notification from './notification';

var REQUEST_URL = 'http://www.wpoppin.com/api/notificationfeed';

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Token a9edb73eb1ecfa66b87037cbfeada07406749f96');
      var myInit = { method: 'GET',
               headers: myHeaders,
             };
      fetch(REQUEST_URL,myInit)
          .then((response) => response.json())
          .then((notifications) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(notifications),
              loaded: true
            })
          })
          .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => <Notification {...data} />}
        style={styles.listView}/>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading notifications...
        </Text>
      </View>
    );
  }

  // renderMovie(movie) {
  //   return (
  //     <View style={styles.container}>
  //       <Image
  //         //source={{uri: movie.posters.thumbnail}}
  //         style={styles.thumbnail}/>
  //       <View style={styles.rightContainer}>
  //         <Text style={styles.title}>{movie.title}</Text>
  //         <Text style={styles.year}>{movie.title}</Text>
  //       </View>
  //     </View>
  //   );
  // }
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
