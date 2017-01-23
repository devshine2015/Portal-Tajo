import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { detailsActions } from './actions';

const loaderInitialState = fromJS({
  isLoading: false,
});

function loaderReducer(state = loaderInitialState, action) {
  switch (action.type) {
    case detailsActions.VEHICLE_EDITOR_LOADER_SET:
      return state.set('isLoading', true);
    case detailsActions.VEHICLE_EDITOR_LOADER_RESET:
      return state.set('isLoading', false);
    default:
      return state;
  }
}

export default combineReducers({
  loader: loaderReducer,
});

export const getLoaderState = (state) =>
  state.getIn(['vehicles', 'loader', 'isLoading']);
