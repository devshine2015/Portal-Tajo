import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import Divider from 'material-ui/Divider';
import fetchJobsCall, {
  // filterValidJobs,
} from 'services/MWA/helpers';
import Widget, { WidgetPaper } from 'components/Widget';
import RunningLogo from 'components/animated';
import Header from './components/JobsHeader';
import JobsChart from './components/JobsChart';
import Placeholder from './components/Placeholder';
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

    const chart = jobs.length === 0 ? <Placeholder key="plaholder" /> : (
      <JobsChart
        key="jobs"
        vehicles={this.props.vehicles}
        jobs={jobs}
        lastUpdate={this.state.updatedAt}
        isFullscreen={this.state.isFullscreen}
      />
    );

    return ([
      <Divider key="divider" />,
      chart,
      <JobsFooter updatedAt={updatedAt} key="footer" />,
    ]);
  }

  render() {
    return (
      <Widget
        containerClassName={css(classes.wrapper)}
        title="Jobs"
      >
        <WidgetPaper innerClassName={css(classes.inn)}>
          <Header
            fetchJobs={this.fetchJobs}
            resize={this.resizeWidget}
            isResizable={this.props.isResizable}
            isFullscreen={this.state.isFullscreen}
          />

          { this.renderInn() }
        </WidgetPaper>
      </Widget>
    );
  }
}

JobsWidget.propTypes = {
  vehicles: PropTypes.object.isRequired, // eslint-disable-line
  isResizable: PropTypes.bool,
};

JobsWidget.defaultProps = {
  isResizable: false,
};

export default pure(JobsWidget);
