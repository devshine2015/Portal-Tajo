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
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { fetchFleetOverview } from 'services/FleetOverview/actions';
import { getFleetOverView } from 'services/FleetOverview/reducer';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import Book from 'utils/reports/spreadsheetGenerator';

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
      timeRange: makePeriodForLast24Hours(),
    };
  }

  // componentDidMount() {
  //   this.applyTimeRange(makePeriodForLast24Hours());
  // }

  applyTimeRange = (timeRange) => {
    this.setState({ isLoading: true, timeRange });
    this.props.fetchFleetOverview(timeRange)
      .then(() => this.setState({ isLoading: false }),
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
    const totalTotal = overviewData.normalDriving + overviewData.idleUnder + overviewData.idleOver;
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
          <IdleOverview idle1={overviewData.idleUnder * normalizer} idle2={overviewData.idleOver * normalizer} />
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
