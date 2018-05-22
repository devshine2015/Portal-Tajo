import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import dateFormats, { dateTypes } from 'configs/dateFormats';
import SubPeriod from './SubPeriod';
import styles from './styles.css';

const Dilimiter = () => (
  <div className={styles.dilimiter}>
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
      <div className={styles.intervals}>
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
  dateFormat: PropTypes.oneOf(dateTypes),
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  withTime: PropTypes.bool,
};

DateRange.defaultProps = {
  dateFormat: dateFormats.default.value,
  withTime: true,
};

export default DateRange;
