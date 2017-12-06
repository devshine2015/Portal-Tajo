import React from 'react';
import { connect } from 'react-redux';

// export default PortalReports;
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
// import { connect } from 'react-redux';

import Layout from 'components/Layout';
import DashboardElements from 'components/DashboardElements';
import LineChart from 'components/DashboardElements/LineChart';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';

import { getFuelReportForVehicle } from './../services/reducer';

import FuelAlertsSummary from './FuelAlertsSummary';
import FuelAlerts from './FuelAlerts';

// import { makeMaintenanceData,
//   MaintenanceStatus } from './../utils/maintenanceHelper';


class VehicleFuel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    if (!this.props.theVehicleId) {
      return false;
    }

    const theVehicle = this.props.getVehicleById(this.props.theVehicleId);
    if (theVehicle === undefined) {
      return false;
    }

    const fuelReport = this.props.getFuelReportForVehicle(this.props.theVehicleId);
    if (fuelReport === undefined) {
      return false;
    }
    const fuelCap = (theVehicle.original.fuelCapacity !== undefined
      && theVehicle.original.fuelCapacity > 0)
      ? theVehicle.original.fuelCapacity.toString() : 'N/A';

    return (
      <Layout.Content style={{ padding: '0' }}>
        <Layout.Section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <DashboardElements.DataCard
            title={'Tank Capacity'}
            dataString={fuelCap}
          />
          <DashboardElements.DataCard
            title={'Total Fuel Concumption'}
            dataString={fuelReport.totalConsumption.toFixed(1).toString()}
            dataUnits="Ltr"
          />
          <DashboardElements.DataCard
            title={'Liters per KM'}
            dataString={fuelReport.ltrPerKm.toFixed(1).toString()}
          />
          <DashboardElements.DataCard
            title={'Total Distance'}
            dataString={fuelReport.totalDist.toFixed(1).toString()}
            dataUnits="km"
          />
          <DashboardElements.DataCard
            title={'Speed Avg'}
            dataString={fuelReport.avgSpeed.toFixed(1).toString()}
            dataUnits="km/h"
          />
        </Layout.Section>
        <Layout.Section style={{ padding: '24px' }}>
          <FuelAlertsSummary vehicleAlerts={fuelReport.alerts} />
        </Layout.Section>
        <Layout.Section style={{ padding: '4px' }}>
          <LineChart fuelSeries={fuelReport.series} />
        </Layout.Section>
        <Layout.Section style={{ padding: '24px' }}>
          <FuelAlerts vehicleAlerts={fuelReport.alerts} />
        </Layout.Section>
      </Layout.Content>
    );
  }
}

VehicleFuel.propTypes = {
  theVehicleId: PropTypes.string.isRequired,
  getVehicleById: PropTypes.func.isRequired,
  getFuelReportForVehicle: PropTypes.func.isRequired,
};

const mapState = state => ({
  getVehicleById: getVehicleByIdFunc(state),
  getFuelReportForVehicle: getFuelReportForVehicle(state),
});
const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(VehicleFuel));
