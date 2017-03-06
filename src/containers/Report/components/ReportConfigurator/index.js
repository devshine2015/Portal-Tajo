import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import cs from 'classnames';
import {
  RaisedButton,
  Divider,
} from 'material-ui';
import moment from 'moment';
import dateFormats from 'configs/dateFormats';
import Form from 'components/Form';
import { getUserSettings } from 'services/UserModel/reducer';
import { translate } from 'utils/i18n';
import DateFormatSelectorWithMemory from '../DateFormatSelectorWithMemory';
import Period from '../Period';
import AvailableTypes from '../AvailableTypes';
import ProgressBar from '../ProgressBar';
import RawDataButtons from '../RawDataButtons';
import {
  reportActions,
  configuratorActions,
  eventActions,
} from 'containers/Report/actions';
import {
  getLoadingState,
  getAvailableReports,
  getAvailableEvents,
  getErrorMessage,
} from 'containers/Report/reducer';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const TOP_ROW_CLASS = cs(styles.row, styles.top);
const FIELDS_ROW_CLASS = cs(styles.row, styles.form);

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

function getDefaultCheckedReportTypes(fields) {
  const result = {};

  fields.forEach(f => {
    if (!f.checkedByDefault) return;

    result[f.name] = true;
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
    this.defaultEndDate = this.defaultStartDate;
    this.periodFields = {
      start: {
        name: 'start',
        default: this.defaultStartDate,
      },
      end: {
        name: 'end',
        default: this.defaultEndDate,
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
      ...getDefaultCheckedReportTypes(props.availableReports),
      [this.periodFields.start.name]: this.periodFields.start.default,
      [this.periodFields.end.name]: this.periodFields.end.default,
      [this.periodFields.startTime.name]: this.periodFields.startTime.default,
      [this.periodFields.endTime.name]: this.periodFields.endTime.default,
      tempDateFormat: props.userDateFormat || dateFormats.default.value,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDateFormatChange = newFormat => {
    this.setState({
      tempDateFormat: newFormat,
    });
  }

  // source - 'report' or 'event'
  onSelectedFieldsChange = ({ event, value, index, source }) => {
    const field = event.target.name;

    this.props.updateSelectedTypesFields({ field, value, index, source })
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
      dateFormat: this.state.tempDateFormat.toUpperCase(),
    };
  }

  render() {
    const { translations } = this.props;

    return (
      <div className={styles.configurator}>
        <div className={TOP_ROW_CLASS}>
          <div className={styles.column}>
            <DateFormatSelectorWithMemory
              userDateFormat={this.props.userDateFormat}
              tempDateFormat={this.state.tempDateFormat}
              onFormatChange={this.onDateFormatChange}
            />
          </div>

          <div className={styles.column}>
            <Period
              handlePeriodChange={this.onPeriodChange}
              fields={this.periodFields}
              dateFormat={this.state.tempDateFormat}
              withTime
            />
          </div>
        </div>

        <Divider />

        <Form
          name={this.FORM_NAME}
          onSubmit={this.onSubmit}
          className={FIELDS_ROW_CLASS}
        >
          <div className={styles.column}>
            <AvailableTypes
              checkedFields={this.state}
              onChange={this.onSelectedFieldsChange}
              fields={this.props.availableReports}
              source="reports"
              title={ translations.customise_report }
            />

            { !this.props.isLoading && (
              <div className={styles.buttons}>
                <RaisedButton
                  className={styles.button}
                  label={ translations.generate_report}
                  onClick={this.onSubmit}
                  disabled={this.props.isLoading}
                  primary
                />
                { this.props.hasReport && (
                  <RaisedButton
                    className={styles.button}
                    label={ translations.save_report }
                    onClick={this.props.saveReport}
                    secondary
                  />
                )}
              </div>
            )}
          </div>

          <div className={styles.separator}></div>

          <div className={styles.column}>
            <AvailableTypes
              checkedFields={this.state}
              onChange={this.onSelectedFieldsChange}
              fields={this.props.availableEvents}
              source="events"
              title={ translations.customise_raw_events }
            />

            { !this.props.isLoading && (
              <RawDataButtons
                containerClassName={styles.buttons}
                buttonClassName={styles.button}
                generateEvents={this.onSaveRawData}
                isLoading={this.props.isLoading}
              />
            )}

          </div>
        </Form>

        { this.props.isLoading && <ProgressBar /> }

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
  availableReports: React.PropTypes.object.isRequired,
  availableEvents: React.PropTypes.object.isRequired,
  generateReport: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  saveReport: React.PropTypes.func.isRequired,
  updateSelectedTypesFields: React.PropTypes.func.isRequired,
  swipeGeneratedData: React.PropTypes.func.isRequired,
  saveRawData: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
  userDateFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]),

  translations: phrasesShape.isRequired,
};

const mapState = (state) => ({
  availableReports: getAvailableReports(state),
  availableEvents: getAvailableEvents(state),
  isLoading: getLoadingState(state),
  error: getErrorMessage(state),
  userDateFormat: getUserSettings(state).get('dateFormat'),
});
const mapDispatch = {
  generateReport: reportActions.generateReport,
  updateSelectedTypesFields: configuratorActions.updateSelectedTypes,
  swipeGeneratedData: reportActions.removeReportData,
  saveRawData: eventActions.getRawEvents,
};

const PureReport = pure(Report);
const Connected = connect(mapState, mapDispatch)(PureReport);

export default translate(phrases)(Connected);
