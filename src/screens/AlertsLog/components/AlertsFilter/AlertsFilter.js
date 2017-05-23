import React from 'react';
import { css } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import DateRange from 'components/DateRange/DateRange';
import { makeDefaultDatePeriod } from 'utils/dateTimeUtils';
import classes from './classes';

const STYLES = {
  applyBtn: {
    marginLeft: 10,
  },
};

class AlertsFilter extends React.Component {

  state = {
    ...makeDefaultDatePeriod(),
  };

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

  onFilterClick = () => {
    this.props.onApply(this.state);
  }

  render() {
    return (
      <div className={css(classes.filter)}>
        <DateRange
          onStartDateChange={this.onStartDateChange}
          onStartTimeChange={this.onStartTimeChange}
          onEndDateChange={this.onEndDateChange}
          onEndTimeChange={this.onEndTimeChange}
          defaultStartDate={this.state.startDate}
          defaultEndDate={this.state.endDate}
          defaultStartTime={this.state.startTime}
          defaultEndTime={this.state.endTime}
          withTime
        />
        <FlatButton
          primary
          label="Apply"
          style={STYLES.applyBtn}
          onClick={this.onFilterClick}
        />
      </div>
    );
  }
}

AlertsFilter.propTypes = {
  onApply: React.PropTypes.func.isRequired,
};

export default AlertsFilter;
