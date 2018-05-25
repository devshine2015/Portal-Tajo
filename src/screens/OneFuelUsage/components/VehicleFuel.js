import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import classnames from 'classnames';
import { Donut } from 'britecharts-react';
import Layout from 'components/Layout';
import DashboardElements from 'components/DashboardElements';
import MainActionButton from 'components/Controls/MainActionButton';
import NoPrint from 'components/NoPrint/NoPrint';
import { numberToFixedString } from 'utils/convertors';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';

import { getFuelReportForVehicle, getFuelReportTimeRange } from './../services/reducer';
import { doSaveSpreadSheetSeries, doSaveSpreadSheetOverview } from './../utils/fuelReportGenerators';
import { summarizeFuelAlerts } from './../utils/alertsSummaryHelper';
import FuelChart from './FuelChart';
import FuelAlertsSummary from './FuelAlertsSummary';
import FuelAlerts from './FuelAlerts';
import FuelMap from './FuelMap';
import styles from './styles.css';

const makePercentage = (num1 = 0, num2 = 0, num3 = 0) => {
  const sum = num1 + num2 + num3;
  if (sum === 0) return [0, 0, 0];

  const p1 = Math.round((num1 * 100) / sum);
  const p2 = Math.round((num2 * 100) / sum);
  const p3 = 100 - p1 - p2;
  return [p1, p2, p3];
};

const colores1 = ['#ec5b98', '#4a90e2', '#50e3c2'];

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
    const graphRatio = window.innerWidth > 1920 ? 1 : 0.55;

    const alertsSummary = summarizeFuelAlerts(fuelReport.alerts, fuelReport.totalConsumption);
    const fuelConsPercentage = makePercentage(fuelReport.totalConsumption, alertsSummary.lossAmount, alertsSummary.gainAmount);

    const fuelConsData = [{
      quantity: fuelConsPercentage[0],
      percentage: fuelConsPercentage[0],
      name: 'Consumption',
      id: 1,
    }, {
      quantity: fuelConsPercentage[1],
      percentage: fuelConsPercentage[1],
      name: 'Est. Loss',
      id: 2,
    }, {
      quantity: fuelConsPercentage[2],
      percentage: fuelConsPercentage[2],
      name: 'Est. Refuel',
      id: 3,
    }];

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
            <h3 className={styles.infoSectionTitle}>km per liter</h3>
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

        <div className={styles.visualSectionsWrapper}>
          <div className={styles.visualSectionsRow}>
            <div className={styles.visualSection}>
              <div className={styles.visualSectionLeft}>
                <h3 className={styles.visualSectionTitle}>Fuel Consumption</h3>
                <div className={styles.donutWrapper}>
                  <Donut
                    data={fuelConsData}
                    height={390 * graphRatio}
                    width={390 * graphRatio}
                    externalRadius={190 * graphRatio}
                    internalRadius={100 * graphRatio}
                    colorSchema={colores1}
                    isAnimated={false}
                    radiusHoverOffset={10 * graphRatio}
                  />
                </div>
              </div>
              <div className={styles.visualSectionRight}>
                <div className={styles.extraValues}>
                  <div className={styles.extraValue}>
                    <span className={styles.extraValueNumber}>{numberToFixedString(alertsSummary.lossAmount)}</span>
                    <span className={styles.extraValueLabel}>Est. Loss (ltr)</span>
                  </div>
                  <div className={styles.extraValue}>
                    <span className={styles.extraValueNumber}>{numberToFixedString(alertsSummary.gainAmount)}</span>
                    <span className={styles.extraValueLabel}>Est. Refuel (ltr)</span>
                  </div>
                </div>
                <div className={styles.valuesSection}>
                  <div className={styles.valuesRow}>
                    <span className={classnames(styles.title, styles.pinkLabel)}>Consumption</span>
                    <span className={styles.value}>{fuelConsPercentage[0]}%</span>
                  </div>
                  <div className={styles.valuesRow}>
                    <span className={classnames(styles.title, styles.blueLabel)}>Est. Loss</span>
                    <span className={styles.value}>{fuelConsPercentage[1]}%</span>
                  </div>
                  <div className={styles.valuesRow}>
                    <span className={classnames(styles.title, styles.greenLabel)}>Est. Refuel</span>
                    <span className={styles.value}>{fuelConsPercentage[2]}%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 2 */}

            <div className={classnames(styles.visualSection, styles.visualSectionColumn)}>
              <h3 className={styles.visualSectionTitle}>Fuel History</h3>
              <div className={styles.visualSectionSingleContent}>
                <FuelChart
                  vehicle={this.props.theVehicleId}
                  fuelSeries={fuelReport.series}
                  fuelCapacity={theVehicle.original.fuelCapacity}
                  vehicleAlerts={fuelReport.alerts}
                />
              </div>
            </div>
            {/* 2 end */}

          </div>

          <div className={styles.visualSectionsRow}>

            {/* 3 */}
            <div className={classnames(styles.visualSection, styles.visualSectionWithoutPadding)}>
              <FuelMap selectedVehicleId={this.props.theVehicleId} />
            </div>
            

            {/* 4 */}
            <div className={classnames(styles.visualSection, styles.visualSectionColumn)}>
              <h3 className={styles.visualSectionTitle}>Fuel Alerts</h3>
              <FuelAlerts vehicleAlerts={fuelReport.alerts} totalConsumption={fuelReport.totalConsumption} height="200px" />
            </div>
          </div>
        </div>

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
