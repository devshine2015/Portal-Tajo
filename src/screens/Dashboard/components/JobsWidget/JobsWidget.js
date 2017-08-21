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
    isLoading: true,
  };

  componentWillMount() {
    this.fetchJobs();
  }

  fetchJobs = async () => {
    this.setState({
      isLoading: true,
    });
    const jobs = await getJobs();

    this.setState({
      jobs,
      isLoading: false,
    });
  }

  renderInn() {
    const Inn = ({ children }) => <div className={css(classes.inn)}>{ children }</div>;

    if (this.state.isLoading) {
      return (
        <Inn>
          <RunningLogo.AnimatedLogo containerColor="#fafafa" />
        </Inn>
      );
    }

    return (
      <Inn>
        <Header />
        <Divider />
        <JobsChart jobs={this.state.jobs} />

        <div>
          <button onClick={this.fetchJobs}>Fetch jobs</button>
        </div>
      </Inn>
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
