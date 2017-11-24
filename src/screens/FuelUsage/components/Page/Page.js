import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import DealerPage, {
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
// import { getVehiclesExSorted, reducerKey } from 'services/FleetModel/reducers/vehiclesReducer';
// import { vehiclesActions } from 'services/FleetModel/actions';

import { fetchVehicleFuelReport } from './../../services/actions';


import VehicleFuel from './../VehicleFuel';

class Page extends React.Component {
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

  applyTimeRange = (timeRange) => {
    this.props.fetchVehicleFuelReport(this.state.selectedVehicleId, timeRange);
  }

  render() {
    return (
      <DealerPage>
        <PowerList onVehicleSelect={id => this.vehicleSelected(id)} />
        <FixedContent
          style={{
            height: '100%',
          }}
        >
          <PageHeader text="Fuel Usage" onApply={tr => this.applyTimeRange(tr)} />
          <VehicleFuel theVehicle={this.props.getVehicleById(this.state.selectedVehicleId)} />
        </FixedContent>
      </DealerPage>
    );
  }
}

Page.propTypes = {
  getVehicleById: PropTypes.func.isRequired,
  fetchVehicleFuelReport: PropTypes.func.isRequired,
};

const mapState = state => ({
  // vehicles: fromFleetReducer.getVehiclesExSorted(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
  getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
  fetchVehicleFuelReport,
};

export default connect(mapState, mapDispatch)(pure(Page));

