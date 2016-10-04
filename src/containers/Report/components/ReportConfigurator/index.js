import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import {
  RaisedButton,
  SelectField,
  MenuItem,
  Divider,
} from 'material-ui';
import moment from 'moment';
import dateFormats from 'configs/dateFormats';
import Form from 'components/Form';
import InputFieldWrapper from 'components/InputFieldWrapper';
import { getUserSettings } from 'services/UserModel/reducer';
import DateFormatSelectorWithMemory from '../DateFormatSelectorWithMemory';
import Period from '../Period';
import AvailableFields from '../AvailableFields';
import ProgressBar from '../ProgressBar';
import {
  dataActions,
  configuratorActions,
  rawActions,
} from 'containers/Report/actions';
import {
  getLoadingState,
  getAvailableFields,
  getReportFrequency,
  getErrorMessage,
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
      tempDateFormat: props.userDateFormat || dateFormats.defaultFormat,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onSaveRawData = this.onSaveRawData.bind(this);
  }

  onDateFormatChange = newFormat => {
    this.setState({
      tempDateFormat: newFormat,
    });
  }

  onSelectedFieldsChange = (event, value, index) => {
    const field = event.target.name;

    this.props.updateSelectedFields({ field, value, index })
    .then(() => {
      if (this.props.hasReport) {
        this.props.swipeGeneratedData();
      }

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

  onSaveRawData = () => {
    const params = this.getParams();

    this.props.saveRawData(params);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const params = this.getParams();

    this.props.generateReport(params);
  }

  getParams() {
    const data = {
      start: this.state[this.periodFields.start.name],
      end: this.state[this.periodFields.end.name],
      startTime: this.state[this.periodFields.startTime.name],
      endTime: this.state[this.periodFields.endTime.name],
    };

    return {
      timePeriod: data,
      frequency: this.props.frequency,
      dateFormat: this.state.tempDateFormat.toUpperCase(),
    };
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
    const buttonsStyle = {
      display: this.props.isLoading ? 'none' : 'block',
    };
    const progressStyle = {
      display: this.props.isLoading ? 'block' : 'none',
    };

    return (
      <div className={styles.configurator}>
        <DateFormatSelectorWithMemory
          userDateFormat={this.props.userDateFormat}
          tempDateFormat={this.state.tempDateFormat}
          onFormatChange={this.onDateFormatChange}
        />

        <Divider />

        <Form
          name={this.FORM_NAME}
          onSubmit={this.onSubmit}
          className={styles.form}
        >
          <AvailableFields
            checkedFields={this.state}
            onChange={this.onSelectedFieldsChange}
            fields={this.props.availableFields}
          />

          <Period
            handlePeriodChange={this.onPeriodChange}
            fields={this.periodFields}
            dateFormat={this.state.tempDateFormat}
            withTime
          />

          { !this.props.hideSplitter && this.renderSplitter() }

          { !this.props.isLoading && (
            <InputFieldWrapper>
              <RaisedButton
                className={styles.button}
                label="Generate report"
                onClick={this.onSubmit}
                disabled={this.props.isLoading}
                primary
              />
              <RaisedButton
                className={styles.button}
                label="Save raw data"
                onClick={this.onSaveRawData}
                disabled={this.props.isLoading}
                primary
              />
              { this.props.hasReport && (
                <RaisedButton
                  className={styles.button}
                  label="Save Generated"
                  onClick={this.props.saveReport}
                  secondary
                />
              )}
            </InputFieldWrapper>
          )}

          { this.props.isLoading && <ProgressBar /> }

        </Form>

        { this.props.error && (
          <div className={styles.error}>
            {this.props.error}
          </div>
        )}
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
  saveRawData: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
  userDateFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]),
};

const mapState = (state) => ({
  availableFields: getAvailableFields(state),
  isLoading: getLoadingState(state),
  frequency: getReportFrequency(state),
  error: getErrorMessage(state),
  userDateFormat: getUserSettings(state).get('dateFormat'),
});
const mapDispatch = {
  generateReport: dataActions.generateReport,
  updateSelectedFields: configuratorActions.updateSelected,
  changeFrequency: configuratorActions.changeFrequency,
  swipeGeneratedData: dataActions.removeReportData,
  saveRawData: rawActions.getRawEvents,
};

const PureReport = pure(Report);

export default connect(mapState, mapDispatch)(PureReport);
