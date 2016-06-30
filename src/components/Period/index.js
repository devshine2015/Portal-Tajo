import React from 'react';
import pure from 'recompose/pure';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Period extends React.Component {

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
  }).isRequired,
};

export default pure(Period);
