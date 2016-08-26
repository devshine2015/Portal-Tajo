import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import Form from 'components/Form';
import InputFieldWrapper from 'components/InputFieldWrapper';
import Period from '../Period';
import AvailableFields from '../AvailableFields';
import { dataActions, configuratorActions } from 'containers/Report/actions';
import {
  getReportLoadingState,
  getAvailableFields,
  getReportFrequency,
} from 'containers/Report/reducer';

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

function getDefaultCheckedFields(fields) {
  const result = {};

  fields.forEach(f => {
    if (!f.checkedByDefault) return;

    result[f.name] = f.checkedByDefault;
  });

  return result;
}

class Report extends React.Component {

  constructor(props) {
    super(props);

    this.FORM_NAME = 'configurator';
    this.defaultStartTime = calcStartTime();
    this.defaultEndTime = calcEndTime();
    this.defaultStartDate = moment().subtract(1, 'days').toDate();
    this.periodFields = {
      start: {
        name: 'start',
        default: this.defaultStartDate,
      },
      end: {
        name: 'end',
        default: undefined,
      },
      startTime: {
        name: 'startTime',
        default: this.defaultStartTime,
      },
      endTime: {
        name: 'endTime',
        default: this.defaultEndTime,
      },
    };

    this.state = {
      ...getDefaultCheckedFields(props.availableFields),
      [this.periodFields.start.name]: this.periodFields.start.default,
      [this.periodFields.end.name]: this.periodFields.end.default,
      [this.periodFields.startTime.name]: this.periodFields.startTime.default,
      [this.periodFields.endTime.name]: this.periodFields.endTime.default,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSelectedFieldsChange = (event, value, index) => {
    const field = event.target.name;

    this.props.updateSelectedFields({ field, value, index })
    .then(() => {
      this.props.swipeGeneratedData();
      this.onChange(field, value);
    });
  }

  onPeriodChange = (field, value) => {
    this.props.swipeGeneratedData();
    this.onChange(field, value);
  }

  onChange(field, value) {
    // do nothing if field doesn't change
    if (this.state[field] === value) return;

    this.setState({
      [field]: value,
    });
  }

  onFrequencyChange = (event, key, value) => {
    this.props.changeFrequency(value);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      start: this.state[this.periodFields.start.name],
      end: this.state[this.periodFields.end.name],
      startTime: this.state[this.periodFields.startTime.name],
      endTime: this.state[this.periodFields.endTime.name],
    };

    this.props.generateReport({
      timePeriod: data,
      frequency: this.props.frequency,
    });
  }

  renderSplitter() {
    return (
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
    );
  }

  render() {
    return (
      <div>
        <Form
          name={this.FORM_NAME}
          onSubmit={this.onSubmit}
        >
          <AvailableFields
            checkedFields={this.state}
            onChange={this.onSelectedFieldsChange}
            fields={this.props.availableFields}
          />

          <Period
            handlePeriodChange={this.onPeriodChange}
            fields={this.periodFields}
            withTime
          />

          { !this.props.hideSplitter && this.renderSplitter() }

          <InputFieldWrapper>
            <RaisedButton
              className={styles.button}
              label="Generate report"
              onClick={this.onSubmit}
              disabled={this.props.isLoading}
              primary
            />
            { this.props.hasReport && (
              <RaisedButton
                className={styles.button}
                label="Save Generated"
                onClick={this.props.saveReport}
                primary
              />
            )}
          </InputFieldWrapper>
        </Form>
      </div>
    );
  }
}

Report.propTypes = {
  availableFields: React.PropTypes.object.isRequired,
  changeFrequency: React.PropTypes.func.isRequired,
  frequency: React.PropTypes.string,
  generateReport: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  hideSplitter: React.PropTypes.bool.isRequired,
  saveReport: React.PropTypes.func.isRequired,
  updateSelectedFields: React.PropTypes.func.isRequired,
  swipeGeneratedData: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  availableFields: getAvailableFields(state),
  isLoading: getReportLoadingState(state),
  frequency: getReportFrequency(state),
});
const mapDispatch = {
  generateReport: dataActions.generateReport,
  updateSelectedFields: configuratorActions.updateSelected,
  changeFrequency: configuratorActions.changeFrequency,
  swipeGeneratedData: dataActions.removeReportData,
};

const PureReport = pure(Report);

export default connect(mapState, mapDispatch)(PureReport);
