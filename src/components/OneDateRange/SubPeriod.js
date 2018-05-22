import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { makeDateWithTime } from 'utils/dateTimeUtils';
import styles from './styles.css';

function validateTimeProps(props, propName, componentName) { // eslint-disable-line consistent-return
  if (props.withTime && !props[propName]) {
    return new Error(
      `If you need to render time selector you must specify '${propName}' in '${componentName}'. Validation failed!`,
    );
  }
}

const STYLES = {
  underline: {
    borderBottom: 'solid 2px rgba(34, 34, 34, 0.25)',
  },
  textField: {
    fontSize: 24,
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
};

class SubPeriod extends React.Component {
  onDateChange = (_, value) => {
    const date = this.concatDateWithTime(value, this.time);

    this.props.onDateChange(null, date);
    // keep new value for calcualtions on next change
    this.date = value;
  }

  onTimeChange = (_, value) => {
    const time = this.concatDateWithTime(this.date, value);

    this.props.onDateChange(null, time);
    // keep new value for calcualtions on next change
    this.time = value;
  }

  date = this.props.date;
  time = this.props.date;

  concatDateWithTime(date, time) {
    if (!this.props.withTime) return date;

    return makeDateWithTime(date, time);
  }

  render() {
    const {
      formatDate,
      dateHint,
      timeHint,
      date,
      withTime,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <DatePicker
          textFieldStyle={STYLES.textField}
          className={styles.datePicker}
          formatDate={formatDate}
          autoOk
          fullWidth
          hintText={dateHint}
          defaultDate={date}
          onChange={this.onDateChange}
          underlineStyle={STYLES.underline}
          maxDate={new Date()}
        />

        { withTime && (
          <TimePicker
            textFieldStyle={STYLES.textField}
            className={styles.timePicker}
            autoOk
            fullWidth
            defaultTime={date}
            format="24hr"
            hintText={timeHint}
            onChange={this.onTimeChange}
            underlineStyle={STYLES.underline}
          />
        )}
      </div>
    );
  }
}

SubPeriod.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

SubPeriod.propTypes = {
  withTime: PropTypes.bool,

  timeHint: validateTimeProps,

  // callback for date formatter
  formatDate: PropTypes.func.isRequired,

  dateHint: PropTypes.string,

  date: PropTypes.instanceOf(Date).isRequired,

  onDateChange: PropTypes.func.isRequired,
};

SubPeriod.defaultProps = {
  withTime: true,
  dateHint: '',
  timeHint: '',
};

export default SubPeriod;
