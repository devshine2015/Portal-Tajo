// all the params related to user selections - store it to
// make sure UX is persistent

import { ZERO_LOCATION, ZERO_ZOOM } from 'utils/constants';

import { fromJS } from 'immutable';
import { contextActions } from '../actions';
import { vehiclesActions } from 'services/FleetModel/actions';

import listTypes from 'components/InstancesList/types';


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
  activeListType: listTypes.withVehicleDetails,

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
    case contextActions.CTX_SELECT_VEH:
      if (!action.setTab) return state.set('selectedVehicleId', action.vehicleId);
      return state.set('selectedVehicleId', action.vehicleId).set('activeListType', listTypes.withVehicleDetails);
    case contextActions.CTX_SELECT_GF:
      if (!action.setTab) return state.set('selectedGFId', action.gfId);
      return state.set('selectedGFId', action.gfId).set('activeListType', listTypes.withGFDetails);
    case vehiclesActions.FLEET_MODEL_VEHICLES_FILTER:
      return state.set('vehicleFilterString', action.searchString);
    default:
      return state;
  }
}

export default contextReducer;

const _ctxReducer = state =>
  state.getIn(['global', 'context']);

export const ctxGetMap = state =>
  _ctxReducer(state).get('map');
export const ctxGetSelectedVehicleId = state =>
  _ctxReducer(state).get('selectedVehicleId');
export const ctxGetSelectedGFId = state =>
  _ctxReducer(state).get('selectedGFId');

export const ctxGetHideGF = state =>
  _ctxReducer(state).get('hideGF')
  && ctxGetPowListTabType(state) !== listTypes.withGFDetails;

export const ctxGetHideVehicles = state =>
  _ctxReducer(state).get('hideVehicles')
  && ctxGetPowListTabType(state) !== listTypes.withVehicleDetails;

export const ctxGetPowListTabType = state =>
  _ctxReducer(state).get('activeListType');

export const getVehicleFilterString = state =>
  state.get('vehicleFilterString');

export const getSelectedVehicleId = state =>
  state.get('selectedVehicleId');
