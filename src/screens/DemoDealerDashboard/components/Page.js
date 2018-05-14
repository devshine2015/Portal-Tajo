import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import classnames from 'classnames';
import { Donut, StackedBar, Sparkline } from 'britecharts-react';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import VehiclesList from './VehiclesList';
import styles from './styles.css';

const with4Slices = () => [
{
    quantity: 61,
    percentage: 61,
    name: 'Fuel loss',
    id: 1,
},
{
    quantity: 24,
    percentage: 24,
    name: 'Idle fuel',
    id: 2,
},
{
    quantity: 16,
    percentage: 16,
    name: 'Fuel Gain',
    id: 3,
},
];
const sparkline = () => [
{
    value: 1,
    date: '2011-01-06T00:00:00Z'
},
{
    value: 2,
    date: '2011-01-07T00:00:00Z'
},
{
    value: 0,
    date: '2011-01-08T00:00:00Z'
},
{
        value: 0,
        date: '2011-01-09T00:00:00Z'
    }

]
const with2Entries = () => [
{
    "name": "Mon",
    "stack": "Refuel",
    "value": 10
},
{
    "name": "Mon",
    "stack": "Loss",
    "value": 13
},
{
    "name": "Tue",
    "stack": "Refuel",
    "value": 9
},
{
    "name": "Tue",
    "stack": "Loss",
    "value": 2
},
{
    "name": "Wed",
    "stack": "Refuel",
    "value": 17
},
{
    "name": "Wed",
    "stack": "Loss",
    "value": 10
},
{
    "name": "Thu",
    "stack": "Refuel",
    "value": 17
},
{
    "name": "Thu",
    "stack": "Loss",
    "value": 20
},
{
    "name": "Fri",
    "stack": "Refuel",
    "value": 25
},
{
    "name": "Fri",
    "stack": "Loss",
    "value": 8
},
{
    "name": "Sat",
    "stack": "Refuel",
    "value": 10
},
{
    "name": "Sat",
    "stack": "Loss",
    "value": 4
},
{
    "name": "Sun",
    "stack": "Refuel",
    "value": 17
},
{
    "name": "Sun",
    "stack": "Loss",
    "value": 12
},


];
const britecharts = [
    '#ec5b98', //pink
    '#4a90e2', //blue
    '#50e3c2', //green
    '#ffce00', //yellow
    '#ffa71a', //orange
    '#998ce3' //purple
];
const britecharts2 = [
      '#50e3c2', //green
      '#ec5b98', //pink

  ];

class DealerDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // height: 400,
    };
  }

  render() {
    const graphRatio = window.innerWidth > 1920 ? 1 : 0.55;

    return (
      <div className={styles.wrapper}>
        {/* vehicleSidebar */}
        <VehiclesList
          vehicles={this.props.vehicles}
          visible={this.props.isVehiclesPanelOpen}
        />

        <div className={styles.overviewWrapper}>
          {/* title row */}
          <div className={styles.infoSectionsWrapper}>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Reporting Vehicles</h3>
              <div className={styles.infoSectionValue}>3 / 4</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Total Distance</h3>
              <div className={styles.infoSectionValue}>16,148 km</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Avg. Speed</h3>
              <div className={styles.infoSectionValue}>25 km/h</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Total Running Time</h3>
              <div className={styles.infoSectionValue}>481 h</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Total Idle Time</h3>
              <div className={styles.infoSectionValue}>49 h</div>
            </div>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Total Idle Fuel</h3>
              <div className={styles.infoSectionValue}>1,129 l</div>
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
                      data={with4Slices()}
                      height={390 * graphRatio}
                      width={390 * graphRatio}
                      externalRadius={190 * graphRatio}
                      internalRadius={100 * graphRatio}
                      colorSchema={britecharts}
                      isAnimated={false}
                      radiusHoverOffset={10 * graphRatio}
                    />
                  </div>
                </div>
                <div className={styles.visualSectionRight}>
                  <div className={styles.extraValues}>
                    <div className={styles.extraValue}>
                      <span className={styles.extraValueNumber}>9,401</span>
                      <span className={styles.extraValueLabel}>Total liters</span>
                    </div>
                    <div className={styles.extraValue}>
                      <span className={styles.extraValueNumber}>3.0</span>
                      <span className={styles.extraValueLabel}>km per liter</span>
                    </div>
                  </div>
                  <div className={styles.valuesSection}>
                    <div className={styles.valuesRow}>
                      <span className={classnames(styles.title, styles.pinkLabel)}>Fuel loss</span>
                      <span className={styles.value}>61%</span>
                    </div>
                    <div className={styles.valuesRow}>
                      <span className={classnames(styles.title, styles.blueLabel)}>idle fuel</span>
                      <span className={styles.value}>24%</span>
                    </div>
                    <div className={styles.valuesRow}>
                      <span className={classnames(styles.title, styles.greenLabel)}>Fuel Gain</span>
                      <span className={styles.value}>16%</span>
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
                      data={with4Slices()}
                      height={390 * graphRatio}
                      width={390 * graphRatio}
                      externalRadius={190 * graphRatio}
                      internalRadius={100 * graphRatio}
                      isAnimated={false}
                      colorSchema={britecharts}
                      radiusHoverOffset={10 * graphRatio}
                    />
                  </div>
                </div>
                <div className={styles.visualSectionRight}>
                  <div className={styles.extraValues} />
                  <div className={classnames(styles.valuesSection, styles.valuesSectionThin)}>
                    <div className={styles.valuesRow}>
                      <span className={classnames(styles.title, styles.pinkLabel)}>Idle time</span>
                      <span className={styles.value}>10%</span>
                    </div>
                    <div className={styles.valuesRow}>
                      <span className={classnames(styles.title, styles.greenLabel)}>Driving time</span>
                      <span className={styles.value}>90%</span>
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
                          <span>14</span>
                          <span className={styles.regular}>+15%</span>
                        </div>
                        <div className={styles.barStatisticLabel}>daily</div>
                      </div>
                      {/*  */}
                      <div className={styles.barStatisticItem}>
                        <div className={styles.barStatisticValues}>
                          <span>70</span>
                          <span className={styles.regular}>-22%</span>
                        </div>
                        <div className={styles.barStatisticLabel}>weekly</div>
                      </div>
                      {/*  */}
                      <div className={styles.barStatisticItem}>
                        <div className={styles.barStatisticValues}>
                          <span>102</span>
                          <span className={styles.regular}>+17%</span>
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
                      data={with2Entries()}
                      grid={'vertical'}
                      isAnimated={false}
                      betweenBarsPadding={0.3}
                      colorSchema={britecharts2}
                      height={400 * graphRatio}
                      width={780 * graphRatio}
                    />
                  </div>
                </div>

              </div>

              {/* 4 */}
              <div className={styles.visualSection}>
                <h3 className={styles.visualSectionTitle}>Next Service</h3>
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
});
export default connect(mapStateToProps)(pure(DealerDashboard));
