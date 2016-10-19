import { Map, fromJS } from 'immutable';
import {
  DEVICES_FETCH_SUCCESS,
  DEVICES_DEVICE_ADD,
  DEVICES_UPDATE,
} from './actions';

const initialState = fromJS({
  list: new Map({}),
  faultAmount: 0,
  notAttachedAmount: 0,
  errorMessage: '',
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case DEVICES_FETCH_SUCCESS:
      return state.withMutations(s => {
        s.set('list', new Map(action.devices))
         .set('notAttachedAmount', action.notAttachedAmount);
      });

    case DEVICES_UPDATE:
      return state.withMutations(s => {
        s.set('list', new Map(action.devices))
         .set('faultAmount', action.faultAmount);
      });

    case DEVICES_DEVICE_ADD:
      return state.withMutations(s => {
        s.setIn(['list', action.data.id], action.data)
         .set('notAttachedAmount', action.notAttachedAmount);
      });

    default:
      return state;
  }
}

export default reducer;

export const getDevices = state =>
  state.getIn(['devices', 'list']);

export const getDevicesAmount = state =>
  state.getIn(['devices', 'list']).size;

export const getFaultAmount = state =>
  state.getIn(['devices', 'faultAmount']);

export const getNotAttachedAmount = state =>
  state.getIn(['devices', 'notAttachedAmount']);
