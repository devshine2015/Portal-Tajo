import React from 'react';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';

class Period extends React.Component {

  onFromDateChange = (event = undefined, value) => {
    this.onChange('from', value);
  }

  onToDateChange = (event = undefined, value) => {
    this.onChange('to', value);
  }

  onChange = (event, value) => {
    const field = typeof event === 'string' ? event : event.target.name;

    this.props.handlePeriodChange(field, value);
  }

  render() {
    return (
      <div>
        <DatePicker
          autoOk
          hintText="Start time interval"
          container="inline"
          name={this.props.names.start}
          onChange={this.onFromDateChange}
        />
        <DatePicker
          autoOk
          container="inline"
          disabled={this.props.isOneDay}
          hintText="End time interval"
          name={this.props.names.end}
          onChange={this.onToDateChange}
        />
        <Checkbox
          checked={this.props.isOneDay}
          label="One-day report"
          name={this.props.names.oneDay}
          onCheck={this.onChange}
        />
      </div>
    );
  }
}

Period.propTypes = {
  handlePeriodChange: React.PropTypes.func.isRequired,
  isOneDay: React.PropTypes.bool.isRequired,
  names: React.PropTypes.shape({
    start: React.PropTypes.string.isRequired,
    end: React.PropTypes.string.isRequired,
    oneDay: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default pure(Period);
