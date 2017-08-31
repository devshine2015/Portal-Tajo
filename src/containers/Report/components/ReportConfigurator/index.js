import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import cs from 'classnames';
import {
  RaisedButton,
  Divider,
} from 'material-ui';
import dateFormats, { dateTypes } from 'configs/dateFormats';
import Form from 'components/Form';
import SimpleError from 'components/Error';
import { DateRange } from 'components/DateRange';
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
    const { fromDate, toDate } = makeDefaultDatePeriod();

    this.state = {
      fromDate,
      toDate,
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

  onDateTimeChange = (newFromDate, newToDate) => {
    this.setState({
      fromDate: newFromDate,
      toDate: newToDate,
    });
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
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
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
              onChange={this.onDateTimeChange}
              dateFormat={this.state.tempDateFormat}
              fromDate={this.state.fromDate}
              toDate={this.state.toDate}
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
  availableReports: PropTypes.object.isRequired,
  availableEvents: PropTypes.object.isRequired,
  generateReport: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasReport: PropTypes.bool.isRequired,
  saveReport: PropTypes.func.isRequired,
  updateSelectedTypesFields: PropTypes.func.isRequired,
  swipeGeneratedData: PropTypes.func.isRequired,
  saveRawData: PropTypes.func.isRequired,
  errorType: PropTypes.string,
  userDateFormat: PropTypes.oneOf(dateTypes),
  selectedFields: PropTypes.object.isRequired,
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
