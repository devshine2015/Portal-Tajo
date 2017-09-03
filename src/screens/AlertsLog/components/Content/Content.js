import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import FixedContent from 'components/FixedContent';
import AnimatedLogo from 'components/animated';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import { DateRangeWithButton } from 'components/DateRange';
import AlertsTimeline from '../AlertsTimeline';
import phrases from '../../PropTYpes';
import classes from './classes';

class Content extends React.Component {

  state = {
    isDefaultRange: true,
  };

  componentWillMount() {
    if (this.props.isConditionsReady && this.props.entries.size === 0) {
      this.getLogsForLastDay();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isConditionsReady && nextProps.isConditionsReady && nextProps.entries.size === 0) {
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
   * @param {Date} range.fromDate - start of the range
   * @param {Date} range.toDate - end of the range
   * @param {Boolean} isDefault = mark range as a default range for last 24 hours
   */
  getLogs = (range, isDefault = false) => {
    this.props.fetchLogs(range)
      .then(() => this.setState({ isDefault }));
  }

  canShowTimeline() {
    return this.props.isConditionsReady;
  }

  render() {
    const { fromDate, toDate } = this.props;

    return (
      <FixedContent containerClassName={css(classes.contentWrapper)}>
        <DateRangeWithButton
          withTime={false}
          onApply={this.getLogs}
          fromDate={fromDate}
          toDate={toDate}
          button={(
            <FlatButton
              primary
              label={this.props.translations.apply}
            />
          )}
        />

        { !this.canShowTimeline() ? <AnimatedLogo.FullscreenLogo /> : (
          <AlertsTimeline
            entries={this.props.entries}
            dateRange={{ fromDate, toDate }}
            displayDefaultRange={this.state.isDefaultRange}
            selectedVehicleName={this.props.selectedVehicleName}
          />
        )}

      </FixedContent>
    );
  }
}

Content.propTypes = {
  fetchLogs: PropTypes.func.isRequired,
  entries: PropTypes.instanceOf(List).isRequired,
  isConditionsReady: PropTypes.bool.isRequired,
  selectedVehicleId: PropTypes.string,
  selectedVehicleName: PropTypes.string,
  translations: makePhrasesShape(phrases).isRequired,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
};

Content.defaultProps = {
  selectedVehicleId: undefined,
  selectedVehicleName: undefined,
  ...makePeriodForLast24Hours(),
};

export default translate(phrases)(Content);
