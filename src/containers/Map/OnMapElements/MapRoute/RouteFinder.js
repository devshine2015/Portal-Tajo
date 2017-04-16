import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import { showSnackbar } from 'containers/Snackbar/actions';
import { mapStoreRouteObj } from 'containers/Map/reducerAction';

import directions from 'utils/mapServices/google/directions';
import { addMapMenuItem } from 'utils/mapContextMenu';

class RouteFinder extends React.Component {

  componentDidMount() {
    addMapMenuItem(this.props.theMap, 'mItmRouteTo', (e) => this.routeSelectedVechicleToLatLng(e.latlng));
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.routeToLatLng[0] !== nextProps.routeToLatLng[0];
  // }
  componentWillUnmount() {
  }

  haveRoute = (latLngArray, durationMS, distanceM) => {
    this.props.mapStoreRouteObj({
      pathLatLngs: latLngArray,
      durationMS,
      distanceM,
      destination: latLngArray[latLngArray.length - 1],
    });
  }

  routeSelectedVechicleToLatLng = (toLatLng) => {
    const v = getVehicleById(this.props.selectedVehicleId, this.props.vehicles);
    const selectedVehicle = (v !== undefined && v.vehicle !== undefined) ? v.vehicle : null;
    if (selectedVehicle === null) {
      this.props.showSnackbar('Select a vehicle first', 3000);
      return;
    }
    this.routeFromToPos(selectedVehicle.pos, [toLatLng.lat, toLatLng.lng]);
  }

  routeFromToPos = (fromPos, toPos) => {
    directions(fromPos, toPos, this.haveRoute, this.noHaveCallback);
  }

  render() {
    return false;
  }
}

RouteFinder.propTypes = {
  theMap: React.PropTypes.object,
  vehicles: React.PropTypes.array.isRequired,
  selectedVehicleId: React.PropTypes.string.isRequired,
  mapStoreRouteObj: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),
});
const mapDispatch = {
  mapStoreRouteObj,
  showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(RouteFinder));
