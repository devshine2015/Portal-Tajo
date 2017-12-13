import React, { Component } from 'react';
// import R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import { bb } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import { css } from 'aphrodite/no-important';
import {
  getLogEntries,
} from 'services/AlertsSystem/reducers/logReducer';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { theme } from 'configs';

import dashboardClasses from 'components/DashboardElements/classes';


const alertMap = {
  [alertKinds._ALERT_KIND_ENGINE_TEMP]: 'Engine Temperature Alerts',
  [alertKinds._ALERT_KIND_FUEL_LOSS]: 'Fuel Loss Alerts',
  [alertKinds._ALERT_KIND_FUEL_GAIN]: 'Fuel Gain Alerts',
};

const buildChart = (node, chartColumns) => {
  if (!node)
    {return null;}
  const {
    // width,
    height,
  } = node.getBoundingClientRect();

  const chart = bb.generate({
    data: {
      columns: chartColumns,
      type: 'pie',
      // onclick: function (d, i) { console.log('onclick', d, i); },
      // onover: function (d, i) { console.log('onover', d, i); },
      // onout: function (d, i) { console.log('onout', d, i); },
      colors: {
        [alertMap[alertKinds._ALERT_KIND_ENGINE_TEMP]]: theme.palette.alertColor,
        [alertMap[alertKinds._ALERT_KIND_FUEL_LOSS]]: theme.palette.dachboardElementSecondaryColor,
        [alertMap[alertKinds._ALERT_KIND_FUEL_GAIN]]: theme.palette.okColor,
      },
    },
    bindto: node,
    size: {
      width: height,
      height,
    },
    // size: {
    //   width: width - (HORIZONTAL * 2),
    //   height,
    // },
    pie: {
      label: {
        // show: false,
        format(value) {
          return value.toString();
        },
        // threshold: 0.1,
      // expand: false,
      // padAngle: 0.1
      },
    },
    tooltip: {
      show: false,
      // contents(value, ratio, id) {
      //   return '<div  style="background-color:#ffeeFF;padding: 3px;">"C&C ( 034362 )"</div>';
      //   // let format = id === 'data1' ? d3.format(',') : d3.format('$');
      //   // return format(value);
      // },
      // format: {
      //   title(d) { return `ALERTS ${  d}`; },
      //   value(value, ratio, id) {
      //     return 'asdf\n qwert\n zxcv';
      //     // let format = id === 'data1' ? d3.format(',') : d3.format('$');
      //     // return format(value);
      //   },
      // value: function (value, ratio, id) {
      //   var format = id === 'data1' ? d3.format(',') : d3.format('$');

      //   return format(value);
      // }
      // },
    },
  });
  return chart;
};


class AlertsChart extends Component {
  constructor(props) {
    super(props);

    this.chartRef = null;
    this.chart = null;

    this.state = {
    };
  }

  componentDidMount() {
    // this.chartInit();
  }

  // componentWillReceiveProps(nextProps) {
  //   // it's better to validate by ts
  //   // if (nextProps.lastUpdate !== this.props.lastUpdate) {
  //   //   this.chart.load(formatJobs(nextProps.jobs, this.props.vehicles));
  //   // }
  // }

  // chartInit() {
  //   this.chart = buildChart(this.chartRef, []);
  // }
  // componentWillReceiveProps(nextProps) {
  //   this.prepareData(nextProps.alerts.toJS());
  // }

  prepareData() {
    if (this.chartRef == null) {
      return;
    }
    const kindsCounter = {
      [alertKinds._ALERT_KIND_FUEL_GAIN]: 0,
      [alertKinds._ALERT_KIND_FUEL_LOSS]: 0,
      [alertKinds._ALERT_KIND_ENGINE_TEMP]: 0 };
    const theAlerts = this.props.alerts.toJS();
    // console.log(theAlerts);
    theAlerts.forEach((alrt) => { if (kindsCounter[alrt.eventKind] !== undefined) kindsCounter[alrt.eventKind]++; });

    // const chartColumns = Object.entries(kindsCounter);
    const chartColumns = [[[alertMap[alertKinds._ALERT_KIND_FUEL_GAIN]], kindsCounter[alertKinds._ALERT_KIND_FUEL_GAIN]],
      [[alertMap[alertKinds._ALERT_KIND_FUEL_LOSS]], kindsCounter[alertKinds._ALERT_KIND_FUEL_LOSS]],
      [[alertMap[alertKinds._ALERT_KIND_ENGINE_TEMP]], kindsCounter[alertKinds._ALERT_KIND_ENGINE_TEMP]]];

    this.chart = buildChart(this.chartRef, chartColumns);
  }

  render() {
    this.prepareData();
    return (
      <div style={{ width: '320px', margin: '24px' }}>
        <div className={css(dashboardClasses.dataItemTitleDark)}>
          {'Fleet Alerts'}
        </div>
        <div
          ref={(ref) => { this.chartRef = ref; if (this.chartRef) this.prepareData(); }}
        />
      </div>
    );
  }
}

AlertsChart.propTypes = {
  alerts: PropTypes.array.isRequired,
};
// export default JobsChart;
const mapState = state => ({
  alerts: getLogEntries(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
  // getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(AlertsChart));
