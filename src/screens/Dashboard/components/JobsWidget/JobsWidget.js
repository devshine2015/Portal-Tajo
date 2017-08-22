import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';
import Divider from 'material-ui/Divider';
import fetchJobsCall from 'services/MWA/helpers';
import Widget, { WidgetPaper } from 'components/Widget';
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
    isFullscreen: false,
  };

  componentWillMount() {
    this.fetchJobs();
  }

  resizeWidget = (isFullscreen) => {
    this.setState({ isFullscreen });
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

    if (isLoading) {
      return <RunningLogo.AnimatedLogo containerColor="#fafafa" />;
    }

    return ([
      <Divider key="divider" />,
      <JobsChart jobs={jobs} key="jobs" isFullscreen={this.state.isFullscreen} />,
      <JobsFooter updatedAt={updatedAt} key="footer" />,
    ]);
  }

  render() {
    return (
      <Widget
        containerClassName={css(classes.wrapper)}
        title={`${this.state.jobs.length} Jobs`}
      >
        <WidgetPaper innerClassName={css(classes.inn)}>
          <Header
            fetchJobs={this.fetchJobs}
            resize={this.resizeWidget}
            isFullscreen={this.state.isFullscreen}
          />

          { this.renderInn() }
        </WidgetPaper>
      </Widget>
    );
  }
}

JobsWidget.propTypes = {};

export default JobsWidget;
