import React from 'react';
import { connect } from 'react-redux';
// export default PortalReports;
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import moment from 'moment';

import Layout from 'components/Layout';
import DashboardElements from 'components/DashboardElements';
import MainActionButton from 'components/Controls/MainActionButton';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import Book from 'utils/reports/spreadsheetGenerator';

import { getFuelReportForVehicle, getFuelReportTimeRange } from './../services/reducer';

import FuelChart from './FuelChart';
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

  generateFuelRaw = fuelReport => Object.entries(fuelReport.series)
    .sort((a, b) => moment(a[0]).valueOf() < moment(b[0]).valueOf() ? -1 : 1)
    .map(aData => [moment(aData[0]).format('DD-MM-YYYY HH:mm:ss'), aData[1]])

  doSaveSpreadSheet = () => {
    const fuelReport = this.props.getFuelReportForVehicle(this.props.theVehicleId);
    if (fuelReport === undefined) {
      return;
    }
    const theVehicle = this.props.getVehicleById(this.props.theVehicleId);
    if (theVehicle === undefined) {
      return;
    }
    const fileName = `fuel_${theVehicle.original.name}_${moment(this.props.timeRange.fromDate).format('DD-MM-YYYY')}_${moment(this.props.timeRange.toDate).format('DD-MM-YYYY')}`;
    const book = new Book(['time', 'fuel, ltr'],
      this.generateFuelRaw(fuelReport),
      { fileName });
    book.createBook();
  }

  doPrint = () => {
    window.print();
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
        <Layout.Section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '32px' }}>
          <DashboardElements.DataCard
            title={'Tank Capacity'}
            dataString={fuelCap}
            dataUnits="Ltr"
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
        <Layout.Section style={{ padding: '32px' }}>
          <FuelAlertsSummary vehicleAlerts={fuelReport.alerts} totalConsumption={fuelReport.totalConsumption} />
        </Layout.Section>
        <Layout.Section style={{ padding: '32px' }}>
          <FuelChart fuelSeries={fuelReport.series} fuelCapacity={theVehicle.original.fuelCapacity} />
        </Layout.Section>
        <Layout.Section style={{ padding: '32px' }}>
          <FuelAlerts vehicleAlerts={fuelReport.alerts} totalConsumption={fuelReport.totalConsumption} />
        </Layout.Section>
        <Layout.Section style={{ padding: '32px' }}>
          <MainActionButton
            label="Save RAW"
            onClick={this.doSaveSpreadSheet}
            icon={null}
            style={{ marginLeft: '32px' }}
          />
          <MainActionButton
            label="Print"
            onClick={this.doPrint}
            icon={null}
          />
        </Layout.Section>
      </Layout.Content>
    );
  }
}

VehicleFuel.propTypes = {
  theVehicleId: PropTypes.string.isRequired,
  getVehicleById: PropTypes.func.isRequired,
  getFuelReportForVehicle: PropTypes.func.isRequired,
  timeRange: PropTypes.object.isRequired,
};

const mapState = state => ({
  getVehicleById: getVehicleByIdFunc(state),
  getFuelReportForVehicle: getFuelReportForVehicle(state),
  timeRange: getFuelReportTimeRange(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(VehicleFuel));
