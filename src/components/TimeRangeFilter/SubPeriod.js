import React from 'react';
// import { css } from 'aphrodite/no-important';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
// import classes from './SubPeriod.classes';

function validateTimeProps(props, propName, componentName) { // eslint-disable-line consistent-return
  if (props.withTime && !props[propName]) {
    return new Error(
      `If you need to render time selector you must specify '${propName}' in '${componentName}'. Validation failed!`,
    );
  }
}

const SubPeriod = ({
  formatDate,
  dateHint,
  timeHint,
  defaultDate,
  onDateChange,
  withTime,
  defaultTime,
  onTimeChange,
}) => {
  return (
    <div>
      <DatePicker
        // textFieldStyle={STYLES.picker}
        // className={css(classes.picker)}
        formatDate={formatDate}
        autoOk
        hintText={dateHint}
        defaultDate={defaultDate}
        onChange={onDateChange}
      />

      { withTime && (
        <TimePicker
          // textFieldStyle={STYLES.picker}
          // className={css(classes.picker)}
          autoOk
          defaultTime={defaultTime}
          format="24hr"
          hintText={timeHint}
          onChange={onTimeChange}
        />
      )}
    </div>
  );
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
