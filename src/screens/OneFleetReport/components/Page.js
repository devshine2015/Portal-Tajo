import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import classnames from 'classnames';
import { Donut, Bar } from 'britecharts-react';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import * as fromFleetReportReducer from 'services/FleetReport/reducer';
// import * as fromOnePortalReducer from 'containers/InnerPortal/components/OnePortal/reducer';
import {
  fetchFleetVehicleStats,
  fetchFleetFuelStats,
  setFleetOverviewData,
  setVehiclesOverviewData,
  clearOverview,
  changeTimeRange,
} from 'services/FleetReport/actions';
import { numberToFixedString } from 'utils/convertors';
import { makePeriodForTwoDays } from 'utils/dateTimeUtils';
import AnimatedLogo from 'components/animated';
import VehiclesList from './VehiclesList';
import PageHeader from './PageHeader';
import styles from './styles.css';


const colores1 = [
  '#ec5b98', //pink
  '#4a90e2', //blue
  '#50e3c2', //green
];
const colores2 = [
  '#50e3c2', //green
  '#ec5b98', //pink
];

const makePercentage = (num1 = 0, num2 = 0, num3 = 0) => {
  const sum = num1 + num2 + num3;
  if (sum === 0) return [0, 0, 0];

  const p1 = Math.round((num1 * 100) / sum);
  const p2 = Math.round((num2 * 100) / sum);
  const p3 = 100 - p1 - p2;
  return [p1, p2, p3];
};

class DealerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'general',
      nextServiceOdo: null,
      // pageIsLoading: true,
      // fuelOverviewIsLoading: true,
      pageIsLoading: true,
      fuelOverviewIsLoading: true,
    };
  }

  componentDidMount() {
    const dayTimeRange = makePeriodForTwoDays();
    this.props.fetchFleetVehicleStats(dayTimeRange)
      .then(() => this.setState({ pageIsLoading: false }));
    this.props.fetchFleetFuelStats(dayTimeRange)
      .then(() => this.setState({ fuelOverviewIsLoading: false }));
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    this.setState({
      view: nextProps.selectedVehicle == null ? 'general' : 'vehicle'
    });
    // when deselect the vehicle
    if ((this.props.selectedVehicle != null) && (nextProps.selectedVehicle == null)) {
      console.log('deselected');
      const dayTimeRange = makePeriodForTwoDays();
      this.props.fetchFleetVehicleStats(dayTimeRange)
        .then(() => this.setState({ pageIsLoading: false }));
      this.props.fetchFleetFuelStats(dayTimeRange)
        .then(() => this.setState({ fuelOverviewIsLoading: false }));
    }

    if ((nextProps.selectedVehicle !== this.props.selectedVehicle) &&
      (nextProps.selectedVehicle != null)) {
      //
      const vehicle = nextProps.vehicles.find(veh => veh.id === nextProps.selectedVehicle);
      let vehicleNextOdo = Math.round(10000 - ((vehicle.original.odometer.value / 1000) - vehicle.lastServiceOdo));
      this.setState({
        nextServiceOdo: vehicleNextOdo < 0 ? 'Next service is overdued' : `Next service in ${vehicleNextOdo} km`
      });

      const vehicleBreakdown = nextProps.vehiclesOverviews.find(
        overview => overview.vehicleId === nextProps.selectedVehicle
      );

      if ((vehicleBreakdown === undefined) || (Object.keys(vehicleBreakdown).length <= 1)) {
        this.props.clearOverview();
      } else {
        this.props.setFleetOverviewData(vehicleBreakdown);
      }
    } else {
        // this.props.setFleetOverviewData(nextProps.overviewReport);
    }
  }

  applyTimeRange = (timeRange) => {
    this.setState({
      pageIsLoading: true,
      fuelOverviewIsLoading: true,
    });
    this.props.fetchFleetVehicleStats(timeRange)
      .then(() => this.setState({ pageIsLoading: false }),
      );
    this.props.fetchFleetFuelStats(timeRange)
      .then(() => this.setState({ fuelOverviewIsLoading: false }),
      );
    this.props.changeTimeRange(timeRange);
  }
  renderPreloading() {
    return (
      <div className={styles.preloading}>
        <AnimatedLogo.FullscreenLogo />
      </div>
    )
  }

  renderOverview() {
    return (
      <div className={styles.infoSectionsWrapper}>
        <div className={styles.infoSection}>
          <h3 className={styles.infoSectionTitle}>{this.state.view === 'general' ? 'Reporting Vehicles' : 'Selected Vehicle'}</h3>
          <div className={styles.infoSectionValue}>{this.props.fleetOverview.reportingVehicleCount} / {this.props.fleetOverview.vehicleCount}</div>
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.infoSectionTitle}>Total Distance</h3>
          <div className={styles.infoSectionValue}>{numberToFixedString(this.props.fleetOverview.totalDistance)} km</div>
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.infoSectionTitle}>Avg. Speed</h3>
          <div className={styles.infoSectionValue}>{numberToFixedString(this.props.fleetOverview.avgSpeed)} km/h</div>
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.infoSectionTitle}>Total Running Time</h3>
          <div className={styles.infoSectionValue}>{(this.props.fleetOverview.totalRunningTime).toFixed(0)} h</div>
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.infoSectionTitle}>Total Idle Time</h3>
          <div className={styles.infoSectionValue}>{(this.props.fleetOverview.totalIdleTime).toFixed(0)} h</div>
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.infoSectionTitle}>Total Idle Fuel</h3>
          <div className={styles.infoSectionValue}>{numberToFixedString(this.props.fleetOverview.totalIdleFuelUsed)} l</div>
        </div>
      </div>
    )
  }
  renderDetails() {
    const graphRatio = window.innerWidth > 1920 ? 1 : 0.55;
    const { totalDistance, totalDrivingTime, totalIdleFuelUsed, totalIdleTime } = this.props.fleetOverview;
    const { totalConsumption, totalLoss, alerts } = this.props.fleetFuelUsage;

    const fuelConsumption = totalConsumption === 0 ? 0 : totalDistance / totalConsumption;
    const fuelConsPercentage = makePercentage(totalLoss, totalIdleFuelUsed, totalConsumption);

    const runningPercentage = makePercentage(totalIdleTime, totalDrivingTime);

    const fuelConsData = [{
      quantity: fuelConsPercentage[0],
      percentage: fuelConsPercentage[0],
      name: 'Fuel loss',
      id: 1,
    }, {
      quantity: fuelConsPercentage[1],
      percentage: fuelConsPercentage[1],
      name: 'Idle fuel',
      id: 2,
    }, {
      quantity: fuelConsPercentage[2],
      percentage: fuelConsPercentage[2],
      name: 'Driving',
      id: 3,
    }];
    const runTimeData = [{
      quantity: runningPercentage[0],
      percentage: runningPercentage[0],
      name: 'Idle',
      id: 1,
    }, {
      quantity: runningPercentage[1],
      percentage: runningPercentage[1],
      name: 'Driving',
      id: 2,
    }];
    const alertsData = [
      {
        name: 'Refuel',
        value: 1,
      }, {
        name: 'Loss',
        value: 2,
      }
    ];

    return (
      <div className={styles.visualSectionsWrapper}>

        { !this.state.pageIsLoading && this.state.fuelOverviewIsLoading ? this.renderPreloading() : null }

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
                  <span className={styles.extraValueNumber}>{numberToFixedString(this.props.fleetFuelUsage.totalConsumption)}</span>
                  <span className={styles.extraValueLabel}>Total liters</span>
                </div>
                <div className={styles.extraValue}>
                  <span className={styles.extraValueNumber}>{numberToFixedString(fuelConsumption)}</span>
                  <span className={styles.extraValueLabel}>km per liter</span>
                </div>
              </div>
              <div className={styles.valuesSection}>
                <div className={styles.valuesRow}>
                  <span className={classnames(styles.title, styles.pinkLabel)}>Fuel loss</span>
                  <span className={styles.value}>{fuelConsPercentage[0]}%</span>
                </div>
                <div className={styles.valuesRow}>
                  <span className={classnames(styles.title, styles.blueLabel)}>Idle fuel</span>
                  <span className={styles.value}>{fuelConsPercentage[1]}%</span>
                </div>
                <div className={styles.valuesRow}>
                  <span className={classnames(styles.title, styles.greenLabel)}>Driving</span>
                  <span className={styles.value}>{fuelConsPercentage[2]}%</span>
                </div>
              </div>
            </div>

          </div>

          {/* 2 */}
          <div className={styles.visualSection}>
            <div className={styles.visualSectionLeft}>
              <h3 className={styles.visualSectionTitle}>Running Time</h3>
              <div className={styles.donutWrapper}>
                <Donut
                  data={runTimeData}
                  height={390 * graphRatio}
                  width={390 * graphRatio}
                  externalRadius={190 * graphRatio}
                  internalRadius={100 * graphRatio}
                  isAnimated={false}
                  colorSchema={colores2}
                  radiusHoverOffset={10 * graphRatio}
                />
              </div>
            </div>
            <div className={styles.visualSectionRight}>
              <div className={styles.extraValues} />
              <div className={classnames(styles.valuesSection, styles.valuesSectionThin)}>
                <div className={styles.valuesRow}>
                  <span className={classnames(styles.title, styles.pinkLabel)}>Idle time</span>
                  <span className={styles.value}>{runningPercentage[0]}%</span>
                </div>
                <div className={styles.valuesRow}>
                  <span className={classnames(styles.title, styles.greenLabel)}>Driving time</span>
                  <span className={styles.value}>{runningPercentage[1]}%</span>
                </div>
              </div>
            </div>
          </div>
          {/* 2 end */}

        </div>

        <div className={styles.visualSectionsRow}>

          {/* 3 */}
          {
            alerts.length !== 0 ?
              (
                <div className={classnames(styles.visualSection, styles.visualSectionAlerts)}>
                  <div className={styles.visualSectionLeft}>
                    <h3 className={styles.visualSectionTitle}>Fuel Alerts</h3>
                    <div className={styles.barDetailsWrapper}>
                      <div className={styles.barLabels}>
                        <span className={classnames(styles.barLabel, styles.greenLabel)}>Fuel refuel</span>
                        <span className={classnames(styles.barLabel, styles.pinkLabel)}>Fuel loss</span>
                      </div>

                    </div>
                  </div>
                  <div className={styles.visualSectionRight}>
                    <div className={styles.barWrapper}>
                      <Bar
                        data={alertsData}
                        isAnimated={false}
                        betweenBarsPadding={0.1 * graphRatio}
                        colorSchema={colores2}
                        height={300 * graphRatio}
                        width={580 * graphRatio}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={classnames(styles.visualSection, styles.visualSectionService)}>
                  <h3 className={styles.visualSectionTitle}>Fuel Alerts</h3>
                  <div className={styles.emptyMessage}>
                    No Alerts
                  </div>
                </div>
              )
          }

          {/* 4 */}
          <div className={classnames(styles.visualSection, styles.visualSectionService)}>
            <h3 className={styles.visualSectionTitle}>Next Service</h3>
            <div className={styles.emptyMessage}>
              {this.state.view === 'general' ?
                'Select the vehicle to see this distance' :
                this.state.nextServiceOdo}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>

        { this.state.pageIsLoading ? this.renderPreloading() : null }

        {/* vehicleSidebar */}
        <VehiclesList
          vehicles={this.props.vehicles}
          selectedVehicle={this.props.selectedVehicle}
          visible={this.props.isVehiclesPanelOpen}
        />

        <div className={styles.overviewWrapper}>
          <PageHeader
            onApply={tr => this.applyTimeRange(tr)}
          />

          { this.renderOverview() }

          { this.renderDetails() }

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fleetOverview: fromFleetReportReducer.getFleetOverview(state),
  vehiclesOverviews: fromFleetReportReducer.getVehiclesOverviews(state),
  fleetFuelUsage: fromFleetReportReducer.getFleetFuelOverview(state),
  overviewRange: fromFleetReportReducer.getOverviewRange(state),
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  isVehiclesPanelOpen: state.toJS().inner.onePortal.isVehiclesPanelOpen,
  selectedVehicle: state.toJS().inner.onePortal.selectedOverviewVehicle,
});

const mapDispatchToProps = {
  fetchFleetVehicleStats,
  fetchFleetFuelStats,
  setFleetOverviewData,
  setVehiclesOverviewData,
  clearOverview,
  changeTimeRange,
};

export default connect(mapStateToProps, mapDispatchToProps)(pure(DealerDashboard));
