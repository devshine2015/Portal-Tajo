import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Form from 'components/Form';
import Button from 'components/Button';
import InputField from 'components/InputField';
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
          <InputField
            name="from"
            type="date"
          />
          <InputField
            name="to"
            placeholder="Username"
            type="date"
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <Button
            onClick={this.onSubmit}
            text="Generate report"
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
