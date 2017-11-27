import React, { Component } from 'react';
// import R from 'ramda';
import { bb } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const buildChart = (node) => {
  const {
    // width,
    height,
  } = node.getBoundingClientRect();

  return bb.generate({
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25],
        ['data2', 50, 20, 10, 40, 15, 25],
      ],
      type: 'line',
      // onclick: function (d, i) { console.log('onclick', d, i); },
      // onover: function (d, i) { console.log('onover', d, i); },
      // onout: function (d, i) { console.log('onout', d, i); },
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


class FuelChart extends Component {
  chartRef = null;
  chart = null;

  componentDidMount() {
    this.chartInit();
  }

  // componentWillReceiveProps(nextProps) {
  //   // it's better to validate by ts
  //   // if (nextProps.lastUpdate !== this.props.lastUpdate) {
  //   //   this.chart.load(formatJobs(nextProps.jobs, this.props.vehicles));
  //   // }
  // }

  chartInit() {
    this.chart = buildChart(this.chartRef);
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
};

export default FuelChart;
