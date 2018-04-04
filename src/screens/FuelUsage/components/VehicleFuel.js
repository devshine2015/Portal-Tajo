import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

import Layout from 'components/Layout';
import DashboardElements from 'components/DashboardElements';
import MainActionButton from 'components/Controls/MainActionButton';
import NoPrint from 'components/NoPrint/NoPrint';
import { numberToFixedString } from 'utils/convertors';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';

import { getFuelReportForVehicle, getFuelReportTimeRange } from './../services/reducer';
import { doSaveSpreadSheetSeries, doSaveSpreadSheetOverview } from './../utils/fuelReportGenerators';

import FuelChart from './FuelChart';
import FuelAlertsSummary from './FuelAlertsSummary';
import FuelAlerts from './FuelAlerts';
import FuelMap from './FuelMap';

class VehicleFuel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  doSaveSpreadSheet = () => {
    const fuelReport = this.props.getFuelReportForVehicle(this.props.theVehicleId);
    if (fuelReport === undefined) {
      return;
    }
    const theVehicle = this.props.getVehicleById(this.props.theVehicleId);
    if (theVehicle === undefined) {
      return;
    }
    doSaveSpreadSheetOverview(theVehicle, fuelReport, this.props.timeRange);
    doSaveSpreadSheetSeries(theVehicle, fuelReport, this.props.timeRange);
  }

  doPrint = () => {
    window.print();
  }

  makeChronoPath = () => null

  render() {
    if (!this.props.theVehicleId) {
      return false;
    }

    const theVehicle = this.props.getVehicleById(this.props.theVehicleId);
    if (!theVehicle) {
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
            title={'Total Fuel Consumption'}
            dataString={numberToFixedString(fuelReport.totalConsumption)}
            dataUnits="Ltr"
          />
          <DashboardElements.DataCard
            title={'Liters per KM'}
            dataString={numberToFixedString(fuelReport.ltrPerKm)}
          />
          <DashboardElements.DataCard
            title={'Total Distance'}
            dataString={numberToFixedString(fuelReport.totalDist)}
            dataUnits="km"
          />
          <DashboardElements.DataCard
            title={'Avg Speed'}
            dataString={numberToFixedString(fuelReport.avgSpeed)}
            dataUnits="km/h"
          />
        </Layout.Section>
        <Layout.Section style={{ padding: '32px' }}>
          <FuelAlertsSummary vehicleAlerts={fuelReport.alerts} totalConsumption={fuelReport.totalConsumption} />
        </Layout.Section>
        <Layout.Section style={{ padding: '32px' }}>
          <FuelChart
            fuelSeries={fuelReport.series}
            fuelCapacity={theVehicle.original.fuelCapacity}
            vehicleAlerts={fuelReport.alerts}
          />
        </Layout.Section>
        <NoPrint>
          <Layout.Section style={{ padding: '32px' }}>
            <FuelMap selectedVehicleId={this.props.theVehicleId} />
          </Layout.Section>
        </NoPrint>
        {/* same table - screen and print version - limited height on screen */}
        <NoPrint>
          <Layout.Section style={{ padding: '32px' }}>
            <FuelAlerts vehicleAlerts={fuelReport.alerts} totalConsumption={fuelReport.totalConsumption} height="300px" />
          </Layout.Section>
        </NoPrint>
        <NoPrint onlyPrint>
          <Layout.Section style={{ padding: '32px' }}>
            <FuelAlerts vehicleAlerts={fuelReport.alerts} totalConsumption={fuelReport.totalConsumption} height="auto" />
          </Layout.Section>
        </NoPrint>
        {/* -- same table ------------------------ */}

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
