import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';

import DealerPage, { PageHeader } from 'containers/DealerPage';
import * as fromFleetReducer from 'services/FleetModel/reducer';

import Layout from 'components/Layout';
import DashboardElements from 'components/DashboardElements';
import { logActions } from 'services/AlertsSystem/actions';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

import ServiceOverview from './ServiceOverview';
import IdleOverview from './IdleOverview';
import FuelConsumption from './FuelConsumption';
import AlertsChart from './AlertsPieChart';
import AlertSummaryTable from './AlertSummaryTable';

import FleetForm from './FleetForm';


class DealerDashboard extends React.Component {
  // state = {
  //   isDefaultRange: true,
  // };  
  applyTimeRange = (timeRange) => {
    this.props.fetchLogs(timeRange)
      .then();
  }

  render() {
    return (
      <DealerPage>
        <PageHeader text="Fleet Overview" onApply={tr => this.applyTimeRange(tr)} />
        {/* containerClass={classes.widgetContainer} */}
        <FleetForm />
        <Layout.Content style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <DashboardElements.DataCard
            title={'Number of Vehicles'}
            dataString={this.props.vehicles.length.toString()}
          />
          <DashboardElements.DataCard
            title={'Total Distance Travelled'}
            dataString={'22373 km'}
          />
          <DashboardElements.DataCard
            title={'Avg Speed'}
            dataString={'67 km/h'}
          />
          <DashboardElements.DataCard
            title={'Total Running Time'}
            dataString={'2538 hrs'}
          />
          <DashboardElements.DataCard
            title={'Total Driving Time'}
            dataString={'1452 hrs'}
          />
          <DashboardElements.DataCard
            title={'Total Idle Time'}
            dataString={'195 hrs'}
          />
          <ServiceOverview />
          <IdleOverview />
          <FuelConsumption />
        </Layout.Content>
        <Layout.Content style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <AlertsChart
            key="alerts"
          />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_TEMPERATURE} />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_SPEEDING} />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_GF} />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_FUEL_DIFF} />
        </Layout.Content>
      </DealerPage>
    );
  }
}

DealerDashboard.propTypes = {
  vehicles: PropTypes.array.isRequired,
  // selectedVehicleId: PropTypes.string.isRequired,

  fetchLogs: PropTypes.func.isRequired,
};

const mapState = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
  // getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
  fetchLogs: logActions.fetchLogs,
};

export default connect(mapState, mapDispatch)(pure(DealerDashboard));
