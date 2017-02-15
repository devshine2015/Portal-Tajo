// all the params related to user selections - store it to
// make sure UX is persistent

import { ZERO_LOCATION, ZERO_ZOOM } from 'utils/constants';

import { fromJS } from 'immutable';
import { contextActions } from '../actions';
import { vehiclesActions } from 'services/FleetModel/actions';

const initialState = fromJS({
  map: {
    center: ZERO_LOCATION,
    zoom: ZERO_ZOOM,
  },
  selectedVehicleId: '',
  selectedGFId: '',
  hideGF: false,
  hideVehicles: false,
  // what we have currently in PowerList Tabs
  activeListType: '',

  // keep search value for vehicle across all screens
  vehicleFilterString: '',
});

function contextReducer(state = initialState, action) {
  switch (action.type) {
    case contextActions.CTX_MAP_STOREVIEW:
    // TODO: implement!
      return state;
    case contextActions.CTX_HIDE_GF:
      return state.set('hideGF', action.doHide);
    case contextActions.CTX_HIDE_VEH:
      return state.set('hideVehicles', action.doHide);
    case contextActions.CTX_PL_TAB:
      return state.set('activeListType', action.tabType);

    case vehiclesActions.FLEET_MODEL_VEHICLES_FILTER:
      return state.set('vehicleFilterString', action.searchString);

    default:
      return state;
  }
}

const _ctxReducer = state =>
  state.getIn(['global', 'context']);

export default contextReducer;

export const ctxGetMap = state =>
  _ctxReducer(state).get('map');
export const ctxGetSelectedVehicleId = state =>
  _ctxReducer(state).get('selectedVehicleId');
export const ctxGetSelectedGFId = state =>
  _ctxReducer(state).get('selectedGFId');
export const ctxGetHideGF = state =>
  _ctxReducer(state).get('hideGF');
export const ctxGetHideVehicles = state =>
  _ctxReducer(state).get('hideVehicles');
export const ctxGetPowListTabType = state =>
  _ctxReducer(state).get('activeListType');

export const getVehicleFilterString = state =>
  state.get('vehicleFilterString');
