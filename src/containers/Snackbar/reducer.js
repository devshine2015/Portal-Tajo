import { fromJS } from 'immutable';

import {
  SNACKBAR_SHOW,
  SNACKBAR_HIDE,
} from './actions';

const initialState = fromJS({
  show: false,
  message: '',
  autoHideDuration: 0,
});

export default function snackbarReducer(state = initialState, action) {
  switch (action.type) {
    case SNACKBAR_SHOW:
      return state
        .set('show', true)
        .set('message', action.message)
        .set('autoHideDuration', action.autoHideDuration);
    case SNACKBAR_HIDE:
      return state.set('show', false);
    default:
      return state;
  }
}

export const getSnackbarState = (state) =>
  state.get('snackbar');
