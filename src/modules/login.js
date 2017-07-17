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

import {login} from '../actions';
import store from '../store';
import APPS from '../app';
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

class Login  extends Component {

	constructor(props) {
		super(props);

		this.initialState = {
			isLoading: false,
			error: null,
			username: '',
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
    if (!this.state.username || !this.state.password) return;
    // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
    fetch('https://www.wpoppin.com/api-token-auth/', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then( async (responseData) => {
      //this.saveItem('token', responseData.token),
      store.dispatch(login(this.state.username, responseData.token));
      toke =  store.getState().token;
			try {
				value = JSON.stringify(responseData.token)
				console.log("value of token " + value);
  			if (value) {
  				await AsyncStorage.setItem('token', value);
					await AsyncStorage.setItem('username', this.state.username);
					await AsyncStorage.getItem('token').then((tokenValue) => {
			     // this.token = JSON.parse(tokenValue)
			      console.log("token get usr" + tokenValue);
					});

				}
			} catch (error) {
  	    console.log("asyncstorage error " + error);
			}
			if(value!='' || value != null){
				console.log("navigating to feed");
				this.navigateToFeed();
			}else{
   				Alert.alert('Authentication Failed', "Wrong Credentials");
			}
      //toke = this.getCache('username');
      //Alert.alert( 'Signin Success!', toke);
      //Actions.HomePage();
    }).done();
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

			<KeyboardAvoidingView behavior='padding'>
						<TextInput
						style={{height: 40, borderColor: 'gray', borderWidth: 5}}
					placeholder="username"
					placeholderTextColor='gray'
							onChangeText={username => this.setState({ username })}
							value={this.state.username}
							autoCorrect={false} />

							<TextInput
							style={{height: 40, borderColor: 'gray', borderWidth: 5}}
						placeholder="password"
						placeholderTextColor='gray'
							onChangeText={password => this.setState({ password })}
							value={this.state.password}
							autoCorrect={false} />

							<TouchableOpacity activeOpacity={.5}
								onPress={() => this.userLogin()}>
              <View>
                <Text >Sign In</Text>
              </View>
            </TouchableOpacity>
					</KeyboardAvoidingView>

		);
	}
}

export default Login;
