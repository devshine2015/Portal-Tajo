import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Form from 'components/Form';
import InputFieldWrapper from 'components/InputFieldWrapper';
import {
  generateReport,
  saveGenerated,
  resetReportData,
} from './actions';

const FORM_NAME = 'reports';

class ReportsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
    };
  }

  onFromDateChange = (undefined, date) => {
    this.onChange(date, 'from');
  }

  onToDateChange = (undefined, date) => {
    this.onChange(date, 'to');
  }

  onChange = (date, field) => {
    // do nothing if field doesn't change
    if (this.state[field] === date) return;

    this.setState({
      [field]: date,
    });

    if (this.props.hasReport) {
      this.props.resetReportData();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const fields = document.forms[FORM_NAME].elements;
    const data = {};

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].tagName.toLowerCase() !== 'input') continue;

      data[fields[i].name] = fields[i].value.trim();
    }

    this.props.generateReport(data);
  }

  saveGenerated = () => {
    this.props.saveGenerated();
  }

  render() {
    return (
      <Form
        name={FORM_NAME}
        refs={FORM_NAME}
        onSubmit={this.onSubmit}
      >
        <InputFieldWrapper>
          <DatePicker
            autoOk
            hintText="Start time interval"
            container="inline"
            onChange={this.onFromDateChange}
            name="from"
          />
          <DatePicker
            autoOk
            container="inline"
            hintText="End time interval"
            onChange={this.onToDateChange}
            name="to"
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <RaisedButton
            label="Generate report"
            onClick={this.onSubmit}
            disabled={this.props.isLoading}
            primary
          />
          { this.props.hasReport && (
              <FlatButton
                label="Save Generated"
                onClick={this.saveGenerated}
              />
            )
          }
        </InputFieldWrapper>
      </Form>
    );
  }
}

ReportsScreen.propTypes = {
  saveGenerated: React.PropTypes.func.isRequired,
  generateReport: React.PropTypes.func.isRequired,
  resetReportData: React.PropTypes.func.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = (state) => ({
  isLoading: state.getIn(['reports', 'isLoading']),
  hasReport: state.getIn(['reports', 'reportData']).size !== 0,
});
const mapDispatch = {
  saveGenerated,
  generateReport,
  resetReportData,
};

export default connect(mapState, mapDispatch)(PureReportsScreen);
