import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
// import { getVehiclesExSorted, reducerKey } from 'services/FleetModel/reducers/vehiclesReducer';
import { vehiclesActions } from 'services/FleetModel/actions';


import DealerPage, {
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';
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

  render() {
    return (
      <DealerPage>
        <PowerList onVehicleSelect={id => this.vehicleSelected(id)} />
        <FixedContent
          style={{
            height: '100%',
          }}
        >
          <PageHeader text="Fuel Usage" onApply={() => this.forceUpdate()} />
          <VehicleFuel theVehicle={this.props.getVehicleById(this.state.selectedVehicleId)} />
        </FixedContent>
      </DealerPage>
    );
  }
}

Page.propTypes = {
  // vehicles: PropTypes.array.isRequired,
  // selectedVehicleId: PropTypes.string.isRequired,

  getVehicleById: PropTypes.func.isRequired,
};

const mapState = state => ({
  // vehicles: fromFleetReducer.getVehiclesExSorted(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
  getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
};

export default connect(mapState, mapDispatch)(pure(Page));

