import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import moment from 'moment';

import DealerPage, { PageHeader } from 'containers/DealerPage';
import * as fromFleetReducer from 'services/FleetModel/reducer';

import MainActionButton from 'components/Controls/MainActionButton';
import { VelocityTransitionGroup } from 'velocity-react';

import Layout from 'components/Layout';
import AnimatedLogo from 'components/animated';
import DashboardElements from 'components/DashboardElements';
import { logActions } from 'services/AlertsSystem/actions';
// import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { fetchFleetVehicleStats, fetchFleetFuelStats } from 'services/FleetOverview/actions';
import { getFleetOverView } from 'services/FleetOverview/reducer';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import { numberToFixedString } from 'utils/convertors';

import Book from 'utils/reports/spreadsheetGenerator';

import ServiceOverview from './ServiceOverview';
import IdleOverviewBin from './IdleOverviewBin';
// import IdleOverview from './IdleOverview';
import FuelConsumption from './FuelConsumption';
import AlertsChart from './AlertsPieChart';
// import AlertSummaryTable from './AlertSummaryTable';

// const secondsToHvrs = timeSec => (timeSec / 60 / 60).toFixed(0);
const hoursToHvrs = timeHvr => (timeHvr).toFixed(0);

class DealerDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIsLoading: false,
      fleetFuelIsLoading: false,
      timeRange: makePeriodForLast24Hours(),
    };
  }

  // componentDidMount() {
  //   this.applyTimeRange(makePeriodForLast24Hours());
  // }

  applyTimeRange = (timeRange) => {
    this.setState({
      pageIsLoading: true,
      fleetFuelIsLoading: true,
      timeRange,
    });
    this.props.fetchFleetVehicleStats(timeRange)
      .then(() => this.setState({ pageIsLoading: false }),
      );
    this.props.fetchFleetFuelStats(timeRange)
      .then(() => this.setState({ fleetFuelIsLoading: false }),
      );
    this.props.fetchLogs(timeRange);
  }

  generateHeaders = entries => entries.map(aEntr => aEntr[0])

  generateData = entries => [entries.map(aEntr => aEntr[1])]

  doSaveSpreadSheet = () => {
    const overviewEntries = Object.entries(this.props.fleetOverviewData);
    const book = new Book(this.generateHeaders(overviewEntries),
      this.generateData(overviewEntries),
      { fileName: `fleet_overview_${moment(this.state.timeRange.fromDate).format('DD-MM-YYYY')}_${moment(this.state.timeRange.toDate).format('DD-MM-YYYY')}` });
    book.createBook();
  }

  doPrint = () => {
    window.print();
  }

  renderLoading = () => (
    <div>
      <Layout.Content
        style={{
          backgroundColor: 'white',
          height: '400px',
          maxWidth: 'unset',
          position: 'absolute',
          width: '100%',
        }}
      >
        <AnimatedLogo.FullscreenLogo />
      </Layout.Content>
    </div>
  );

  renderVehicleStats() {
    const overviewData = this.props.fleetOverviewData;
    // dataString={this.props.vehicles.length.toString()}
    // dataString={overviewData.vehicleCount.toString()}    
    // const totalTotal = overviewData.normalDriving + overviewData.idleUnder + overviewData.idleOver;
    // const normalizer = totalTotal > 0 ? 100 / totalTotal : 0;
    const totalTotal = overviewData.totalDrivingTime + overviewData.totalIdleTime;
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
            dataString={numberToFixedString(overviewData.totalDistance)}
            dataUnits="km"
          />
          <DashboardElements.DataCard
            title={'Avg Speed'}
            dataString={numberToFixedString(overviewData.avgSpeed)}
            dataUnits="km/h"
          />
          <DashboardElements.DataCard
            title={'Total Running Time'}
            dataString={`${hoursToHvrs(overviewData.totalRunningTime)}`}
            dataUnits="hrs"
          />
          <DashboardElements.DataCard
            title={'Total Driving Time'}
            dataString={`${hoursToHvrs(overviewData.totalDrivingTime)}`}
            dataUnits="hrs"
          />
          <DashboardElements.DataCard
            title={'Total Idle Time'}
            dataString={`${hoursToHvrs(overviewData.totalIdleTime)}`}
            dataUnits="hrs"
          />
          <DashboardElements.DataCard
            title={'Total Idle Fuel'}
            dataString={`${numberToFixedString(overviewData.totalIdleFuelUsed)}`}
            dataUnits="ltr"
          />
        </Layout.Content>
        <hr style={divLineStyle} />
        <Layout.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ServiceOverview />
          <IdleOverviewBin idle={overviewData.totalIdleTime * normalizer} />
          {/* <IdleOverview idle1={overviewData.idleUnder * normalizer} idle2={overviewData.idleOver * normalizer} /> */}
        </Layout.Content>
        <hr style={divLineStyle} />
      </div>
    );
  }

  renderFuelStats() {
    const { totalFuel, totalLoss, totalGain, totalDistance } = this.props.fleetOverviewData;
    const divLineStyle = { borderTop: 'solid 1px #00000038', margin: '0 35px' };
    return (
      <div>
        <Layout.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <FuelConsumption
            totalFuel={totalFuel}
            totalLoss={totalLoss}
            totalGain={totalGain}
            totalDistance={totalDistance}
          />
          <AlertsChart
            key="alerts"
            timeRange={this.state.timeRange}
          />
        </Layout.Content>
        <hr style={divLineStyle} />
        {/* <Layout.Content style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_TEMPERATURE} />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_SPEEDING} />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_GF} />
          <AlertSummaryTable myKind={alertKinds._ALERT_KIND_FUEL_DIFF} />
        </Layout.Content> */}
        <Layout.Content style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <MainActionButton
            label="Print"
            onClick={this.doPrint}
            icon={null}
          />
          <MainActionButton
            label="Save RAW"
            onClick={this.doSaveSpreadSheet}
            icon={null}
            style={{ marginLeft: '32px' }}
          />
        </Layout.Content>
      </div>
    );
  }

  render() {
    return (
      <DealerPage>
        <PageHeader text="Fleet Overview" onApply={tr => this.applyTimeRange(tr)} />
        <VelocityTransitionGroup enter={{ animation: { opacity: 1 } }} leave={{ animation: { opacity: 0 } }}>
          { this.state.pageIsLoading ? this.renderLoading() : this.renderVehicleStats() }
          { this.state.fleetFuelIsLoading ? this.renderLoading() : this.renderFuelStats() }
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
    totalFuel: PropTypes.number,
    totalLoss: PropTypes.number,
    totalGain: PropTypes.number,
  }).isRequired,
  fetchLogs: PropTypes.func.isRequired,
  fetchFleetVehicleStats: PropTypes.func.isRequired,
  fetchFleetFuelStats: PropTypes.func.isRequired,
  // selectedVehicleId: PropTypes.string.isRequired,
};

const mapState = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  fleetOverviewData: getFleetOverView(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
  // getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
  fetchLogs: logActions.fetchLogs,
  fetchFleetVehicleStats,
  fetchFleetFuelStats,
};

export default connect(mapState, mapDispatch)(pure(DealerDashboard));
