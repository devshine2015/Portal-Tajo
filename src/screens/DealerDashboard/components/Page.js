import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';

import DealerPage, { PageHeader } from 'containers/DealerPage';
import * as fromFleetReducer from 'services/FleetModel/reducer';

import { VelocityTransitionGroup } from 'velocity-react';

import Layout from 'components/Layout';
import AnimatedLogo from 'components/animated';
import DashboardElements from 'components/DashboardElements';
import { logActions } from 'services/AlertsSystem/actions';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { fetchFleetOverview } from 'services/FleetOverview/actions';
import { getFleetOverView } from 'services/FleetOverview/reducer';
// import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';

import ServiceOverview from './ServiceOverview';
import IdleOverview from './IdleOverview';
import FuelConsumption from './FuelConsumption';
import AlertsChart from './AlertsPieChart';
import AlertSummaryTable from './AlertSummaryTable';

const secondsToHvrs = timeSec => (timeSec / 60 / 60).toFixed(0);

class DealerDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  // componentDidMount() {
  //   this.applyTimeRange(makePeriodForLast24Hours());
  // }

  applyTimeRange = (timeRange) => {
    this.setState({ isLoading: true });
    this.props.fetchFleetOverview(timeRange)
      .then(() => this.setState({ isLoading: false }),
      );
    this.props.fetchLogs(timeRange);
  }

  renderLoading = () => (
    <div>
      <Layout.Content
        style={{
          height: '400px',
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          maxWidth: 'unset',
        }}
      >
        <AnimatedLogo.FullscreenLogo />
      </Layout.Content>
    </div>)

  renderData() {
    const overviewData = this.props.fleetOverviewData;
    // dataString={this.props.vehicles.length.toString()}
    // dataString={overviewData.vehicleCount.toString()}    
    const totalTotal = overviewData.normalDriving + overviewData.idleUnder30Min + overviewData.idleOver30Min;
    const normalizer = totalTotal > 0 ? 100 / totalTotal : 0;
    const divLineStyle = { borderTop: 'solid 1px #00000038', margin: '0 35px' };
    return (
      <div>
        <Layout.Content style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '4px' }}>
          <DashboardElements.DataCard
            title={'Number of Vehicles'}
            dataString={this.props.vehicles.length.toString()}
          />
          <DashboardElements.DataCard
            title={'Total Distance Travelled'}
            dataString={`${overviewData.totalDistance.toFixed(1)}`}
            dataUnits="km"
          />
          <DashboardElements.DataCard
            title={'Avg Speed'}
            dataString={`${overviewData.avgSpeed.toFixed(1)}`}
            dataUnits="km/h"
          />
          <DashboardElements.DataCard
            title={'Total Running Time'}
            dataString={`${secondsToHvrs(overviewData.totalRunningTime)}`}
            dataUnits="hrs"
          />
          <DashboardElements.DataCard
            title={'Total Driving Time'}
            dataString={`${secondsToHvrs(overviewData.totalDrivingTime)}`}
            dataUnits="hrs"
          />
          <DashboardElements.DataCard
            title={'Total Idle Time'}
            dataString={`${secondsToHvrs(overviewData.totalIdleTime)}`}
            dataUnits="hrs"
          />
        </Layout.Content>
        <hr style={divLineStyle} />
        <Layout.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ServiceOverview />
          <IdleOverview idle1={overviewData.idleUnder30Min * normalizer} idle2={overviewData.idleOver30Min * normalizer} />
        </Layout.Content>
        <hr style={divLineStyle} />
        <Layout.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <FuelConsumption fleetOverviewData={overviewData} />
          <AlertsChart
            key="alerts"
          />
        </Layout.Content>
        <hr style={divLineStyle} />
        <Layout.Content style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_TEMPERATURE} />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_SPEEDING} />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_GF} />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_FUEL_DIFF} />
        </Layout.Content>
      </div>
    );
  }

  render() {
    return (
      <DealerPage>
        <PageHeader text="Fleet Overview" onApply={tr => this.applyTimeRange(tr)} />
        <VelocityTransitionGroup enter={{ animation: { opacity: 1 } }} leave={{ animation: { opacity: 0 } }}>
          {this.state.isLoading ? undefined : this.renderData()}
          {this.state.isLoading ? this.renderLoading() : undefined}
        </VelocityTransitionGroup>
      </DealerPage>
    );
  }
}

DealerDashboard.propTypes = {
  vehicles: PropTypes.array.isRequired,
  fleetOverviewData: PropTypes.shape({
    avgSpeed: PropTypes.number,
    idleOver30Min: PropTypes.number,
    idleUnder30Min: PropTypes.number,
    normalDriving: PropTypes.number,
    totalDistance: PropTypes.number,
    totalDrivingTime: PropTypes.number,
    totalIdleTime: PropTypes.number,
    totalRunningTime: PropTypes.number,
    vehicleCount: PropTypes.number,
  }).isRequired,
  // selectedVehicleId: PropTypes.string.isRequired,

  fetchLogs: PropTypes.func.isRequired,
  fetchFleetOverview: PropTypes.func.isRequired,
};

const mapState = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  fleetOverviewData: getFleetOverView(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
  // getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
  fetchLogs: logActions.fetchLogs,
  fetchFleetOverview,
};

export default connect(mapState, mapDispatch)(pure(DealerDashboard));
