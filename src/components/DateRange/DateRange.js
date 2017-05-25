import React from 'react';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import dateFormats from 'configs/dateFormats';
import SubPeriod from './SubPeriod';
import classes from './classes';
import { makeDateWithTime } from 'utils/dateTimeUtils';

const Dilimiter = () => (
  <div className={css(classes.dilimiter)}>
      to
    </div>
  );

class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.dateWithTimeFrom = makeDateWithTime(props.defaultStartDate, props.defaultStartTime);
    this.dateWithTimeTo = makeDateWithTime(props.defaultEndDate, props.defaultEndTime);
  }

  onChange = () => {
    if (this.props.onChange !== undefined) {
      this.props.onChange(this.dateWithTimeFrom, this.dateWithTimeTo);
    }
  }

  onStartDateChange = (_, value) => {
    this.dateWithTimeFrom = makeDateWithTime(value, this.dateWithTimeFrom);
    this.onChange();
  }

  onEndDateChange = (_, value) => {
    this.dateWithTimeTo = makeDateWithTime(value, this.dateWithTimeTo);
    this.onChange();
  }

  onStartTimeChange = (_, value) => {
    this.dateWithTimeFrom = makeDateWithTime(this.dateWithTimeFrom, value);
    this.onChange();
  }

  onEndTimeChange = (_, value) => {
    this.dateWithTimeTo = makeDateWithTime(this.dateWithTimeTo, value);
    this.onChange();
  }

  formatDate = date => moment(date).format(this.props.dateFormat.toUpperCase())

  render() {
    // use same same param for both subPeriods
    const { withTime } = this.props;

    return (
      <div className={css(classes.intervals)}>
        <SubPeriod
          withTime={withTime}
          dateHint="Start date"
          timeHint="Start time"
          formatDate={this.formatDate}
          defaultDate={this.props.defaultStartDate}
          defaultTime={this.props.defaultStartTime}
          onDateChange={this.onStartDateChange}
          onTimeChange={this.onStartTimeChange}
        />
        <Dilimiter />
        <SubPeriod
          withTime={withTime}
          dateHint="End date"
          timeHint="End time"
          formatDate={this.formatDate}
          defaultDate={this.props.defaultEndDate}
          defaultTime={this.props.defaultEndTime}
          onDateChange={this.onEndDateChange}
          onTimeChange={this.onEndTimeChange}
        />
      </div>
    );
  }
}

DateRange.propTypes = {
  dateFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]),
  defaultStartDate: React.PropTypes.instanceOf(Date).isRequired,
  defaultEndDate: React.PropTypes.instanceOf(Date).isRequired,
  defaultStartTime: React.PropTypes.instanceOf(Date),
  defaultEndTime: React.PropTypes.instanceOf(Date),
  onStartDateChange: React.PropTypes.func,
  onStartTimeChange: React.PropTypes.func,
  onEndDateChange: React.PropTypes.func,
  onEndTimeChange: React.PropTypes.func,
  onChange: React.PropTypes.func,
  withTime: React.PropTypes.bool,
};

DateRange.defaultProps = {
  dateFormat: dateFormats.default.value,
  withTime: true,
  onStartDateChange: undefined,
  onEndDateChange: undefined,
  onStartTimeChange: undefined,
  onEndTimeChange: undefined,
  onChange: undefined,
};

export default DateRange;
