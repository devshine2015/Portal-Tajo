import { combineReducers } from 'redux-immutable';
import { fromJS, List } from 'immutable';
import { loaderActions, offlineDataActions } from './actions';

const loaderInitialState = fromJS({
  isLoading: false,
});
const offlineDataInitialState = new List();

function loaderReducer(state = loaderInitialState, action) {
  switch (action.type) {
    case loaderActions.INSTALLER_LOADER_STATE_SET: {
      return state.set('isLoading', action.nextState);
    }
    default:
      return state;
  }
}

function offlineDataReducer(state = offlineDataInitialState, action) {
  switch (action.type) {
    case offlineDataActions.INSTALLER_OFFLINE_DATA_CACHED_SAVE:
      return new List(action.data);
    default:
      return state;
  }
}

export default combineReducers({
  loader: loaderReducer,
  offlineData: offlineDataReducer,
});

export const getLoaderState = (state) =>
  state.getIn(['installer', 'loader', 'isLoading']);
export const getOfflineData = (state) =>
  state.getIn(['installer', 'offlineData']);
export const installerHasOfflineData = (state) =>
  state.getIn(['installer', 'offlineData']).size !== 0;
