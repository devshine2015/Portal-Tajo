import React from 'react';
import pure from 'recompose/pure';
import DatePicker from 'material-ui/DatePicker';

class Period extends React.Component {

  onFromDateChange = (event = undefined, value) => {
    this.onChange('from', value);
  }

  onToDateChange = (event = undefined, value) => {
    this.onChange('to', value);
  }

  onChange = (field, value) => {
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
          hintText="End time interval"
          name={this.props.names.end}
          onChange={this.onToDateChange}
        />
      </div>
    );
  }
}

Period.propTypes = {
  handlePeriodChange: React.PropTypes.func.isRequired,
  names: React.PropTypes.shape({
    start: React.PropTypes.string.isRequired,
    end: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default pure(Period);
