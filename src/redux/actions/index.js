import {SET_APP_STATE} from './types';

export const setAppState = object => {
  return {
    type: SET_APP_STATE,
    payload: object,
  };
};
