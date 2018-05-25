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
import styles from './styles.css';

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
      <div className={styles.overviewWrapper}>
        <div className={styles.infoSectionsWrapper}>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Tank Capacity</h3>
            <div className={styles.infoSectionValue}>{fuelCap} Ltr</div>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Total Fuel Consumption</h3>
            <div className={styles.infoSectionValue}>{numberToFixedString(fuelReport.totalConsumption)} Ltr</div>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>KM / Litre</h3>
            <div className={styles.infoSectionValue}>{numberToFixedString(fuelReport.ltrPerKm)}</div>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Total Distance</h3>
            <div className={styles.infoSectionValue}>{numberToFixedString(fuelReport.totalDist)} km</div>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Avg Speed</h3>
            <div className={styles.infoSectionValue}>{numberToFixedString(fuelReport.avgSpeed)} km/h</div>
          </div>
        </div>
        {/* <Layout.Section style={{ padding: '32px' }}>
          <FuelAlertsSummary vehicleAlerts={fuelReport.alerts} totalConsumption={fuelReport.totalConsumption} />
        </Layout.Section> */}
        {/* <Layout.Section style={{ padding: '32px' }}>
          <FuelChart
            vehicle={this.props.theVehicleId}
            fuelSeries={fuelReport.series}
            fuelCapacity={theVehicle.original.fuelCapacity}
            vehicleAlerts={fuelReport.alerts}
          />
        </Layout.Section> */}
        {/* <NoPrint>
          <Layout.Section style={{ padding: '32px' }}>
            <FuelMap selectedVehicleId={this.props.theVehicleId} />
          </Layout.Section>
        </NoPrint> */}

      </div>
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
