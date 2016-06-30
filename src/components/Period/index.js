import React from 'react';
import pure from 'recompose/pure';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import styles from './styles.css';

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

class Period extends React.Component {

  constructor(props) {
    super(props);

    this.defaultStartTime = calcStartTime();
    this.defaultEndTime = calcEndTime();
    this.defaultStartDate = moment().subtract(1, 'days').toDate();
  }

  onFromDateChange = (event = undefined, value) => {
    this.onChange(this.props.names.start, value);
  }

  onToDateChange = (event = undefined, value) => {
    this.onChange(this.props.names.end, value);
  }

  onFrequencyChange = (event, key, value) => {
    this.props.handleFrequencyChange(value);
  }

  onChange = (field, value) => {
    this.props.handlePeriodChange(field, value);
  }

  renderDate = () => (
    <div className={styles['interval-col']}>
      <DatePicker
        autoOk
        hintText="Start date interval"
        defaultDate={this.defaultStartDate}
        name={this.props.names.start}
        onChange={this.onFromDateChange}
      />
      <DatePicker
        autoOk
        hintText="End date interval"
        name={this.props.names.end}
        onChange={this.onToDateChange}
      />
    </div>
  )

  renderTime = () => (
    <div className={styles['interval-col']}>
      <TimePicker
        autoOk
        container="inline"
        defaultTime={this.defaultStartTime}
        format="24hr"
        hintText="Start time interval"
        name={this.props.names.startTime}
        onChange={this.onFromDateChange}
      />
      <TimePicker
        autoOk
        container="inline"
        defaultTime={this.defaultEndTime}
        format="24hr"
        hintText="End time interval"
        name={this.props.names.end}
        onChange={this.onToDateChange}
      />
    </div>
  )

  render() {
    return (
      <div>
        <div className={styles.intervals}>
          { this.renderDate() }
          { this.props.withTime && this.renderTime() }
        </div>
        <SelectField
          value={this.props.frequency}
          onChange={this.onFrequencyChange}
          floatingLabelText="Split report"
        >
          <MenuItem
            value="daily"
            primaryText="Daily"
          />
          <MenuItem
            value="hourly"
            primaryText="Hourly"
          />
        </SelectField>
      </div>
    );
  }
}

Period.propTypes = {
  frequency: React.PropTypes.string.isRequired,
  handleFrequencyChange: React.PropTypes.func.isRequired,
  handlePeriodChange: React.PropTypes.func.isRequired,
  names: React.PropTypes.shape({
    start: React.PropTypes.string.isRequired,
    end: React.PropTypes.string.isRequired,
    startTime: React.PropTypes.string,
    endTime: React.PropTypes.string,
  }).isRequired,
  withTime: React.PropTypes.bool,
};

export default pure(Period);
