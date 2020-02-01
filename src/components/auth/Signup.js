import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import firebase from 'firebase';
import {connect} from 'react-redux';

import {setAppState} from '../../redux/actions/index';
import colors from '../common/Colors';

class Signup extends React.Component {
  static navigationOptions = {
    header: null,
  };

  signUp() {
    this.props.setAppState({loading: true});

    // authStateChanged listener for demo
    var checkUser = setInterval(() => {
      const {currentUser} = firebase.auth();

      if (currentUser !== null) {
        console.log('currentUserRecieved', currentUser);
        currentUser
          .updateProfile({
            displayName: this.props.appState.displayName,
          })
          .then(() => {
            this.props.setAppState({
              loading: false,
              email: '',
              password: '',
            });
            clearInterval(checkUser);
            this.props.navigation.navigate('App');
          });
      } else {
        console.log('currentUser not yet Recieved', currentUser);
      }
    }, 1000);

    const {email, password} = this.props.appState;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error =>
        this.props.setAppState({
          errorMessage: error.message,
          error: true,
          loading: false,
        }),
      );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            padding: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: colors.primaryDark, fontSize: 32}}>Signup</Text>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: '5%',
            paddingVertical: '5%',
          }}>
          <View style={styles.errorMessage}>
            <Text style={styles.error}>{this.props.appState.errorMessage}</Text>
          </View>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
            value={this.props.appState.displayName}
            placeholder="Username"
            onChangeText={displayName => {
              this.props.setAppState({
                displayName,
              });
            }}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
            value={this.props.appState.email}
            placeholder="Email Address"
            onChangeText={email => {
              this.props.setAppState({
                email,
              });
            }}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 20,
            }}
            value={this.props.appState.password}
            secureTextEntry={this.props.appState.secureTextEntry}
            placeholder="Password"
            onChangeText={password => {
              this.props.setAppState({
                password,
              });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.primaryDark,
                marginTop: 10,
              }}>
              Login instead
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 30,
              alignSelf: 'center',
              width: '55%',
              height: 45,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: colors.primaryDark,
            }}
            onPress={() => this.signUp()}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.props.appState.loading ? (
                <ActivityIndicator size="small" color={colors.monoLight} />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  SIGN UP
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  errorMessage: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  error: {
    color: colors.red,
    fontSize: 13,
    fontWeight: '600',
  },
};

const mapStateToProps = state => {
  return {
    appState: state.app,
  };
};

export default connect(mapStateToProps, {
  setAppState,
})(Signup);
