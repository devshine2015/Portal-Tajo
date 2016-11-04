// // all the params related to user selections - store it to
// // make sure UX is persistent
//
// import { ZERO_LOCATION, ZERO_ZOOM } from 'utils/constants';
//
// import { fromJS } from 'immutable';
// import { contextActions } from '../actions';
//
// const initialState = fromJS({
//   map: {
//     center: ZERO_LOCATION,
//     zoom: ZERO_ZOOM,
//   },
//   filter: {
//     string: '',
//     presets: null,
//   },
//   selectedVehicleId: '',
//   selectedGFId: '',
//   hideGF: false,
//   hideVehicles: false,
// });
//
// function contextReducer(state = initialState, action) {
//   switch (action.type) {
//     case contextActions.MAP_STOREVIEW:
//       return state{
//         center: action.center,
//         zoom: action.zoom,
//       };
//     default:
//       return state;
//   }
// }
// export const ctxMapView = (state) =>
//   state.getIn(['mapView']);
//
// export default contextReducer;
//
export const ctxGetMap = state =>
  state.getIn(['global', 'context']).map;
export const ctxGetSelectedVehicleId = state =>
  state.getIn(['global', 'context']).selectedVehicleId;
export const ctxGetSelectedGFId = state =>
  state.getIn(['global', 'context']).selectedGFId;
export const ctxGetHideGF = state =>
  state.getIn(['global', 'context']).hideGF;
export const ctxGetHideVehicles = state =>
  state.getIn(['global', 'context']).hideVehicles;
