import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';
import fetchJobsCall from 'services/MWA/helpers';
import JobsChart from './components/JobsChart';
import classes from './classes';

async function getJobs() {
  try {
    const response = await fetchJobsCall();

    if (response.STATUS === 'success') {
      return response.RESULTS;
    }
  } catch (err) {
    console.error(err);
  }

  return [];
}

class JobsWidget extends Component {

  state = {
    jobs: [],
  };

  fetchJobs = async () => {
    const jobs = await getJobs();

    this.setState({ jobs });
  }

  render() {
    return (
      <div className={css(classes.wrapper)}>
        { this.state.jobs.length } jobs

        <JobsChart jobs={this.state.jobs} />

        <div>
          <button onClick={this.fetchJobs}>Fetch jobs</button>
        </div>
      </div>
    );
  }
}

JobsWidget.propTypes = {};

export default JobsWidget;
