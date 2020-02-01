import {SET_APP_STATE} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  displayName: '',
  loading: false,
  errorMessage: '',
  error: false,
  secureTextEntry: true,
  resetState: {
    email: '',
    password: '',
    displayName: '',
    loading: false,
    errorMessage: '',
    error: false,
    secureTextEntry: true,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_STATE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
