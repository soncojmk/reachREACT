userLogin() {
  if (!this.state.username || !this.state.password) return;
  // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
  fetch('https://wpoppin.com/api-token-auth/', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    })
  })
  .then((response) => response.json())
  .then((responseData) => {
    this.saveItem('token', responseData.token),
    Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
    Actions.HomePage();
  })
  .done();
}
