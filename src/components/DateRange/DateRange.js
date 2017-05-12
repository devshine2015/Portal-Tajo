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


function calcStartTime() {
  const t = moment().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  return t.toDate();
}

function calcEndTime() {
  const t = moment().set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  });

  return t.toDate();
}

class DateRange extends React.Component {

  defaultStartTime = calcStartTime();
  defaultEndTime = calcEndTime();
  defaultStartDate = moment().subtract(1, 'days').toDate();
  defaultEndDate = this.defaultStartDate;

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
          defaultDate={this.defaultStartDate}
          defaultTime={this.defaultStartTime}
          onDateChange={this.props.onStartDateChange}
          onTimeChange={this.props.onStartTimeChange}
        />
        <Dilimiter />
        <SubPeriod
          withTime={withTime}
          dateHint="End date"
          timeHint="End time"
          formatDate={this.formatDate}
          defaultDate={this.defaultEndDate}
          defaultTime={this.defaultEndTime}
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
