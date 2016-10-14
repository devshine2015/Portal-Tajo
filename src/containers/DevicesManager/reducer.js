import { fromJS, List, Map } from 'immutable';
import { fetchActions } from './actions';

const initialState = fromJS({
  isEditing: false,
  notAttached: new List([]),
  faultVehicles: new List([]),
  associatedVehicles: new Map({}),
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchActions.DEVICES_MANAGER_SETUP_SUCCESS:
      return state.withMutations(s => {
        s.set('faultVehicles', new List(action.faultVehicles))
         .set('notAttached', new List(action.notAttached))
         .set('associatedVehicles', new Map(action.associatedVehicles));
      });

    default:
      return state;
  }
}

export default reducer;

export const getIsEditing = state =>
  state.getIn(['devicesManager', 'isEditing']);

export const getFaultVehicles = state =>
  state.getIn(['devicesManager', 'faultVehicles']);

export const hasFaultVehicle = (state, deviceId) =>
  state.getIn(['devicesManager', 'faultVehicles'])
       .findIndex(id => id === deviceId) !== -1;

export const getNotAttachedList = state =>
  state.getIn(['devicesManager', 'notAttached']);

export const isNotAttached = (state, deviceId) =>
  state.hasIn(['devicesManager', 'notAttached', deviceId]);

export const getAssociatedVehicles = state =>
  state.getIn(['devicesManager', 'associatedVehicles']);

export const getAssociatedVehicleName = (state, deviceId) =>
  state.getIn(['devicesManager', 'associatedVehicles', deviceId]);
