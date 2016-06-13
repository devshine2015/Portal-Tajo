import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Form from 'components/Form';
import InputFieldWrapper from 'components/InputFieldWrapper';
import { generateReport } from './actions';

const FORM_NAME = 'reports';

class ReportsScreen extends React.Component {

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

  render() {
    return (
      <Form
        name={FORM_NAME}
        refs={FORM_NAME}
        onSubmit={this.onSubmit}
      >
        <InputFieldWrapper>
          <DatePicker
            hintText="Start time interval"
            container="inline"
            name="from"
          />
          <DatePicker
            name="to"
            hintText="End time interval"
            container="inline"
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <RaisedButton
            label="Generate report"
            onClick={this.onSubmit}
            primary
          />
        </InputFieldWrapper>
      </Form>
    );
  }
}

ReportsScreen.propTypes = {
  generateReport: React.PropTypes.func.isRequired,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = () => ({});
const mapDispatch = {
  generateReport,
};

export default connect(mapState, mapDispatch)(PureReportsScreen);
