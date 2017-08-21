import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';
import {
  Paper,
  Divider,
 } from 'material-ui';
import fetchJobsCall from 'services/MWA/helpers';
import Widget from 'components/Widget';
import RunningLogo from 'components/animated';
import Header from './components/JobsHeader';
import JobsChart from './components/JobsChart';
import JobsFooter from './components/JobsFooter';
import classes from './classes';

async function getJobs({ fromDate, toDate } = {}) {
  try {
    const response = await fetchJobsCall({ fromDate, toDate });

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
    isLoading: true,
    updatedAt: undefined,
  };

  componentWillMount() {
    this.fetchJobs();
  }

  fetchJobs = async ({ fromDate, toDate } = {}) => {
    this.setState({
      isLoading: true,
    });

    const jobs = await getJobs({ fromDate, toDate });

    this.setState({
      jobs,
      updatedAt: new Date(),
      isLoading: false,
    });
  }

  renderInn() {
    const { isLoading, jobs, updatedAt } = this.state;

    return (
      <div className={css(classes.inn)}>
        <Header fetchJobs={this.fetchJobs} />
        {
          isLoading ? <RunningLogo.AnimatedLogo containerColor="#fafafa" /> : ([
            <Divider key="divider" />,
            <JobsChart jobs={jobs} key="jobs" />,
            <JobsFooter updatedAt={updatedAt} key="footer" />,
          ])
        }
      </div>
    );
  }

  render() {
    return (
      <Widget
        containerClass={classes.wrapper}
        title={`${this.state.jobs.length} Jobs`}
      >
        <Paper
          zDepth={1}
          style={{
            width: '100%',
          }}
        >
          { this.renderInn() }
        </Paper>
      </Widget>
    );
  }
}

JobsWidget.propTypes = {};

export default JobsWidget;
