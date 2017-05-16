import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import cs from 'classnames';
import {
  RaisedButton,
  Divider,
} from 'material-ui';
import dateFormats from 'configs/dateFormats';
import Form from 'components/Form';
import SimpleError from 'components/Error';
import DateRange from 'components/DateRange/DateRange';
import { getDateFormat } from 'services/Session/reducer';
import { translate } from 'utils/i18n';
import DateFormatSelectorWithMemory from '../DateFormatSelectorWithMemory';
import AvailableTypes from '../AvailableTypes';
import ProgressBar from '../ProgressBar';
import RawDataButtons from '../RawDataButtons';
import { getErrorType } from 'services/Global/reducer';
import {
  reportActions,
  configuratorActions,
  eventActions,
} from 'containers/Report/actions';
import {
  getLoadingState,
  getAvailableReports,
  getAvailableEvents,
  getSelectedReports,
} from 'containers/Report/reducer';
import { makeDefaultDatePeriod } from 'utils/dateTimeUtils';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const TOP_ROW_CLASS = cs(styles.row, styles.top);
const FIELDS_ROW_CLASS = cs(styles.row, styles.form);

function getDefaultCheckedReportTypes(fields) {
  const result = {};

  fields.forEach(f => {
    if (!f.checkedByDefault) return;

    result[f.name] = true;
  });

  return result;
}

function getStoredCheckedReportTypes(availableReports, selectedFields) {
  const result = {};
  const availableArray = availableReports.toArray();
  selectedFields.forEach(index => {result[availableArray[index].name] = true;});
  return result;
}

class Report extends React.Component {

  constructor(props) {
    super(props);

    this.FORM_NAME = 'configurator';

    this.state = {
      ...makeDefaultDatePeriod(),
      ...getDefaultCheckedReportTypes(props.availableReports),
      // TODO: this does not handle unselected default types
      ...getStoredCheckedReportTypes(props.availableReports, props.selectedFields),
      tempDateFormat: props.userDateFormat,
    };
  }

  onDateFormatChange = (newFormat) => {
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

  onStartDateChange = (_, value) => {
    this.onChange('startDate', value);
  }

  onEndDateChange = (_, value) => {
    this.onChange('endDate', value);
  }

  onStartTimeChange = (_, value) => {
    this.onChange('startTime', value);
  }

  onEndTimeChange = (_, value) => {
    this.onChange('endTime', value);
  }

  onChange = (field, value) => {
    // if value has not been changed
    if (this.state[field] === value) return;

    this.props.swipeGeneratedData();
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
      start: this.state.startDate,
      end: this.state.endDate,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
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
            <DateRange
              onStartDateChange={this.onStartDateChange}
              onStartTimeChange={this.onStartTimeChange}
              onEndDateChange={this.onEndDateChange}
              onEndTimeChange={this.onEndTimeChange}
              dateFormat={this.state.tempDateFormat}
              defaultStartDate={this.state.startDate}
              defaultEndDate={this.state.endDate}
              defaultStartTime={this.state.startTime}
              defaultEndTime={this.state.endTime}
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

          <div className={styles.separator} />

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

        { this.props.errorType && (
          <div className={styles.errorWrapper}>
            <SimpleError type={this.props.errorType} />
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
  errorType: React.PropTypes.string,
  userDateFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]),
  selectedFields: React.PropTypes.object.isRequired,
  translations: phrasesShape.isRequired,
};

Report.defaultProps = {
  errorType: undefined,
  userDateFormat: dateFormats.default.value,
};


const mapState = (state) => ({
  availableReports: getAvailableReports(state),
  availableEvents: getAvailableEvents(state),
  isLoading: getLoadingState(state),
  errorType: getErrorType(state),
  userDateFormat: getDateFormat(state),
  selectedFields: getSelectedReports(state),
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
