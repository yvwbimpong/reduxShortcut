import React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {setAppState} from '../../redux/actions/index';
import firebase from 'firebase';
import colors from '../common/Colors';

class AppLanding extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            borderColor: '#444',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 20,
            width: '80%',
            borderWidth: 1,
          }}>
          <Text style={{color: colors.primaryDark, fontSize: 25}}>Hello</Text>
          <Text
            style={{
              color: colors.primaryDark,
              fontSize: 50,
            }}>{`${this.props.appState.displayName}!`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                this.props.setAppState({
                  ...this.props.appState.resetState,
                });
                this.props.navigation.navigate('Auth');
              });
          }}>
          <Text style={{textAlign: 'center', color: colors.primaryDark}}>
            Sign out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    appState: state.app,
  };
};

export default connect(mapStateToProps, {
  setAppState,
})(AppLanding);
