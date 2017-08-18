
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

const placeholder = require('../images/placeholder.jpg');
var REQUEST_URL = 'https://www.wpoppin.com/api/events/386/';

export default class EventDetailsView extends Component {

//for add friends button top nav
 //  static navigatorButtons = {
 //   rightButtons: [
 //     {
 //       title: 'add friends', // for a textual button, provide the button title (label)
 //       id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
 //       testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
 //       buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
 //       buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
 //       buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
 //     }
 //   ]
 // };

  constructor(props) {
    super(props);
    this.fetchData();
    this.state = {
      url: this.props.url,
      title: '',
      description: '',
      price:'',
      date:'',
      time:'',
      num_comments:'',
      num_attending:'',
      author:'',
      is_personal:'',
      city:'',
      state:'',
      avatar:'',
      save_status:'',
      loaded: false,
      comment:'',
      image:'',
    };
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }




  parseResponse(eventObject){
    console.log("details object" + eventObject);
    console.log("details title " + eventObject["title"])
    this.setState({
      title: eventObject["title"],
      description: eventObject["description"],
      url: eventObject["url"],
      num_comments: eventObject["num_comments"],
      num_attending: eventObject["num_attending"],
      avatar: eventObject["account"]["avatar"],
      author: eventObject["author"],
      city: eventObject["city"],
      state: eventObject["state"],
      save_status: eventObject["save_status"],
      date: eventObject["date"],
      time: eventObject["time"],
      is_personal: eventObject["is_personal"],
      price: eventObject["price"],
      image: eventObject["image"],
      street_address: eventObject["street_address"],
      // avatar: userInfo["avatar"],
      loaded:true,
    })
  }

  fetchData() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token 30d7ec16a933d5f934745add649b8c1e1d4000c2');
    var myInit = { method: 'GET',
             headers: myHeaders,
           };
           console.log('props url' + this.props.url)
    fetch(this.props.url, myInit)
    .then((response) => response.json())
    .then((responseData) => {
        this.parseResponse(responseData)
      })
      .done();
  }

  commentSubmit(){
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token 30d7ec16a933d5f934745add649b8c1e1d4000c2');

    var myInit = { method: 'GET',
             headers: myHeaders,
             body: JSON.stringify({
               comment: this.state.comment,
             }),
           };
           console.log('props url' + this.props.url)
    fetch(this.props.url, myInit)
    .then((response) => response.json())
    .then((responseData) => {
        this.parseResponse(responseData)
      })
      .done();

  }


  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

      button_text = 'like'
      if(this.state.save_status == 'true'){
        button_text = 'unlike'
      }
      return (

        <View style={styles.container}>

          <View style={styles.rightContainer}>

                      <View style={styles.horizontalContainer}>


                              <View>
                              {this.state.avatar ?
                              <Image
                                  source={{uri: this.state.avatar}}
                                style={styles.avatar}/> :
                                <Image
                                    source={placeholder}
                                  style={styles.avatar}/> }

                                  <Text style={styles.year}>{this.state.author}</Text>

                              </View>

                              <TouchableOpacity style={{height: 20}}>
                                <Text  style={styles.title}>{this.state.title}</Text>
                                <Text  style={styles.year}>{this.state.street_address}, {this.state.city}, {this.state.state}</Text>

                                </TouchableOpacity>
                      </View>

                      <View>
                        {this.state.image ?
                        <Image
                            source={{uri: this.state.image}}
                          style={styles.thumbnail}/> : <Image

                            style={styles.thumbnail}/> }
                      </View>

                      <View style={styles.horizontalContainer}>
                              <View>
                                <Text >{this.state.num_attending} {button_text}</Text>
                              </View>

                              <View>
                                <Text >{this.state.num_comments} comments</Text>
                              </View>
                      </View>

          </View>
        </View>

    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderComments = (event) => {

    return (

      <View style={styles.container}>
        <Image
          //source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>

                  <Text style={styles.title}>{event.comment}</Text>

          <Text style={styles.year}>{event.author}</Text>

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
      flexDirection: 'column'
    },
    horizontalContainer: {
      flex: 1,
      flexDirection: 'row'
    },
    title: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'center',
    },
    year: {
      textAlign: 'left',
    },
    thumbnail: {
      width: 600,
      height: 200,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,

    },

    listView: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
    },
  });
