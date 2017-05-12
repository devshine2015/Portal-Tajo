import React from 'react';
import { css } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import DateRange from 'components/DateRange/DateRange';
import classes from './classes';

const STYLES = {
  applyBtn: {
    marginLeft: 10,
  },
};

class AlertsFilter extends React.Component {

  state = {};

  onStartDateChange = (_, value) => {
    this.onPeriodChange('startDate', value);
  }

  onEndDateChange = (_, value) => {
    this.onPeriodChange('endDate', value);
  }

  onStartTimeChange = (_, value) => {
    this.onPeriodChange('startTime', value);
  }

  onEndTimeChange = (_, value) => {
    this.onPeriodChange('endTime', value);
  }

  onPeriodChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  render() {
    return (
      <div className={css(classes.filter)}>
        <DateRange
          onStartDateChange={this.onStartDateChange}
          onStartTimeChange={this.onStartTimeChange}
          onEndDateChange={this.onEndDateChange}
          onEndTimeChange={this.onEndTimeChange}
          withTime
        />
        <FlatButton
          primary
          label="Apply"
          style={STYLES.applyBtn}
        />
      </div>
    );
  }
}

export default AlertsFilter;
