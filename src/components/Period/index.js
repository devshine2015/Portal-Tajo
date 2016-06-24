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
          name="from"
          onChange={this.onFromDateChange}
        />
        <DatePicker
          autoOk
          container="inline"
          disabled={this.props.isOneDay}
          hintText="End time interval"
          name="to"
          onChange={this.onToDateChange}
        />
        <Checkbox
          checked={this.props.isOneDay}
          label="One-day report"
          name="oneDay"
          onCheck={this.onChange}
        />
      </div>
    );
  }
}

Period.propTypes = {
  handlePeriodChange: React.PropTypes.func.isRequired,
  isOneDay: React.PropTypes.bool.isRequired,
};

export default pure(Period);
