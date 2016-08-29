import React from 'react';
import pure from 'recompose/pure';

import styles from './styles.css';

class OutdatedPeriod extends React.Component {

  onStartDateChange = (e) => {
    this.onChange(this.props.fields.start.name, e.target.value);
  }

  onEndDateChange = (e) => {
    this.onChange(this.props.fields.end.name, e.target.value);
  }

  onStartTimeChange = (e) => {
    this.onChange(this.props.fields.startTime.name, e.target.value);
  }

  onEndTimeChange = (e) => {
    this.onChange(this.props.fields.endTime.name, e.target.value);
  }

  onChange = (field, value) => {
    this.props.handlePeriodChange(field, value);
  }

  renderDate = () => (
    <div className={styles['interval-col']}>
      <div>
        <label>
          Start date
          <br />
          <input
            type="date"
            name={this.props.fields.start.name}
            onChange={this.onStartDateChange}
            // value={this.props.fields.start.default}
          />
        </label>
      </div>
      <div>
        <label>
          Finish date
          <br />
          <input
            type="date"
            name={this.props.fields.end.name}
            onChange={this.onEndDateChange}
          />
        </label>
      </div>
    </div>
  )

  renderTime = () => (
    <div className={styles['interval-col']}>
      <div>
        <label>
          Start time
          <br />
          <input
            type="time"
            name={this.props.fields.startTime.name}
            onChange={this.onStartTimeChange}
          />
        </label>
      </div>
      <div>
        <label>
          End time
          <br />
          <input
            type="time"
            name={this.props.fields.endTime.name}
            onChange={this.onEndTimeChange}
          />
        </label>
      </div>
      {/*<TimePicker
        autoOk
        container="inline"
        defaultTime={this.props.fields.startTime.default}
        format="24hr"
        hintText="Start time interval"
        name={this.props.fields.startTime.name}
        onChange={this.onStartTimeChange}
      />
      <TimePicker
        autoOk
        container="inline"
        defaultTime={this.props.fields.endTime.default}
        format="24hr"
        hintText="End time interval"
        name={this.props.fields.endTime.name}
        onChange={this.onEndTimeChange}
      />*/}
    </div>
  )

  render() {
    return (
      <div>
        <div className={styles.intervals}>
          { this.renderDate() }
          { this.props.withTime && this.renderTime() }
        </div>
      </div>
    );
  }
}

OutdatedPeriod.propTypes = {
  handlePeriodChange: React.PropTypes.func.isRequired,
  fields: React.PropTypes.shape({
    start: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      default: React.PropTypes.any.isRequired,
    }).isRequired,
    end: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      default: React.PropTypes.any,
    }).isRequired,
    startTime: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      default: React.PropTypes.any.isRequired,
    }),
    endTime: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      default: React.PropTypes.any.isRequired,
    }),
  }).isRequired,
  withTime: React.PropTypes.bool,
};

export default pure(OutdatedPeriod);
