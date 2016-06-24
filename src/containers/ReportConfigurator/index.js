import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Form from 'components/Form';
import InputFieldWrapper from 'components/InputFieldWrapper';
import ReportsPeriod from 'components/Period';
import { dataActions, configuratorActions } from './actions';
import { getFleetName } from 'containers/App/reducer';
import {
  appHasStoredReport,
  getReportLoadingState,
  getAvailableFields,
} from './reducer';

const ReportAvailableFields = ({
  fields,
  checkedFields,
  onChange,
}) => (
  <div className="availableFields">
    {fields.map(f => {
      const isChecked = Boolean(checkedFields[f.name]);

      return (
        <Checkbox
          checked={isChecked}
          label={f.label}
          key={f.name}
          name={f.name}
          onCheck={onChange}
        />
      );
    })}
  </div>
);

ReportAvailableFields.propTypes = {
  checkedFields: React.PropTypes.object.isRequired,
  fields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      order: React.PropTypes.number.isRequired,
    })
  ).isRequired,
  onChange: React.PropTypes.func.isRequired,
};

class ReportConfigurator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      oneDay: false,
    };

    this.FORM_NAME = 'configurator';

    this.onChange = this.onChange.bind(this);
  }

  onPeriodChange = (field, value) => {
    this.onChange(field, value);
  }

  onSelectedFieldsChange = (event, value) => {
    const field = event.target.name;

    this.props.updateSelectedFields({ field, value })
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
    const to = fields.to.value ? fields.to.value.trim() : null;

    const data = {
      fromTs: new Date(from).getTime(),
      toTs: new Date(to).getTime(),
    };

    this.props.generateReport({
      fleet: this.props.fleet,
      isOneDay: this.state.isOneDay,
      timePeriod: data,
    }).then(() => {
      this.props.removeReportData();
    });
  }

  saveGenerated = () => {
    this.props.saveGenerated();
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
          <ReportAvailableFields
            checkedFields={this.state}
            onChange={this.onSelectedFieldsChange}
            fields={this.props.availableFields}
          />

          <ReportsPeriod
            isOneDay={this.state.oneDay}
            handlePeriodChange={this.onPeriodChange}
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
            )}
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
  hasReport: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  removeReportData: React.PropTypes.func.isRequired,
  saveGenerated: React.PropTypes.func.isRequired,
  updateSelectedFields: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  availableFields: getAvailableFields(state).toArray(),
  fleet: getFleetName(state),
  isLoading: getReportLoadingState(state),
  hasReport: appHasStoredReport(state),
});
const mapDispatch = {
  ...dataActions,
  updateSelectedFields: configuratorActions.updateSelected,
};

const PureReportConfigurator = pure(ReportConfigurator);

export default connect(mapState, mapDispatch)(PureReportConfigurator);
