import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import RoutePath from './RoutePath';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import { showSnackbar } from 'containers/Snackbar/actions';

import directions from 'utils/mapServices/google/directions';
import { addMapMenuItem } from 'utils/mapContextMenu';

class RouteFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { routeObj: {} };
  }

  componentDidMount() {
    addMapMenuItem(this.props.theMap, 'mItmRouteTo', (e) => this.routeSelectedVechicleToLatLng(e.latlng));
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.routeToLatLng[0] !== nextProps.routeToLatLng[0];
  // }
  componentWillUnmount() {
  }

  haveRoute = (latLngArray, durationMS, distanceM) => {
    this.setState({ routeObj: {
      pathLatLngs: latLngArray,
      durationMS,
      distanceM,
      destination: latLngArray[latLngArray.length - 1],
    } });
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
//    this.setPath();
    return (
      <RoutePath theMap={this.props.theMap} routeObj={this.state.routeObj} />
    );
  }
}

RouteFinder.propTypes = {
  theMap: React.PropTypes.object,
  vehicles: React.PropTypes.array.isRequired,
  selectedVehicleId: React.PropTypes.string.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),
});
const mapDispatch = {
  showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(RouteFinder));
