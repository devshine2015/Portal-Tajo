import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import Form from 'components/Form';
import InputFieldWrapper from 'components/InputFieldWrapper';
import { dataActions } from './actions';
import { getFleetName } from 'containers/App/reducer';
import { appHasStoredReport, getReportLoadingState } from './reducer';

const FORM_NAME = 'reports';

class ReportsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
      isOneDay: false,
    };

    this.onOneDayToggle = this.onOneDayToggle.bind(this);
  }

  onFromDateChange = (event = undefined, date) => {
    this.onChange(date, 'from');
  }

  onToDateChange = (event = undefined, date) => {
    this.onChange(date, 'to');
  }

  onChange = (date, field) => {
    // do nothing if field doesn't change
    if (this.state[field] === date) return;

    this.setState({
      [field]: date,
    });

    if (this.props.hasReport) {
      this.props.removeReportData();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const fields = document.forms[FORM_NAME].elements;

    const from = fields.from.value.trim();
    const to = fields.to.value ? fields.to.value.trim() : null;

    const data = {
      fromTs: new Date(from).getTime(),
      toTs: new Date(to).getTime(),
    };

    this.props.generateReport({
      fleet: this.props.fleet,
      isOneDay: this.state.isOneDay,
      timePeriod: data,
    });
  }

  onOneDayToggle = (event, isInputChecked) => {
    this.setState({
      isOneDay: isInputChecked,
    });
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
          disabled={this.state.isOneDay}
          hintText="End time interval"
          name="to"
          onChange={this.onToDateChange}
        />
        <Checkbox
          checked={this.state.isOneDay}
          label="One-day report"
          onCheck={this.onOneDayToggle}
        />
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
  fleet: React.PropTypes.string.isRequired,
  generateReport: React.PropTypes.func.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  removeReportData: React.PropTypes.func.isRequired,
  saveGenerated: React.PropTypes.func.isRequired,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = (state) => ({
  fleet: getFleetName(state),
  isLoading: getReportLoadingState(state),
  hasReport: appHasStoredReport(state),
});
const mapDispatch = {
  ...dataActions,
};

export default connect(mapState, mapDispatch)(PureReportsScreen);
