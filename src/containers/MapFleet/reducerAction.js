// keep map zoom and center point here - to have same map bounds when
// switching screens/views (different map instances)
// since its tiny - puting all in a single file for now
// import { fromJS } from 'immutable';
import { ZERO_LOCATION, ZERO_LOCATION_MWA, ZERO_ZOOM } from 'utils/constants';
import { isMwa } from 'configs';

const MAP_STOREVIEW = 'map/storeView';
const mapInitialState = {
  // center: isMwa ? ZERO_LOCATION_MWA : ZERO_LOCATION,
  // zoom: ZERO_ZOOM,
};

export default function mapReducer(state = mapInitialState, action) {
  switch (action.type) {
    case MAP_STOREVIEW:
      return {
        center: action.center,
        zoom: action.zoom,
      };
    default:
      return state;
  }
}
// TODO: implement proper fleet-based default locations mechanism
export const mapStoreGetView = (state) => {
  const mapView = state.getIn(['mapView']);
  if (mapView.center === undefined) {
    return {
      center: isMwa ? ZERO_LOCATION_MWA : ZERO_LOCATION,
      zoom: ZERO_ZOOM,
    };
  }
  return mapView;
};

export const mapStoreSetView = (center, zoom) => (dispatch) =>
  dispatch({
    type: MAP_STOREVIEW,
    center,
    zoom,
  });
