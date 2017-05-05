import React from 'react';
import TimeRangeFilter from 'components/TimeRangeFilter/TimeRangeFilter';

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
      <div>
        <TimeRangeFilter
          onStartDateChange={this.onStartDateChange}
          onStartTimeChange={this.onStartTimeChange}
          onEndDateChange={this.onEndDateChange}
          onEndTimeChange={this.onEndTimeChange}
          withTime
        />
      </div>
    );
  }
}

export default AlertsFilter;
