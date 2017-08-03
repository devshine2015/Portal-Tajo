import { browserHistory } from 'react-router';
import { BASE_URL } from 'configs';
import {
  setSession,
  cleanSession,
} from './actions';

export const onSuccess = (profile = undefined, dispatch) => {
  browserHistory.replace(`${BASE_URL}/`);
  dispatch(setSession(profile));
};

export const onFailure = (dispatch) => {
  browserHistory.replace(`${BASE_URL}/login`);
  dispatch(cleanSession());
};
