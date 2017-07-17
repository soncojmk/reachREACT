import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
//import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import {
	TouchableWithoutFeedback,
	StyleSheet,
  AppRegistry,
  Alert,
	TextInput,
	KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Button,
	Text,
	Image,
} from 'react-native';

import { Navigation } from 'react-native-navigation';

import {login} from '../actions';
import store from '../store';
import APPS  from '../app';
//import FormMessage from 'MobileApp/src/components/FormMessage';
//import * as session from 'MobileApp/src/services/session';
//import * as api from 'MobileApp/src/services/api';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	content: {
		padding: 30,
		flex: 1,
	},
	shadow: {
		flex: 1,
		width: null,
		height: null,
	},
	inputIcon: {
		width: 30,
	},
	input: {
		marginBottom: 20,
	},
	button: {
		marginTop: 20,
		alignSelf: 'center',
		width: 150,
	},
	error: {
		color: 'red',
		marginBottom: 20,
	},
});

class Signup  extends Component {

	constructor(props) {
		super(props);

		this.initialState = {
			isLoading: false,
			error: null,
			email: '',
      username:'',
			password: '',
      toke: null,
		};
		this.state = this.initialState;

    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched), we will update local component state and force component to rerender with new data.
    this.setState({
        toke: store.getState().token,
      });
    });

    this.render();
	}


	onPressBack() {
		//const routeStack = this.props.navigator.getCurrentRoutes();
		//this.props.navigator.jumpTo(routeStack[0]);
	}

  async getCache(key){
      try{
          let value = await AsyncStorage.getItem(key);
          return value;
      }
      catch(e){
          console.log('caught error', e);
          // Handle exceptions
      }
  }

  async userLogin() {
    if (!this.state.email || !this.state.password) return;
    // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
    fetch('https://www.wpoppin.com/api-token-auth/', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then( async (responseData) => {
      //this.saveItem('token', responseData.token),
      store.dispatch(login(this.state.email, responseData.token));
      toke =  store.getState().token;
			try {
				value = JSON.stringify(responseData.token)
  			if (value) {
  				await AsyncStorage.setItem('token', value);
					await AsyncStorage.setItem('username', this.state.email);
				}
			} catch (error) {
  	    console.log("asyncstorage error " + error);
			}
      //toke = this.getCache('username');
      //Alert.alert( 'Signin Success!', toke);
      //Actions.HomePage();
    }).done();
  }


  async userSignup() {
    if (!this.state.email || !this.state.password || !this.state.username) return;
    // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
    try{
    fetch('https://www.wpoppin.com/api/wp/auth/register/', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      //this.saveItem('token', responseData.token),
      console.log("signup done, login starting");
      this.userLogin();
      //toke = this.getCache('username');
      //Alert.alert( 'Signup Success!', toke);
      //Actions.HomePage();
			if(responseData){
      	this.navigateToFeed();
			}


    }).done();
  }catch(error){
    console.log("signup failed" + error);
  }
  }


  navigateToFeed(){
    const app = new APPS();
  }


	renderError() {
		if (this.state.error) {
			return (
				<Text
					style={styles.error}
				>
					{this.state.error}
				</Text>
			);
		}
	}



	render() {
		return (
			<KeyboardAvoidingView behavior='padding'
						style={styles.container}>
						<TextInput
					placeholder="username"
					placeholderTextColor='white'
					underlineColorAndroid='transparent'
							onChangeText={username => this.setState({ username })}
							value={this.state.username}
							autoCorrect={false} />

            <TextInput
  					placeholder="email"
  					placeholderTextColor='white'
  					underlineColorAndroid='transparent'
  							onChangeText={email => this.setState({ email })}
  							value={this.state.email}
  							autoCorrect={false} />

						<TextInput style={styles.input}
						placeholder="password"
						placeholderTextColor='white'
						underlineColorAndroid='transparent'
							onChangeText={password => this.setState({ password })}
							value={this.state.password}
							autoCorrect={false} />

							<TouchableOpacity activeOpacity={.5}
								onPress={() => this.userSignup()}>
              <View>
                <Text >Sign Up</Text>
              </View>
            </TouchableOpacity>
					</KeyboardAvoidingView>
		);
	}
}

export default Signup;
