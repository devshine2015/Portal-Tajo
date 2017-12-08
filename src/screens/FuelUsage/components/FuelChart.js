import React, { Component } from 'react';
// import R from 'ramda';
import { bb } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import { css } from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import moment from 'moment';

// import classes from 'components/DashboardElements/classes';
import inClasses from './classes';

const buildChart = (node, data, maxY) => {
  // const {
  //   // width,
  //   height,
  // } = node.getBoundingClientRect();

  const theChart = bb.generate({
    legend: {
      show: false,
    },
    data: {
      json: data,
      type: 'area',
      keys: {
        x: 'date',
        value: ['date', 'value'],
      },
      // onclick: function (d, i) { console.log('onclick', d, i); },
      // onover: function (d, i) { console.log('onover', d, i); },
      // onout: function (d, i) { console.log('onout', d, i); },
    },
    point: {
      show: false,
    },
    axis: {
      x: {
        // show: true,
        type: 'timeseries',
        tick: {
          // outer: true,
          fit: true,
          count: 7,
          format(x) {
            return moment(x).format('dddd, MMMM Do YYYY');
            // return x.getFullYear();
          },
        },
        padding: {
          left: 0,
          // right: 0,
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
          outer: true,
          format(x) {
            return `${x} Ltr`;
            // return x.getFullYear();
          },
        },
      },
    },

    tooltip: {
      // format: {
      //   title(d) {
      //     return moment(d).format('DD-MM-YYYY HH:mm');
      //   },
      //   name(name, ratio, id, index) {
      //     return 'Fuel Amount';
      //   },
      //   value(value, ratio, id) {
      //     // console.log(value, ratio, id);
      //     return `${value} Ltr`;
      //   },
      // },
      contents(d) {
        return `<table class="bb-tooltip">
        <tbody><tr><th>${moment(d[0].x).format('DD-MM-YYYY HH:mm')}</th></tr>
        <tr class="bb-tooltip-name-value">
        <td class="name">Fuel Amount: ${d[0].value} Ltr</td>
      </tr></tbody></table>`;
      },

    },
    bindto: node,
  });
  // theChart.axis.labels({
  //   x: 'Time Period',
  //   y: 'Fuel Amount, Ltr',
  // });

  return theChart;
};


function filterSeries(fuelSeries) {
  const keys = [];
  Object.keys(fuelSeries).forEach((k) => {
    const obj = {};
    obj.date = moment(k).valueOf();
    obj.value = fuelSeries[k];
    keys.push(obj);
  });
  // TODO: dirty quick fix - do the sorting/converting when we recieve the data
  if (keys.length === 0) {
    keys.push({ date: 0, value: 0 });
  }
  return keys.sort((a, b) => a.date < b.date ? -1 : 1);
}
class FuelChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  chartRef = null;
  chart = null;

  componentDidMount() {
    this.chartInit();
  }

  chartInit() {
    this.chart = buildChart(this.chartRef, filterSeries(this.props.fuelSeries), this.props.fuelCapacity);
  }
  componentWillReceiveProps(nextProps) {
    const processedData = filterSeries(nextProps.fuelSeries);
    // if (processedData.length > 3) {
    //   this.chart.axis.x.min = processedData[0].date;
    //   this.chart.axis.x.max = processedData[processedData.length - 1].date;
    // }
    this.chart.load(
      {
        json: processedData,
        keys: {
          x: 'date',
          value: ['date', 'value'],
        },
      },
    );
  }
  render() {
    return (
      <div className={css(inClasses.container)}>
        <div className={css(inClasses.containerHeading)}>Fuel Usage History</div>
        <div
          ref={(ref) => { this.chartRef = ref; }}
        />
      </div>
    );
  }
}

FuelChart.propTypes = {
  fuelSeries: PropTypes.array.isRequired,
  fuelCapacity: PropTypes.number.isRequired,
};

export default FuelChart;
