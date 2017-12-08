import React from 'react';
import PropTypes from 'prop-types';

// import PortalReports from 'containers/Report';

import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import { getVehiclesExSorted, reducerKey } from 'services/FleetModel/reducers/vehiclesReducer';
import { vehiclesActions } from 'services/FleetModel/actions';

import VehicleMaintenance from './VehicleMaintenance';

import DealerPage, {
  PowerList,
} from 'containers/DealerPage';

class VehicleMaintenancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicleId: '',
    };
  }

  vehicleSelected = (id) => {
    if (id !== this.state.selectedVehicleId) {
      this.setState({ selectedVehicleId: id });
    }
  }

  render() {
    return (
      <DealerPage>
        <PowerList onVehicleSelect={id => this.vehicleSelected(id)} />
        <VehicleMaintenance theVehicle={this.props.getVehicleById(this.state.selectedVehicleId)} />
      </DealerPage>
    );
  }
}

VehicleMaintenancePage.propTypes = {
  // vehicles: PropTypes.array.isRequired,
  // selectedVehicleId: PropTypes.string.isRequired,

  getVehicleById: PropTypes.func.isRequired,
};

const mapState = state => ({
  vehicles: getVehiclesExSorted(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
  getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
};

export default connect(mapState, mapDispatch)(pure(VehicleMaintenancePage));
