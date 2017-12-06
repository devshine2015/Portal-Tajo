import React, { Component } from 'react';
// import R from 'ramda';
import { bb } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import { css } from 'aphrodite/no-important';
import classes from './classes';
import PropTypes from 'prop-types';
import moment from 'moment';

const buildChart = (node, data) => {
  const {
    // width,
    height,
  } = node.getBoundingClientRect();

  return bb.generate({
    data: {
      json: data,
      type: 'line',
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
        show: false,
        type: 'category',
      },
    },
    tooltip: {
      format: {
        title(d) { return 'Date'; },
        value(value, ratio, id) {
          // console.log(value, ratio, id);
          return value;
        },
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
  });
};


function filterSeries(fuelSeries) {
  const keys = [];
  Object.keys(fuelSeries).forEach((k) => {
    const obj = {};
    obj.date = moment(k).valueOf();
    obj.value = fuelSeries[k];
    keys.push(obj);
  });
  return keys;
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
    this.chart = buildChart(this.chartRef, filterSeries(this.props.fuelSeries));
  }
  componentWillReceiveProps(nextProps) {
    this.chart.load(
      {
        json: filterSeries(nextProps.fuelSeries),
        keys: {
          x: 'date',
          value: ['date', 'value'],
        },
      },
    );
  }
  render() {
    return (
      <div style={{ width: '100%', margin: '24px' }}>
        <div className={css(classes.dataItemTitleDark)}>
          {'Fuel Usages'}
        </div>
        <div
          ref={(ref) => { this.chartRef = ref; }}
        />
      </div>
    );
  }
}

FuelChart.propTypes = {
  fuelSeries: PropTypes.array.isRequired,
};

export default FuelChart;
