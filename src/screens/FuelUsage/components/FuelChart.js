import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bb } from 'billboard.js';
import pure from 'recompose/pure';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import inClasses from './classes';

import { getFuelReportTimeRange } from './../services/reducer';

// stucture of accepted `data` is next
// const data = {
//   dates: ['1519968279000', '1519968379000'],
//   values: ['162.8', '162.8'],
//   alerts: {loss: [{.}, {.}], refuel: [{.}, {.}, {.} ]},
// }

const buildChart = (node, data, maxY) => {
  console.log(data);
  // debugger;

  const theChart = bb.generate({
    legend: {
      show: false,
    },
    data: {
      xs: {
        data1: 'x1',
        data2: 'x2',
        data3: 'x3',
      },
      columns: [
        ['x1', ...data.dates],
        ['x2', ...data.alerts.loss.dates],
        ['x3', ...data.alerts.refuel.dates],
        ['data1', ...data.values],
        ['data2', ...data.alerts.loss.values],
        ['data3', ...data.alerts.refuel.values],
      ],
      type: 'area',
      types: {
        data1: 'area',
        data2: 'bubble',
        data3: 'bubble',
      },
      colors: {
        data2: '#ea2224',
        data3: '#61a653',
      },
      onclick: (d, element) => console.log(d, element),
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          fit: true,
          count: 7,
          format: '%d-%m-%Y',
        },
        padding: {
          left: 0,
        },
      },
      y: {
        min: 0,
        max: maxY,
        padding: {
          top: 0,
          bottom: 0,
        },
        tick: {
          format(x) {
            return `${x} Ltr`;
          },
        },
      },
    },
    point: {
      r: 0,
    },
    bubble: {
      maxR: 30,
    },
    tooltip: {
      contents(d) {
        return `<table class="bb-tooltip">
        <tbody><tr><th>${moment(d[0].x).utc().format('DD-MM-YYYY HH:mm')}</th></tr>
        <tr class="bb-tooltip-name-value">
        <td class="name">Fuel Amount: ${d[0].value} Ltr</td>
      </tr></tbody></table>`;
      },
    },
    bindto: node,
  });

  return theChart;
};

// FYI: fuelSeries keys (dates) comes with 0 timezone
// that's why we just reflecting data in UTC
function makeSeriesObject(fuelSeries) {
  const dates = Object.keys(fuelSeries).map((date) => {
    return moment(date).valueOf();
  });
  const values = Object.values(fuelSeries);

  return {
    dates,
    values,
  };
}

const toNextMinuteTimeRange = (time) => {
  const minutes = moment(time).minutes() + 1;
  const startTime = moment(time).valueOf();
  const endTime = moment(time).set({ minute: minutes, second: 0 }).valueOf();
  return {
    fromTime: startTime,
    toTime: endTime,
  };
};

function makeAlertsObject(vehicleAlerts, fuelSeries) {
  const alerts = {
    loss: {
      dates: [],
      values: [],
    },
    refuel: {
      dates: [],
      values: [],
    },
  };

  vehicleAlerts.map((alert) => {
    switch (alert.alertType) {
      case 'LOSS': {
        let value = fuelSeries[alert.date];

        // there exist cases when fuel series hasn't exact time like alert datetime
        // here we're searching closest fuel log in range to next minute
        if (value === undefined) {
          const closestDate = Object.keys(fuelSeries).find((date) => {
            const dateValue = moment(date).valueOf();
            const { fromTime, toTime } = toNextMinuteTimeRange(alert.date);
            return (dateValue >= fromTime) && (dateValue < toTime);
          });

          value = closestDate !== undefined ? fuelSeries[closestDate] : 0;
        }

        alerts.loss.dates.push(moment(alert.date).valueOf());
        // alerts.loss.values.push(value); 
        alerts.loss.values.push(value - 5);
        break;
      }
      case 'REFUEL': {
        let value = fuelSeries[alert.date];

        if (value === undefined) {
          const closestDate = Object.keys(fuelSeries).find((date) => {
            const dateValue = moment(date).valueOf();
            const { fromTime, toTime } = toNextMinuteTimeRange(alert.date);
            return (dateValue >= fromTime) && (dateValue < toTime);
          });

          value = closestDate !== undefined ? fuelSeries[closestDate] : 0;
        }
        alerts.refuel.dates.push(moment(alert.date).valueOf());
        alerts.refuel.values.push(value - 5);
        break;
      }
      default:
        return null;
    }
  });

  return alerts;
}

class FuelChart extends Component {
  chartRef = null;
  chart = null;

  componentDidMount() {
    this.chartInit();
  }

  chartInit() {
    const { dates, values } = makeSeriesObject(this.props.fuelSeries);
    const alerts = makeAlertsObject(this.props.vehicleAlerts, this.props.fuelSeries);
    this.chart = buildChart(
      this.chartRef,
      {
        dates,
        values,
        alerts,
      },
      this.props.fuelCapacity + 100, // add 100 just to prevent cut of alert nodes
    );
  }
  componentWillReceiveProps(nextProps) {
    // const processedData = filterSeries(nextProps.fuelSeries);
    debugger;
    const { dates, values } = makeSeriesObject(nextProps.fuelSeries);
    const alerts = makeAlertsObject(nextProps.vehicleAlerts, nextProps.fuelSeries);

    this.chart.load({
      columns: [
        ['x1', ...dates],
        ['x2', ...alerts.loss.dates],
        ['x3', ...alerts.refuel.dates],
        ['data1', ...values],
        ['data2', ...alerts.loss.values],
        ['data3', ...alerts.refuel.values],
      ],
    });
  }
  render() {
    return (
      <div className={css(inClasses.container)}>
        <div className={css(inClasses.containerHeading)}>
          {`Fuel History for ${moment(this.props.timeRange.fromDate).format('MMMM Do YYYY')} to ${moment(this.props.timeRange.toDate).format('MMMM Do YYYY')}.`}
        </div>
        <div
          ref={(ref) => { this.chartRef = ref; }}
        />
      </div>
    );
  }
}

FuelChart.propTypes = {
  fuelSeries: PropTypes.object.isRequired,
  vehicleAlerts: PropTypes.array.isRequired,
  fuelCapacity: PropTypes.number.isRequired,
  timeRange: PropTypes.object.isRequired,
};

const mapState = state => ({
  timeRange: getFuelReportTimeRange(state),
});

export default connect(mapState, null)(pure(FuelChart));
