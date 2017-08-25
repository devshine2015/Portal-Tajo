import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { bb } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import { css } from 'aphrodite/no-important';
import { mapTeamToCar } from 'services/MWA/helpers';
import classes, { HORIZONTAL } from './classes';

const buildChart = (node, json, {
  width,
  height,
} = node.getBoundingClientRect()) =>
  bb.generate({
    data: {
      json,
      labels: true,
      colors: {
        totalJobs: '#51b9ff',
      },
      keys: {
        x: 'teamName',
        value: ['totalJobs'],
      },
      names: {
        totalJobs: 'Total assigned jobs',
      },
      type: 'bar',
    },
    axis: {
      x: {
        type: 'category',
      },
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

const getVehicleName = (teamId, vehicles = {}) => {
  const vehicleId = mapTeamToCar(teamId);

  return R.prop(vehicleId, vehicles);
};

/**
 * format jobs into array consumable by bar chart
 * sort it by amount of jobs DESC
 * @param {Array} jobs
 * @param {Array} vehicles - we will map these vehicles names to team id
 * @return {Array} array of { teamId, totalJobs }
 */
function formatJobs(jobs = [], vehicles = []) {
  return Object.entries(jobs.reduce((acc, job) => {
    const teamId = job.TEAM_ID;

    // reject team if it not mapped to vehicle
    if (!mapTeamToCar(teamId)) return acc;

    const prevVal = acc[teamId] || 0;
    acc[teamId] = prevVal + 1;
    return acc;
  }, {}))
  .map(([teamId, totalJobs]) => ({
    teamName: getVehicleName(teamId, vehicles),
    totalJobs,
  }))
  .sort((a, b) => b.totalJobs - a.totalJobs);
}

class JobsChart extends Component {

  chartRef = null;
  chart = null;
  originalSize = null;
  fullScreenSize = {
    width: 900,
    height: 500,
  };

  componentDidMount() {
    this.chartInit();
  }

  componentWillReceiveProps(nextProps) {
    // it's better to validate by ts
    if (nextProps.jobs.length !== 0 && nextProps.jobs.length !== this.props.jobs.length) {
      this.chart.load(formatJobs(nextProps.jobs, this.props.vehicles));
    }

    this.doResize(nextProps);
  }

  componentDidUpdate(prevProps) {
    this.chart.load(formatJobs(prevProps.jobs, this.props.vehicles));
  }

  doResize(nextProps) {
    if (!this.props.isFullscreen && nextProps.isFullscreen) {
      this.chart.resize(this.fullScreenSize);
    } else if (this.props.isFullscreen && !nextProps.isFullscreen) {
      this.chart.resize(this.originalSize);
    }
  }

  chartInit() {
    const { width, height } = this.chartRef.getBoundingClientRect();
    this.originalSize = {
      width,
      height,
    };

    this.chart = buildChart(this.chartRef, formatJobs(this.props.jobs, this.props.vehicles));
  }

  render() {
    return (
      <div
        ref={(ref) => { this.chartRef = ref; }}
        className={css(classes.chart)}
      />
    );
  }
}

JobsChart.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  vehicles: PropTypes.object.isRequired, // eslint-disable-line
};

export default JobsChart;
