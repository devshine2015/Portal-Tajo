import { Map, fromJS } from 'immutable';
import { DEVICES_FETCH_SUCCESS } from './actions';

const initialState = fromJS({
  list: new Map({}),
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case DEVICES_FETCH_SUCCESS:
      return state.set('list', new Map(action.devices));

    default:
      return state;
  }
}

export default reducer;

export const getDevices = state =>
  state.getIn(['devices', 'list']);

export const getDevicesAmount = state =>
  state.getIn(['devices', 'list']).size;
