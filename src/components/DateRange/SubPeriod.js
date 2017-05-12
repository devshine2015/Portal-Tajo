import React from 'react';
import { css } from 'aphrodite/no-important';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import DateIcon from 'material-ui/svg-icons/action/date-range';
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

const SubPeriod = ({
  formatDate,
  dateHint,
  timeHint,
  defaultDate,
  onDateChange,
  withTime,
  defaultTime,
  onTimeChange,
}, {
  muiTheme,
}) => {
  return (
    <div className={css(classes.wrapper)}>
      <DateIcon color={muiTheme.palette.primary1Color} style={STYLES.icon} />
      <DatePicker
        // textFieldStyle={STYLES.picker}
        className={css(classes.picker, classes.picker_big)}
        formatDate={formatDate}
        autoOk
        fullWidth
        hintText={dateHint}
        defaultDate={defaultDate}
        onChange={onDateChange}
        underlineStyle={STYLES.underline}
      />

      { withTime && (
        <TimePicker
          textFieldStyle={STYLES.timeTextField}
          className={css(classes.picker)}
          autoOk
          fullWidth
          defaultTime={defaultTime}
          format="24hr"
          hintText={timeHint}
          onChange={onTimeChange}
          underlineStyle={STYLES.underline}
        />
      )}
    </div>
  );
};

SubPeriod.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

SubPeriod.propTypes = {
  withTime: React.PropTypes.bool,

  // time must be passed if withTime === true
  defaultTime: validateTimeProps,

  // time must be passed if withTime === true
  onTimeChange: validateTimeProps,

  timeHint: validateTimeProps,

  // callback for date formatter
  formatDate: React.PropTypes.func.isRequired,

  dateHint: React.PropTypes.string,

  defaultDate: React.PropTypes.instanceOf(Date).isRequired,

  onDateChange: React.PropTypes.func.isRequired,
};

SubPeriod.defaultProps = {
  withTime: true,
  dateHint: '',
  defaultTime: undefined,
  onTimeChange: undefined,
  timeHint: '',
};

export default SubPeriod;
