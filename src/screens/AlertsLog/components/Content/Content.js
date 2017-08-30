import React, { PropTypes } from 'react';
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
    range: undefined,
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
   */
  getLogs = (range, isDefault) => {
    this.props.fetchLogs(range)
      .then(() => this.saveRange(range, isDefault));
  }

  saveRange = (range, isDefaultRange = false) => {
    this.setState({
      range,
      isDefaultRange,
    });
  }

  canShowTimeline() {
    return this.props.isConditionsReady;
  }

  render() {
    return (
      <FixedContent containerClassName={css(classes.contentWrapper)}>
        <DateRangeWithButton
          withTime={false}
          onApply={this.getLogs}
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
            dateRange={this.state.range}
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
};

Content.defaultProps = {
  selectedVehicleId: undefined,
  selectedVehicleName: undefined,
};

export default translate(phrases)(Content);
