import React, {Component} from 'react';
import firebase from 'firebase';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/redux/reducers';
import ReduxThunk from 'redux-thunk';
import Route from './src/routes/Route';
import AppLanding from './src/components/app/index';
import Signup from './src/components/auth/Signup';
import Login from './src/components/auth/Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    const config = {
      apiKey: 'xxxxxxxxxx',
      authDomain: 'xxxxxx',
      databaseURL: 'xxxxxxxx',
      projectId: 'xxxxxxx',
      storageBucket: 'xxxxxxx',
      messagingSenderId: 'xxxxxxx',
      appId: 'xxxxxxx',
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Route />
        {/* <AppLanding /> */}
        {/* <Signup /> */}
        {/* <Login /> */}
      </Provider>
    );
  }
}
