import React from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import FixedContent from 'components/FixedContent';
import AnimatedLogo from 'components/animated';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import AlertsFilter from '../AlertsFilter/AlertsFilter';
import AlertsTimeline from '../AlertsTimeline/AlertsTimeline';
import classes from './classes';

class Content extends React.Component {

  state = {
    range: undefined,
    isDefaultRange: true,
  };

  componentDidMount() {
    if (this.props.isReady) {
      this.getLogsForLastDay();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isReady && nextProps.isReady) {
      this.getLogsForLastDay();
    }
  }

  getLogsForLastDay() {
    this.getLogs(makePeriodForLast24Hours(), true);
  }

  /**
   * Accepts time range for getting notification logs
   * and bypassing specified range to the callback.
   *
   * @param {Object} range - time range for notifications
   * @param {Date} range.startDate - start of the range
   * @param {Date} range.endDate - end of the range
   * @param {Date} range.startTime - specific time of the start
   * @param {Date} range.endTime - specific time of the end
   */
  getLogs = (range, isDefault) => {
    this.props.fetchLogs(range)
      .then(this.saveRange(range, isDefault));
  }

  saveRange = (range, isDefaultRange = false) => {
    this.setState({
      range,
      isDefaultRange,
    });
  }

  canShowTimeline() {
    return this.props.isReady;
  }

  render() {
    return (
      <FixedContent containerClassName={css(classes.contentWrapper)}>
        <AlertsFilter onApply={this.getLogs} />

        { !this.canShowTimeline() ? <AnimatedLogo.FullscreenLogo /> : (
          <AlertsTimeline
            entries={this.props.entries}
            dateRange={this.state.range}
            displayDefaultRange={this.state.isDefaultRange}
          />
        )}

      </FixedContent>
    );
  }
}

Content.propTypes = {
  fetchLogs: React.PropTypes.func.isRequired,
  entries: React.PropTypes.instanceOf(List).isRequired,
  isReady: React.PropTypes.bool.isRequired,
};

export default Content;
