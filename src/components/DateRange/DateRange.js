import React from 'react';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import dateFormats from 'configs/dateFormats';
import SubPeriod from './SubPeriod';
import classes from './classes';

const Dilimiter = () => {
  return (
    <div className={css(classes.dilimiter)}>
      to
    </div>
  );
};

class DateRange extends React.Component {

  formatDate = (date) => {
    return moment(date).format(this.props.dateFormat.toUpperCase());
  }

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
          onDateChange={this.props.onStartDateChange}
          onTimeChange={this.props.onStartTimeChange}
        />
        <Dilimiter />
        <SubPeriod
          withTime={withTime}
          dateHint="End date"
          timeHint="End time"
          formatDate={this.formatDate}
          defaultDate={this.props.defaultEndDate}
          defaultTime={this.props.defaultEndTime}
          onDateChange={this.props.onEndDateChange}
          onTimeChange={this.props.onEndTimeChange}
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
  onStartDateChange: React.PropTypes.func.isRequired,
  onStartTimeChange: React.PropTypes.func,
  onEndDateChange: React.PropTypes.func.isRequired,
  onEndTimeChange: React.PropTypes.func,
  withTime: React.PropTypes.bool,
};

DateRange.defaultProps = {
  dateFormat: dateFormats.default.value,
  withTime: true,
  onStartTimeChange: undefined,
  onEndTimeChange: undefined,
};

export default DateRange;
