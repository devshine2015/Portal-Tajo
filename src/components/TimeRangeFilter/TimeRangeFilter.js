import React from 'react';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import dateFormats from 'configs/dateFormats';
import styles from './styles.css';

const STYLES = {
  picker: {
    width: 150,
  },
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

class TimeRangeFilter extends React.Component {

  defaultStartTime = calcStartTime();
  defaultEndTime = calcEndTime();
  defaultStartDate = moment().subtract(1, 'days').toDate();
  defaultEndDate = this.defaultStartDate;

  formatDate = (date) => {
    return moment(date).format(this.props.dateFormat.toUpperCase());
  }

  renderDate = () => (
    <div className={styles['interval-col']}>
      <DatePicker
        textFieldStyle={STYLES.picker}
        className={styles.picker}
        formatDate={this.formatDate}
        autoOk
        hintText="Start date interval"
        defaultDate={this.defaultStartDate}
        onChange={this.props.onStartDateChange}
      />
      <DatePicker
        textFieldStyle={STYLES.picker}
        className={styles.picker}
        formatDate={this.formatDate}
        autoOk
        hintText="End date interval"
        defaultDate={this.defaultEndDate}
        onChange={this.props.onEndDateChange}
      />
    </div>
  )

  renderTime = () => (
    <div className={styles['interval-col']}>
      <TimePicker
        textFieldStyle={STYLES.picker}
        className={styles.picker}
        autoOk
        defaultTime={this.defaultStartTime}
        format="24hr"
        hintText="Start time interval"
        onChange={this.props.onStartTimeChange}
      />
      <TimePicker
        textFieldStyle={STYLES.picker}
        className={styles.picker}
        autoOk
        defaultTime={this.defaultEndTime}
        format="24hr"
        hintText="End time interval"
        onChange={this.props.onEndTimeChange}
      />
    </div>
  )

  render() {
    return (
      <div className={styles.intervals}>
        { this.renderDate() }
        { this.props.withTime && this.renderTime() }
      </div>
    );
  }
}

TimeRangeFilter.propTypes = {
  dateFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]),
  onStartDateChange: React.PropTypes.func.isRequired,
  onStartTimeChange: React.PropTypes.func,
  onEndDateChange: React.PropTypes.func.isRequired,
  onEndTimeChange: React.PropTypes.func,
  withTime: React.PropTypes.bool,
};

TimeRangeFilter.defaultProps = {
  dateFormat: dateFormats.default.value,
  withTime: false,
  onStartTimeChange: undefined,
  onEndTimeChange: undefined,
};

export default TimeRangeFilter;
