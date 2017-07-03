import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { loaderActions } from './actions';

const loaderInitialState = fromJS({
  isLoading: false,
});

function loaderReducer(state = loaderInitialState, action) {
  switch (action.type) {
    case loaderActions.INSTALLER_LOADER_STATE_SET: {
      return state.set('isLoading', action.nextState);
    }
    default:
      return state;
  }
}

export default combineReducers({
  loader: loaderReducer,
});

export const getLoaderState = state =>
  state.getIn(['installer', 'loader', 'isLoading']);
