import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';

import DealerPage, { PageHeader } from 'containers/DealerPage';
import * as fromFleetReducer from 'services/FleetModel/reducer';

import Layout from 'components/Layout';
import DashboardElements from 'components/DashboardElements';

import ServiceOverview from './ServiceOverview';
import IdleOverview from './IdleOverview';
import FuelConsumption from './FuelConsumption';

class DealerDashboard extends React.Component {

  render() {
    return (
      <DealerPage>
        <PageHeader text="Fleet Overview" onApply={() => this.forceUpdate()} />
        {/* containerClass={classes.widgetContainer} */}
        <Layout.Content style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <DashboardElements.DataCard
            title={'Number of Vehicles'}
            dataString={this.props.vehicles.length.toString()}
          />
          <DashboardElements.DataCard
            title={'Toal Distance Traveled'}
            dataString={'22373 km'}
          />
          <DashboardElements.DataCard
            title={'Avg Speed'}
            dataString={'67 km/h'}
          />
          <DashboardElements.DataCard
            title={'Toal Running Time'}
            dataString={'2538 hrs'}
          />
          <DashboardElements.DataCard
            title={'Toal Driving Time'}
            dataString={'1452 hrs'}
          />
          <DashboardElements.DataCard
            title={'Toal Idle Time'}
            dataString={'195 hrs'}
          />
          <ServiceOverview />
          <IdleOverview />
          <FuelConsumption />
          <DashboardElements.PieChart
            key="alerts"
          />
        </Layout.Content>
      </DealerPage>
    );
  }
}


DealerDashboard.propTypes = {
  vehicles: PropTypes.array.isRequired,
  // selectedVehicleId: PropTypes.string.isRequired,

  // filterFunc: PropTypes.func.isRequired,
};

const mapState = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
  // getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
  // filterFunc: vehiclesActions.filterVehicles,
};

export default connect(mapState, mapDispatch)(pure(DealerDashboard));
