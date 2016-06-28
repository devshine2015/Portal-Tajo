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
} from './reducer';

class ReportConfigurator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.FORM_NAME = 'configurator';

    this.onChange = this.onChange.bind(this);
  }

  onPeriodChange = (field, value) => {
    this.onChange(field, value);
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
    const to = fields.to.value ? fields.to.value.trim() : from;

    const data = {
      fromTs: new Date(from).getTime(),
      toTs: new Date(to).getTime(),
    };

    this.props.generateReport({
      fleet: this.props.fleet,
      timePeriod: data,
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
            handlePeriodChange={this.onPeriodChange}
            names={{
              start: 'from',
              end: 'to',
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
  fleet: React.PropTypes.string.isRequired,
  generateReport: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  updateSelectedFields: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  availableFields: getAvailableFields(state).toArray(),
  fleet: getFleetName(state),
  isLoading: getReportLoadingState(state),
});
const mapDispatch = {
  generateReport: dataActions.generateReport,
  updateSelectedFields: configuratorActions.updateSelected,
};

const PureReportConfigurator = pure(ReportConfigurator);

export default connect(mapState, mapDispatch)(PureReportConfigurator);
