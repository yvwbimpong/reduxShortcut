import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
} from 'react-native';

import firebase from 'firebase';
import {connect} from 'react-redux';
import {setAppState} from '../../redux/actions/index';
import colors from '../common/Colors';

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  loginUser() {
    this.props.setAppState({loading: true});

    var checkUser = setInterval(() => {
      const {currentUser} = firebase.auth();

      if (currentUser !== null) {
        console.log('currentUserRecieved', currentUser);
        this.props.setAppState({
          loading: false,
          displayName: currentUser.displayName,
        });
        clearInterval(checkUser);
        this.props.navigation.navigate('App');
      } else {
        console.log('currentUser not yet Recieved', currentUser);
      }
    }, 1000);

    const {email, password} = this.props.appState;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
            // padding: '5%',
            paddingVertical: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: colors.primaryDark, fontSize: 32}}>Login</Text>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: '5%',
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
              this.props.navigation.navigate('Signup');
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.primaryDark,
                marginTop: 10,
              }}>
              SignUp instead
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
            onPress={() => this.loginUser()}>
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
                  Login
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
})(Login);
