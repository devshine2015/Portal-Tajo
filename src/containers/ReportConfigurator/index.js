import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import RaisedButton from 'material-ui/RaisedButton';
import Form from 'components/Form';
import InputFieldWrapper from 'components/InputFieldWrapper';
import ReportsPeriod from 'components/Period';
import AvailableFields from './components/AvailableFields';
import { dataActions, configuratorActions } from './actions';
import { getFleetName } from 'containers/App/reducer';
import {
  getReportLoadingState,
  getAvailableFields,
  getReportFrequency,
} from './reducer';

class ReportConfigurator extends React.Component {

  constructor(props) {
    super(props);

    // keep states for available checkboxes
    this.state = {};

    this.FORM_NAME = 'configurator';

    this.onChange = this.onChange.bind(this);
  }

  onSelectedFieldsChange = (event, value, index) => {
    const field = event.target.name;

    this.props.updateSelectedFields({ field, value, index })
    .then(() => {
      this.onChange(field, value);
    });
  }

  onChange(field, value) {
    // do nothing if field doesn't change
    if (this.state[field] === value) return;

    this.setState({
      [field]: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const fields = document.forms[this.FORM_NAME].elements;

    const from = fields.from.value.trim();
    const to = fields.to.value !== '' ? fields.to.value.trim() : undefined;

    const data = {
      fromTs: new Date(from).getTime(),
      toTs: to && new Date(to).getTime(),
    };

    this.props.generateReport({
      fleet: this.props.fleet,
      timePeriod: data,
      frequency: this.props.frequency,
    });
  }

  render() {
    return (
      <div>
        Report for all fleet's vehicles
        <Form
          name={this.FORM_NAME}
          refs={this.FORM_NAME}
          onSubmit={this.onSubmit}
        >
          <AvailableFields
            checkedFields={this.state}
            onChange={this.onSelectedFieldsChange}
            fields={this.props.availableFields}
          />

          <ReportsPeriod
            handlePeriodChange={this.onChange}
            handleFrequencyChange={this.props.changeFrequency}
            frequency={this.props.frequency}
            withTime
            names={{
              start: 'from',
              end: 'to',
              startTime: 'timeFrom',
              endTime: 'timeTo',
            }}
          />

          <InputFieldWrapper>
            <RaisedButton
              label="Generate report"
              onClick={this.onSubmit}
              disabled={this.props.isLoading}
              primary
            />
          </InputFieldWrapper>
        </Form>
      </div>
    );
  }
}

ReportConfigurator.propTypes = {
  availableFields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      order: React.PropTypes.number.isRequired,
    })
  ).isRequired,
  changeFrequency: React.PropTypes.func.isRequired,
  fleet: React.PropTypes.string.isRequired,
  frequency: React.PropTypes.string.isRequired,
  generateReport: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  updateSelectedFields: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  availableFields: getAvailableFields(state).toArray(),
  fleet: getFleetName(state),
  isLoading: getReportLoadingState(state),
  frequency: getReportFrequency(state),
});
const mapDispatch = {
  generateReport: dataActions.generateReport,
  updateSelectedFields: configuratorActions.updateSelected,
  changeFrequency: configuratorActions.changeFrequency,
};

const PureReportConfigurator = pure(ReportConfigurator);

export default connect(mapState, mapDispatch)(PureReportConfigurator);
