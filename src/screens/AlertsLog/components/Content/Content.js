import React from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import FixedContent from 'components/FixedContent';
import AnimatedLogo from 'components/animated';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import { ALERT_KINDS } from 'services/AlertsSystem/alertKinds';
import Filter from '../Filter/Filter';
import AlertsTimeline from '../AlertsTimeline/AlertsTimeline';
import classes from './classes';

function makeFilterFromKinds() {
  return new List(ALERT_KINDS).map(kind => kind.value);
}

class Content extends React.Component {

  state = {
    range: undefined,
    isDefaultRange: true,
    activeKinds: makeFilterFromKinds(),
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

  /**
   * Update local state of active filters.
   * Filters array is immutable.
   *
   * @param {String} nextKind - one of available alerts kinds
   */
  onFilterKindsChange = (nextKind) => {
    const filterIndex = this.state.activeKinds.indexOf(nextKind);
    const nextFilters = this.state.activeKinds.update((list) => {
      if (filterIndex !== -1) return list.delete(filterIndex);

      return list.push(nextKind);
    });

    this.setState({
      activeKinds: nextFilters,
    });
  }

  getLogsForLastDay() {
    this.getLogs(makePeriodForLast24Hours(), true);
  }

  /**
   * Accepts time range for getting notification logs
   * and bypassing specified range to the callback.
   *
   * @param {Object} range - time range for notifications
   * @param {Date} range.fromDate - start of the range
   * @param {Date} range.toDate - end of the range
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
        <Filter
          onApply={this.getLogs}
          onKindsChange={this.onFilterKindsChange}
          activeFilters={this.state.activeKinds}
        />

        { !this.canShowTimeline() ? <AnimatedLogo.FullscreenLogo /> : (
          <AlertsTimeline
            entries={this.props.entries}
            dateRange={this.state.range}
            displayDefaultRange={this.state.isDefaultRange}
            activeFilters={this.state.activeKinds}
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
