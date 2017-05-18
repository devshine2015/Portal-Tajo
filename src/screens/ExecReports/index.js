// import PortalReports from 'containers/Report';

// export default PortalReports;
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Layout from 'components/Layout';
import VehiclesList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import SoloReport from './components/SoloReport';

import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';


import * as fromFleetReducer from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import listTypes from 'components/InstancesList/types';

class ExecReport extends React.Component {

  render() {
    if (this.props.vehicles.length === 0) {
      return null;
    }

    return (
      <Layout.ScreenWithList>
        <PowerList
          scrollable
          filter={
            <Filter filterFunc={this.props.filterFunc} />
            }
          content={
            <VehiclesList
              data={this.props.vehicles}
              currentExpandedItemId={this.props.selectedVehicleId}
              type={listTypes.vehicleChronicle}
            />
            }
        />
        <Layout.FixedContent>
          <SoloReport vehicleId={this.props.selectedVehicleId} />
        </Layout.FixedContent>
      </Layout.ScreenWithList>
    );
  }
}

ExecReport.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  selectedVehicleId: React.PropTypes.string.isRequired,

  filterFunc: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
};

export default connect(mapState, mapDispatch)(pure(ExecReport));
