/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { bb } from 'billboard.js';

const buildChart = (node, json) => 
  bb.generate({
    data: {
      json,
      keys: {
        x: 'teamId',
        value: ['totalJobs']
      },
      names: {
        totalJobs: 'Total amount of jobs',
      },
      type: 'bar'
    },
    axis: {
      x: {
        type: 'category'
      }
    },
    tooltip: {
      show: false,
    },
    bindto: node
  });

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
    // buildChart(this.chartRef);
  }
  
  
  render() {
    return (
      <div ref={ref => this.chartRef = ref} />
    );
  }
}

JobsChart.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default JobsChart;
