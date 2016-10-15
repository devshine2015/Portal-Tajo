import { fromJS, List, Map } from 'immutable';
import {
  fetchActions,
  filterActions,
  searchActions,
} from './actions';

const initialState = fromJS({
  isEditing: false,
  notAttached: new List([]),
  faultVehicles: new List([]),
  associatedVehicles: new Map({}),
  currentFilter: 'all',
  searchString: '',
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchActions.DEVICES_MANAGER_SETUP_SUCCESS:
      return state.withMutations(s => {
        s.set('faultVehicles', new List(action.faultVehicles))
         .set('notAttached', new List(action.notAttached))
         .set('associatedVehicles', new Map(action.associatedVehicles));
      });

    case filterActions.DEVICES_MANAGER_FILTER:
      return state.set('currentFilter', action.filterType);

    case searchActions.DEVICES_MANAGER_SEARCH:
      return state.set('searchString', action.searchString);

    case searchActions.DEVICES_MANAGER_SEARCH_RESET:
      return state.set('searchString', initialState.searchString);

    default:
      return state;
  }
}

export default reducer;

export const getIsEditing = state =>
  state.getIn(['devicesManager', 'isEditing']);

export const getFaultVehicles = state =>
  state.getIn(['devicesManager', 'faultVehicles']);

export const getFaultVehiclesAmount = state =>
  state.getIn(['devicesManager', 'faultVehicles']).size;

export const hasFaultVehicle = (state, deviceId) =>
  state.getIn(['devicesManager', 'faultVehicles'])
       .findIndex(id => id === deviceId) !== -1;

export const getNotAttached = state =>
  state.getIn(['devicesManager', 'notAttached']);

export const getNotAttachedAmount = state =>
  state.getIn(['devicesManager', 'notAttached']).size;

export const isNotAttached = (state, deviceId) =>
  state.hasIn(['devicesManager', 'notAttached', deviceId]);

export const getAssociatedVehicles = state =>
  state.getIn(['devicesManager', 'associatedVehicles']);

export const getAssociatedVehicleName = (state, deviceId) =>
  state.getIn(['devicesManager', 'associatedVehicles', deviceId]);

export const getCurrentFilter = state =>
  state.getIn(['devicesManager', 'currentFilter']);

export const getSearchString = state =>
  state.getIn(['devicesManager', 'searchString']);
