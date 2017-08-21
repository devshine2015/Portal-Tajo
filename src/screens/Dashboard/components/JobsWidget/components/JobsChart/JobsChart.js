/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { bb } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import { css } from 'aphrodite/no-important';
import classes, { HORIZONTAL } from './classes';

const buildChart = (node, json) => {
  const { width, height } = node.getBoundingClientRect();

  return bb.generate({
    data: {
      json,
      labels: true,
      colors: {
        totalJobs: '#51b9ff',
      },
      keys: {
        x: 'teamId',
        value: ['totalJobs']
      },
      names: {
        totalJobs: 'Total assigned jobs',
      },
      type: 'bar'
    },
    axis: {
      x: {
        type: 'category'
      }
    },
    tooltip: {
      // show: false,
    },
    bindto: node,
    size: {
      width: width - (HORIZONTAL * 2),
      height,
    },
    legend: {
      hide: true,
    },
  });
}

/**
 * format jobs into array consumable by bar chart
 * sort it by amount of jobs DESC
 * @param {Array} jobs 
 * @return {Array} array of { teamId, totalJobs }
 */
function formatJobs(jobs = []) {
  return Object.entries(jobs.reduce((acc, job) => {
    const tid = job.TEAM_ID;
    const prevVal = acc[tid] || 0;
    acc[tid] = prevVal + 1;
    return acc;
  }, {}))
  .map(([teamId, totalJobs]) => ({
    teamId,
    totalJobs,
  }))
  .sort((a, b) => b.totalJobs - a.totalJobs);
}

class JobsChart extends Component {
  chartRef = null;

  componentWillReceiveProps(nextProps) {
    // it's better to validate by ts
    // if (nextProps.jobs.length !== 0 && nextProps.jobs.length !== this.props.jobs.length)
      buildChart(this.chartRef, formatJobs(nextProps.jobs));
  }

  componentDidMount() {
    buildChart(this.chartRef, formatJobs(this.props.jobs));
  }

  componentDidUpdate(prevProps, prevState) {
    buildChart(this.chartRef, formatJobs(prevProps.jobs));
  }
  
  render() {
    return (
      <div
        ref={ref => this.chartRef = ref}
        className={css(classes.chart)}
      />
    );
  }
}

JobsChart.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default JobsChart;
