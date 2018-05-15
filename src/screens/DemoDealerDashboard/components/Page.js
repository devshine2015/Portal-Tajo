import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import classnames from 'classnames';
import { Donut, StackedBar, Sparkline } from 'britecharts-react';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import VehiclesList from './VehiclesList';
import { general, vehicle1, vehicle2, vehicle3 } from './demoOverview';
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

class DealerDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'general',
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.selectedVehicle);
    this.setState({
      view: nextProps.selectedVehicle == null ? 'general' : nextProps.selectedVehicle
    });

  }
  selectDemo(name) {
    switch(name) {
      case '31cb5062-f316-49b6-b2bd-2317da383299':
        console.log('1');
        return vehicle1;
        break;
      case '5a2b6ecc-43d1-4ed7-97a6-0e86bf3eaf95':
        console.log('2');
        return vehicle2;
        break;
      case 'c5081aec-9982-4423-9eea-894b4a9ac9e7':
        console.log('3');
        return vehicle3;
        break;
      default:
        console.log('general');
        return general;
        break;
    }
  }

  render() {
    const graphRatio = window.innerWidth > 1920 ? 1 : 0.55;
    const demoData = this.selectDemo(this.state.view);

    return (
      <div className={styles.wrapper}>
        {/* vehicleSidebar */}
        <VehiclesList
          vehicles={this.props.vehicles}
          selectedVehicle={this.props.selectedVehicle}
          visible={this.props.isVehiclesPanelOpen}
        />

        <div className={styles.overviewWrapper}>
          {/* title row */}
          <div className={styles.infoSectionsWrapper}>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>{this.state.view === 'general' ? 'Reporting Vehicles' : 'Selected Vehicle'}</h3>
              <div className={styles.infoSectionValue}>{demoData.overview.value}</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Total Distance</h3>
              <div className={styles.infoSectionValue}>{demoData.overview.totalDistance} km</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Avg. Speed</h3>
              <div className={styles.infoSectionValue}>{demoData.overview.avgSpeed} km/h</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Total Running Time</h3>
              <div className={styles.infoSectionValue}>{demoData.overview.totalRunning} h</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Total Idle Time</h3>
              <div className={styles.infoSectionValue}>{demoData.overview.totalIdle} h</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Total Idle Fuel</h3>
              <div className={styles.infoSectionValue}>{demoData.overview.idleFuel} l</div>
            </div>

          </div>
          {/* details */}
          <div className={styles.visualSectionsWrapper}>
            <div className={styles.visualSectionsRow}>
              <div className={styles.visualSection}>
                <div className={styles.visualSectionLeft}>
                  <h3 className={styles.visualSectionTitle}>Fuel Consumption</h3>
                  <div className={styles.donutWrapper}>
                    <Donut
                      data={demoData.fuelConsumption.chartData}
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
                      <span className={styles.extraValueNumber}>{demoData.fuelConsumption.total}</span>
                      <span className={styles.extraValueLabel}>Total liters</span>
                    </div>
                    <div className={styles.extraValue}>
                      <span className={styles.extraValueNumber}>{demoData.fuelConsumption.consumption  }</span>
                      <span className={styles.extraValueLabel}>km per liter</span>
                    </div>
                  </div>
                  <div className={styles.valuesSection}>
                    <div className={styles.valuesRow}>
                      <span className={classnames(styles.title, styles.pinkLabel)}>Fuel loss</span>
                      <span className={styles.value}>{demoData.fuelConsumption.fuelLoss}%</span>
                    </div>
                    <div className={styles.valuesRow}>
                      <span className={classnames(styles.title, styles.blueLabel)}>idle fuel</span>
                      <span className={styles.value}>{demoData.fuelConsumption.idleFuel}%</span>
                    </div>
                    <div className={styles.valuesRow}>
                      <span className={classnames(styles.title, styles.greenLabel)}>Fuel Gain</span>
                      <span className={styles.value}>{demoData.fuelConsumption.fuelGain}%</span>
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
                      data={demoData.runningTime.chartData}
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
                      <span className={styles.value}>{demoData.runningTime.idleTime}%</span>
                    </div>
                    <div className={styles.valuesRow}>
                      <span className={classnames(styles.title, styles.greenLabel)}>Driving time</span>
                      <span className={styles.value}>{demoData.runningTime.drivingTime}%</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 2 end */}

            </div>

            <div className={styles.visualSectionsRow}>
              {/* 3 */}
              <div className={classnames(styles.visualSection, styles.visualSectionAlerts)}>
                <div className={styles.visualSectionLeft}>
                  <h3 className={styles.visualSectionTitle}>Fuel Alerts</h3>
                  <div className={styles.barDetailsWrapper}>
                    <div className={styles.barStatistic}>
                      {/*  */}
                      <div className={styles.barStatisticItem}>
                        <div className={styles.barStatisticValues}>
                          <span>{demoData.fuelAlerts.daily[0]}</span>
                          <span className={styles.regular}>{demoData.fuelAlerts.daily[1]}</span>
                        </div>
                        <div className={styles.barStatisticLabel}>daily</div>
                      </div>
                      {/*  */}
                      <div className={styles.barStatisticItem}>
                        <div className={styles.barStatisticValues}>
                          <span>{demoData.fuelAlerts.weekly[0]}</span>
                          <span className={styles.regular}>{demoData.fuelAlerts.weekly[1]}</span>
                        </div>
                        <div className={styles.barStatisticLabel}>weekly</div>
                      </div>
                      {/*  */}
                      <div className={styles.barStatisticItem}>
                        <div className={styles.barStatisticValues}>
                          <span>{demoData.fuelAlerts.monthly[0]}</span>
                          <span className={styles.regular}>{demoData.fuelAlerts.monthly[1]}</span>
                        </div>
                        <div className={styles.barStatisticLabel}>monthly</div>
                      </div>
                    </div>
                    <div className={styles.barLabels}>
                      <span className={classnames(styles.barLabel, styles.greenLabel)}>Fuel refuel</span>
                      <span className={classnames(styles.barLabel, styles.pinkLabel)}>Fuel loss</span>
                    </div>

                  </div>
                </div>
                <div className={styles.visualSectionRight}>
                  <div className={styles.barWrapper}>
                    <StackedBar
                      data={demoData.fuelAlerts.chartData}
                      isAnimated={false}
                      betweenBarsPadding={0.3 * graphRatio}
                      colorSchema={colores2}
                      height={400 * graphRatio}
                      width={780 * graphRatio}
                    />
                  </div>
                </div>

              </div>

              {/* 4 */}
              <div className={classnames(styles.visualSection, styles.visualSectionService)}>
                <h3 className={styles.visualSectionTitle}>Next Service</h3>
                <div className={styles.emptyMessage}>{this.state.view === 'general' ? 'Select the vehicle to see this distance' : `Next service in ${demoData.nextService} km`}</div>
                {/* <Sparkline
                  data={sparkline()}
                  lineCurve={'basis'}
                  // isAnimated={true}
                  height={100}
                  width={380}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  isVehiclesPanelOpen: state.toJS().inner.demo.isVehiclesPanelOpen,
  selectedVehicle: state.toJS().inner.demo.selectedOverviewVehicle,
});
export default connect(mapStateToProps)(pure(DealerDashboard));
