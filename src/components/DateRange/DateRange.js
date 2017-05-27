import React from 'react';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import dateFormats, { dateTypes } from 'configs/dateFormats';
import SubPeriod from './SubPeriod';
import classes from './classes';

const Dilimiter = () => (
  <div className={css(classes.dilimiter)}>
    to
  </div>
);

class DateRange extends React.Component {

  from = this.props.fromDate;
  to = this.props.toDate;

  onChange = () => {
    this.props.onChange(this.from, this.to);
  }

  onStartChange = (_, value) => {
    this.from = value;
    this.onChange();
  }

  onEndChange = (_, value) => {
    this.to = value;
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
          date={this.props.fromDate}
          onDateChange={this.onStartChange}
        />
        <Dilimiter />
        <SubPeriod
          withTime={withTime}
          dateHint="End date"
          timeHint="End time"
          formatDate={this.formatDate}
          date={this.props.toDate}
          onDateChange={this.onEndChange}
        />
      </div>
    );
  }
}

DateRange.propTypes = {
  dateFormat: React.PropTypes.oneOf(dateTypes),
  fromDate: React.PropTypes.instanceOf(Date).isRequired,
  toDate: React.PropTypes.instanceOf(Date).isRequired,
  onChange: React.PropTypes.func.isRequired,
  withTime: React.PropTypes.bool,
};

DateRange.defaultProps = {
  dateFormat: dateFormats.default.value,
  withTime: true,
};

export default DateRange;
