import { Map, List, fromJS } from 'immutable';
import {
  DEVICES_DEVICE_DEACTIVATE,
  DEVICES_FETCH_SUCCESS,
  DEVICES_DEVICE_ADD,
  DEVICES_UPDATE,
} from './actions';

const initialState = fromJS({
  list: new Map({}),
  faultAmount: 0,
  notAttachedAmount: 0,
  vacantDevices: new List([]),
  errorMessage: '',
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case DEVICES_FETCH_SUCCESS:
      return state.withMutations(s => {
        s.set('list', new Map(action.devices))
         .set('vacantDevices', new List(action.vacantDevices))
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
         .set('notAttachedAmount', action.notAttachedAmount)
         .update('vacantDevices', list => list.push(action.data.original.sn));
      });

    case DEVICES_DEVICE_DEACTIVATE:
      return state.withMutations(s => {
        s.update('list', list => list.delete(action.id))
         .set('faultAmount', action.faultAmount)
         .set('notAttachedAmount', action.notAttachedAmount)
         .update('vacantDevices', list => list.delete(action.vacantDeviceIndex));
      });

    default:
      return state;
  }
}

export default reducer;

export const getDevices = state =>
  state.getIn(['devices', 'list']);

export const hasDevices = state =>
  state.getIn(['devices', 'list']).size > 0;

export const getDevicesAmount = state =>
  state.getIn(['devices', 'list']).size;

export const getFaultAmount = state =>
  state.getIn(['devices', 'faultAmount']);

export const getNotAttachedAmount = state =>
  state.getIn(['devices', 'notAttachedAmount']);

export const getVacantDevices = state =>
  state.getIn(['devices', 'vacantDevices']).toArray();

export const getVacantDeviceIndex = (state, name) =>
  state.getIn(['devices', 'vacantDevices'])
       .keyOf(name);

export const getDeviceById = (state, id) =>
  state.getIn(['devices', 'list', id]);
