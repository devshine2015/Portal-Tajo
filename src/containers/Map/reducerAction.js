// keep map zoom and center point here - to have same map bounds when
// switching screens/views (different map instances)
// since its tiny - puting all in a single file for now
import { fromJS } from 'immutable';
import { ZERO_LOCATION, ZERO_LOCATION_MWA, ZERO_ZOOM } from 'utils/constants';
import { isMwa } from 'configs';

const MAP_STOREVIEW = 'map/storeView';
const MAP_PAN_TO = 'map/panTo';
const MAP_FOCUS_ON_COORDS = 'map/focusOnCoords';
const MAP_CLEAN_FOCUS_COORDS = 'map/cleanFocusCoords';
const MAP_ROUTE_OBJ = 'map/routeObj';

const mapInitialState = fromJS({
  // center: isMwa ? ZERO_LOCATION_MWA : ZERO_LOCATION,
  // zoom: ZERO_ZOOM,
  mapView: {},
  focusCoords: null,
  panLatLngs: null,
  routeObj: {},
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
    case MAP_FOCUS_ON_COORDS:
      return state.set('focusCoords', action.coords);
    case MAP_CLEAN_FOCUS_COORDS:
      return state.set('focusCoords', mapInitialState.focusCoords);
    case MAP_ROUTE_OBJ:
      return state.set('routeObj', action.routeObj);
    default:
      return state;
  }
}

const _mapStateReducer = state => state.get('mapState');

// TODO: implement proper fleet-based default locations mechanism
export const mapStoreGetView = () => {
  // const mapView = _mapStateReducer(state).get('mapView');
  // if (mapView.center === undefined) {
  return {
    center: isMwa ? ZERO_LOCATION_MWA : ZERO_LOCATION,
    zoom: ZERO_ZOOM,
  };
  // }
  // return mapView;
};

export const mapStoreGetPan = state => _mapStateReducer(state).get('panLatLngs');
export const mapStoreGetRoute = state => _mapStateReducer(state).get('routeObj');
export const mapGetFocusCoords = state => _mapStateReducer(state).get('focusCoords');

export const mapStoreSetView = (center, zoom) => dispatch =>
  dispatch({
    type: MAP_STOREVIEW,
    center,
    zoom,
  });

export const mapStoreSetPan = panLatLngs => dispatch =>
  dispatch({
    type: MAP_PAN_TO,
    panLatLngs,
  });

export const mapSetFocusCoords = coords => dispatch =>
  dispatch({
    type: MAP_FOCUS_ON_COORDS,
    coords,
  });
export const mapCleanFocusCoords = () => dispatch =>
  dispatch({
    type: MAP_CLEAN_FOCUS_COORDS,
  });

export const mapStoreRouteObj = routeObj => dispatch =>
  dispatch({
    type: MAP_ROUTE_OBJ,
    routeObj,
  });
