import { Map, List, fromJS } from 'immutable';
import {
  DEVICES_DEVICE_DEACTIVATE,
  DEVICES_FETCH_SUCCESS,
  DEVICES_DEVICE_ADD,
  DEVICES_UPDATE,
  DEVICE_DETACHED,
  DEVICE_ATTACHED,
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

    case DEVICE_ATTACHED:
      return state.withMutations(st => {
        const index = state.get('vacantDevices').keyOf(action.deviceId);

        st.set('notAttachedAmount', st.get('notAttachedAmount') - 1)
          .update('vacantDevices', list => list.delete(index))
          .updateIn(['list', action.deviceId], device => {
            device.notAttached = false;
            device.original.vehicleId = action.vehicleId;

            return device;
          });
      });

    case DEVICE_DETACHED:
      return state.withMutations(st => {
        st.set('notAttachedAmount', st.get('notAttachedAmount') + 1)
          .update('vacantDevices', list => list.push(action.deviceId))
          .updateIn(['list', action.deviceId], device => {
            device.notAttached = true;
            device.original.vehicleId = '';

            return device;
          });
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
