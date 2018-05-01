import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import { showSnackbar } from 'containers/Snackbar/actions';
import { mapStoreRouteObj } from 'containers/Map/reducerAction';

import directions from 'utils/mapServices/google/directions';
import { addMapMenuItemEx } from 'utils/mapContextMenu';
const iconRoute16 = require('assets/images/context_menu_icons/rt01_16.png');

class RouteFinder extends React.Component {
  componentDidMount() {
    addMapMenuItemEx(this.props.theMap,
      { text: this.context.translator.getTranslation('ctx_route'),
        icon: iconRoute16,
        callback: (e) => this.routeSelectedVechicleToLatLng(e.latlng),
      });
  }

  shouldComponentUpdate() {
    return false;
  }

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
  theMap: PropTypes.object.isRequired,
  vehicles: PropTypes.array.isRequired,
  selectedVehicleId: PropTypes.string.isRequired,
  mapStoreRouteObj: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
};
RouteFinder.contextTypes = {
  translator: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),
});
const mapDispatch = {
  mapStoreRouteObj,
  showSnackbar,
};

export default connect(mapState, mapDispatch)(RouteFinder);
