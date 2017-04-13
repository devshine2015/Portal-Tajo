// keep map zoom and center point here - to have same map bounds when
// switching screens/views (different map instances)
// since its tiny - puting all in a single file for now
import { fromJS } from 'immutable';
import { ZERO_LOCATION, ZERO_LOCATION_MWA, ZERO_ZOOM } from 'utils/constants';
import { isMwa } from 'configs';

const MAP_STOREVIEW = 'map/storeView';
const MAP_PAN_TO = 'map/panTo';
const mapInitialState = fromJS({
  panLatLngs: null,
  // center: isMwa ? ZERO_LOCATION_MWA : ZERO_LOCATION,
  // zoom: ZERO_ZOOM,
  mapView: {},
});

export default function mapReducer(state = mapInitialState, action) {
  switch (action.type) {
    case MAP_STOREVIEW:
      return state.set('mapView', {
        center: action.center,
        zoom: action.zoom,
      });
    case MAP_PAN_TO:
      return state.set('panLatLngs', action.panLatLngs);
    default:
      return state;
  }
}

const _mapStateReducer = (state) => state.get('mapState');

// TODO: implement proper fleet-based default locations mechanism
export const mapStoreGetView = (state) => {
  const mapView = _mapStateReducer(state).get('mapView');
  // if (mapView.center === undefined) {
  return {
      center: isMwa ? ZERO_LOCATION_MWA : ZERO_LOCATION,
      zoom: ZERO_ZOOM,
    };
  // }
  // return mapView;
};

// TODO: implement proper fleet-based default locations mechanism
export const mapStoreGetPan = (state) => (_mapStateReducer(state).get('panLatLngs'));


export const mapStoreSetView = (center, zoom) => (dispatch) =>
  dispatch({
    type: MAP_STOREVIEW,
    center,
    zoom,
  });

export const mapStoreSetPan = (panLatLngs) => (dispatch) =>
  dispatch({
    type: MAP_PAN_TO,
    panLatLngs,
  });
