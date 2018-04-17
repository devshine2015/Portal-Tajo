import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bb } from 'billboard.js';
import pure from 'recompose/pure';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import { mapSetFocusCoords, mapCleanFocusCoords } from 'containers/Map/reducerAction';
import inClasses from './classes';

import { getFuelReportTimeRange } from './../services/reducer';

// stucture of accepted `data` is next
// const data = {
//   dates: ['1519968279000', '1519968379000'],
//   values: ['162.8', '162.8'],
//   alerts: {loss: [{.}, {.}], refuel: [{.}, {.}, {.} ]},
// }
const buildChart = (node, data, maxY, onClickedFunc) => {

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
      onclick: (d) => {
        const alertType = d.name === 'data2' ? 'LOSS' : 'REFUEL';
        onClickedFunc({
          date: moment(d.x).utc().format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
          type: alertType,
        });
      },
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          fit: true,
          count: 7,
          format: '%d-%m-%Y',
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
  const values = Object.values(fuelSeries).map((value) => {
    return parseFloat(value);
  });

  return {
    dates,
    values,
  };
}

const nextTwoMinutesTimeRange = (time) => {
  const minutes = moment(time).minutes() + 2;
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
            const { fromTime, toTime } = nextTwoMinutesTimeRange(alert.date);
            return (dateValue >= fromTime) && (dateValue < toTime);
          });
          value = closestDate !== undefined ? parseFloat(fuelSeries[closestDate]) : 0;
        } else {
          value = parseFloat(value);
        }

        // -8 makes value smaller - to prevent same cords for 2 types of data (billboard bug)
        if (value > 8) {
          value -= 8;
        }
        alerts.loss.dates.push(moment(alert.date).valueOf());
        alerts.loss.values.push(value);
        break;
      }
      case 'REFUEL': {
        let value = fuelSeries[alert.date];

        if (value === undefined) {
          const closestDate = Object.keys(fuelSeries).find((date) => {
            const dateValue = moment(date).valueOf();
            const { fromTime, toTime } = nextTwoMinutesTimeRange(alert.date);
            return (dateValue >= fromTime) && (dateValue < toTime);
          });

          value = closestDate !== undefined ? parseFloat(fuelSeries[closestDate]) : 0;
        } else {
          value = parseFloat(value);
        }
        // -8 makes value smaller - to prevent same cords for 2 types of data (billboard bug)
        if (value > 8) {
          value -= 8;
        }
        alerts.refuel.dates.push(moment(alert.date).valueOf());
        alerts.refuel.values.push(value);
        break;
      }
      default:
        return null;
    }
  });
  // console.log('vehicleAlerts', vehicleAlerts);
  // console.log('alerts', alerts);
  return alerts;
}

class FuelChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusCoords: null,
    };
    this.chartRef = null;
    this.chart = null;
  }

  componentDidMount() {
    this.chartInit();
  }

  componentWillReceiveProps(nextProps) {
    const { dates, values } = makeSeriesObject(nextProps.fuelSeries);
    const alerts = makeAlertsObject(nextProps.vehicleAlerts, nextProps.fuelSeries);
    // if vehicle changed - remove focus coords, load active vehicle data
    // debugger;
    if (this.props.vehicle !== nextProps.vehicle) {
      this.props.mapCleanFocusCoords();
      if (dates.length === 0) {
        // console.log('1');
        this.chart.unload({
          ids: ['data1', 'data2', 'data3'],
        });
      } else {
        // console.log('5');
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
        if (alerts.loss.dates.length === 0) {
          this.chart.unload({
            ids: ['data2'],
          });
        }
        if (alerts.refuel.dates.length === 0) {
          this.chart.unload({
            ids: ['data3'],
          });
        }
      }
    } else {
      // happens when vehicle the same, but dates changed
      // otherway, we're checking fuelSeries first key, or its length
      const firstDate1 = moment(Object.keys(this.props.fuelSeries)[0]).valueOf();
      const firstDate2 = moment(Object.keys(nextProps.fuelSeries)[0]).valueOf();
      const setLength1 = Object.keys(this.props.fuelSeries).length;
      const setLength2 = Object.keys(nextProps.fuelSeries).length;

      // if different - destroy old and build new chart
      if ((firstDate1 !== firstDate2) || (setLength1 !== setLength2)) {
        this.chart.destroy();
        this.chart = buildChart(
          this.chartRef,
          {
            dates,
            values,
            alerts,
          },
          nextProps.fuelCapacity + 100,
          this.handleBubbleClick,
        );
      }
    }

    this.setState({
      focusCoords: null,
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  handleBubbleClick = (d) => {
    const clickedAlert = this.props.vehicleAlerts.find((alert) => {
      return alert.date === d.date;
    });
    if (clickedAlert !== undefined) {
      // this condition is here to make MapContainer focusing on coords
      // even if we clicked on one bubble twice (so with same coords)
      // that's why we firstly need to clear (set null for it), and then apply same coords
      if (this.state.focusCoords !== null && (
        (clickedAlert.lat !== this.state.focusCoords.lat) ||
        (clickedAlert.lng !== this.state.focusCoords.lng))
      ) {
        this.props.mapCleanFocusCoords();
      }
      this.props.mapSetFocusCoords(clickedAlert.position);
      this.setState({
        focusCoords: clickedAlert.position,
      });
    }
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
      this.props.fuelCapacity + 100, // add 100 just to prevent cut of alert nodes,
      this.handleBubbleClick,
    );
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
  fuelCapacity: PropTypes.number.isRequired,
  vehicle: PropTypes.string.isRequired,
  vehicleAlerts: PropTypes.array.isRequired,
  timeRange: PropTypes.object.isRequired,
  mapSetFocusCoords: PropTypes.func.isRequired,
  mapCleanFocusCoords: PropTypes.func.isRequired,
};

const mapState = state => ({
  timeRange: getFuelReportTimeRange(state),
});
const mapDispatch = {
  mapSetFocusCoords,
  mapCleanFocusCoords,
};

export default connect(mapState, mapDispatch)(pure(FuelChart));
