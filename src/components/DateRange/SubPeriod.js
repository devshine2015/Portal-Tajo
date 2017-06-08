import React from 'react';
import { css } from 'aphrodite/no-important';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import { makeDateWithTime } from 'utils/dateTimeUtils';
import classes from './SubPeriod.classes';

function validateTimeProps(props, propName, componentName) { // eslint-disable-line consistent-return
  if (props.withTime && !props[propName]) {
    return new Error(
      `If you need to render time selector you must specify '${propName}' in '${componentName}'. Validation failed!`,
    );
  }
}

const STYLES = {
  underline: {
    borderBottom: 'none',
  },
  timeTextField: {
    maxWidth: 55,
  },
  icon: {
    width: 20,
    height: 20,
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
      <div className={css(classes.wrapper)}>
        <DateIcon
          color={this.context.muiTheme.palette.primary1Color}
          style={STYLES.icon}
        />
        <DatePicker
          className={css(classes.picker, classes.picker_big)}
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
            textFieldStyle={STYLES.timeTextField}
            className={css(classes.picker)}
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
  muiTheme: React.PropTypes.object.isRequired,
};

SubPeriod.propTypes = {
  withTime: React.PropTypes.bool,

  timeHint: validateTimeProps,

  // callback for date formatter
  formatDate: React.PropTypes.func.isRequired,

  dateHint: React.PropTypes.string,

  date: React.PropTypes.instanceOf(Date).isRequired,

  onDateChange: React.PropTypes.func.isRequired,
};

SubPeriod.defaultProps = {
  withTime: true,
  dateHint: '',
  timeHint: '',
};

export default SubPeriod;
