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

const noPadding = {
  paddingLeft: 0,
  paddingRight: 0
}

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
        <Layout.Content>
          <div className="row">
            <div className="col-md-2" style={noPadding}>
              <DashboardElements.DataCard
                title={'Number of Vehicles'}
                dataString={this.props.vehicles.length.toString()}
              />
            </div>
            <div className="col-md-2" style={noPadding}>
              <DashboardElements.DataCard
                title={'Total Distance Travelled KM'}
                dataString={'2750'}
              />
            </div>
            <div className="col-md-2" style={noPadding}>
              <DashboardElements.DataCard
                title={'Avg Speed'}
                dataString={'65'}
                unit={'KM'}
              />
            </div>
            <div className="col-md-2" style={noPadding}>
              <DashboardElements.DataCard
                title={'Total Running Time'}
                dataString={'2500'}
                unit={'hrs'}
              />
            </div>
            <div className="col-md-2" style={noPadding}>
              <DashboardElements.DataCard
                title={'Total Driving Time'}
                dataString={'1500'}
                unit={'hrs'}
              />
            </div>
            <div className="col-md-2" style={noPadding}>
              <DashboardElements.DataCard
                title={'Total Idle Time'}
                dataString={'200'}
                unit={'min'}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" style={noPadding}>
              <ServiceOverview />
            </div>
            <div className="col-md-6" style={{paddingLeft: 0}}>
              <IdleOverview />
            </div>
          </div>
          <div className="row" style={{marginTop: 35}}>
            <div className="col-md-6">
              <FuelConsumption />
            </div>
            <div className="col-md-6">
              <AlertsChart key="alerts" />
              <AlertSummaryTable myKind={alertKinds._ALERT_KIND_TEMPERATURE} />
              <AlertSummaryTable myKind={alertKinds._ALERT_KIND_SPEEDING} />
              <AlertSummaryTable myKind={alertKinds._ALERT_KIND_GF} />
              <AlertSummaryTable myKind={alertKinds._ALERT_KIND_FUEL_DIFF} />
            </div>
          </div>
        </Layout.Content>
        {/*
        <Layout.Content style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        </Layout.Content>
        */}
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
