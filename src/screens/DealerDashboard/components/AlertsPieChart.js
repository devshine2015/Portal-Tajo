import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import moment from 'moment';
import { bb } from 'billboard.js';
import { css } from 'aphrodite/no-important';
import { getLogEntries } from 'services/AlertsSystem/reducers/logReducer';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { theme } from 'configs';
import dashboardClasses from 'components/DashboardElements/classes';

const alertMap = {
  // [alertKinds._ALERT_KIND_ENGINE_TEMP]: 'Engine Temperature Alerts',
  [alertKinds._ALERT_KIND_FUEL_LOSS]: 'Fuel Loss Alerts',
  [alertKinds._ALERT_KIND_FUEL_GAIN]: 'Fuel Gain Alerts',
};

const buildChart = (node, chartColumns) => {
  if (!node) { return null; }

  const chart = bb.generate({
    data: {
      columns: chartColumns,
      type: 'pie',
      onclick: (d, i) => { console.log('onclick', d, i); },
      colors: {
        // [alertMap[alertKinds._ALERT_KIND_ENGINE_TEMP]]: theme.palette.alertColor,
        [alertMap[alertKinds._ALERT_KIND_FUEL_LOSS]]: theme.palette.dachboardElementSecondaryColor,
        [alertMap[alertKinds._ALERT_KIND_FUEL_GAIN]]: theme.palette.okColor,
      },
    },
    bindto: node,
    size: {
      width: 260,
      height: 260,
    },
    pie: {
      label: {
        format(value) {
          return value.toString();
        },
      },
    },
    tooltip: {
      show: false,
    },
  });
  return chart;
};


class AlertsChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChart: false,
    };
    this.chartRef = null;
    this.chart = null;
  }

  componentWillMount() {
    const alerts = this.props.alerts.filter((alert) => {
      return moment(alert.date).isBetween(
        this.props.timeRange.fromDate,
        this.props.timeRange.toDate);
    });
    this.setState({
      showChart: alerts.length !== 0,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.prepareData(nextProps.alerts);
    const alerts = this.props.alerts.filter((alert) => {
      return moment(alert.date).isBetween(
        this.props.timeRange.fromDate,
        this.props.timeRange.toDate);
    });
    this.setState({
      showChart: alerts.length !== 0,
    });
  }

  prepareData() {
    if (this.chartRef == null) {
      return;
    }
    const theAlerts = this.props.alerts;

    const kindsCounter = {
      [alertKinds._ALERT_KIND_FUEL_GAIN]: 0,
      [alertKinds._ALERT_KIND_FUEL_LOSS]: 0,
      // [alertKinds._ALERT_KIND_ENGINE_TEMP]: 0,
    };

    theAlerts
      .filter((alrt) => {
        return moment(alrt.date).isBetween(
          this.props.timeRange.fromDate,
          this.props.timeRange.toDate);
      }).forEach((alrt) => {
        switch (alrt.alertType) {
          case 'REFUEL':
            kindsCounter[alertKinds._ALERT_KIND_FUEL_GAIN] += 1;
            break;
          case 'LOSS':
            kindsCounter[alertKinds._ALERT_KIND_FUEL_LOSS] += 1;
            break;
          default:
            break;
        }
      });

    const chartColumns = [
      [[alertMap[alertKinds._ALERT_KIND_FUEL_GAIN]],
        kindsCounter[alertKinds._ALERT_KIND_FUEL_GAIN]],
      [[alertMap[alertKinds._ALERT_KIND_FUEL_LOSS]],
        kindsCounter[alertKinds._ALERT_KIND_FUEL_LOSS]],
      // [[alertMap[alertKinds._ALERT_KIND_ENGINE_TEMP]],
      //   kindsCounter[alertKinds._ALERT_KIND_ENGINE_TEMP]],
    ];

    this.chart = buildChart(this.chartRef, chartColumns);
  }

  render() {
    this.prepareData();
    return (
      <div
        className="AlertPiechart"
        style={{ width: '320px', margin: '24px' }}
      >
        <div className={css(dashboardClasses.dataItemTitleDark)}>
          {'Fleet Alerts'}
        </div>
        {
          this.state.showChart ?
            <div
              ref={(ref) => { this.chartRef = ref; if (this.chartRef) this.prepareData(); }}
            />
            :
            <div style={{ fontWeight: 'bold', color: '#00619E' }}>
              <div style={{ padding: '14px 0 10px' }}>Fuel Gain Alerts: 0</div>
              <div style={{ padding: '10px 0' }}>Fuel Loss Alerts: 0</div>
            </div>
        }
      </div>
    );
  }
}

AlertsChart.propTypes = {
  alerts: PropTypes.array.isRequired,
  timeRange: PropTypes.object.isRequired,
};

const mapState = state => ({
  alerts: getLogEntries(state).toJS(),
});

export default connect(mapState, null)(pure(AlertsChart));
