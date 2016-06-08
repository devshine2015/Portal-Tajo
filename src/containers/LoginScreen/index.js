import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Form from 'components/Form';
import Button from 'components/Button';
import InputField from 'components/InputField';
import InputFieldWrapper from 'components/InputFieldWrapper';
import { login } from './actions';

const FORM_NAME = 'login';

class LoginScreen extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();

    const fields = document.forms[FORM_NAME].elements;
    const data = {};

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].tagName.toLowerCase() !== 'input') continue;

      data[fields[i].name] = fields[i].value.trim();
    }

    this.props.login(this.props.fleet, data);
  }

  render() {
    return (
      <div>
        <Form
          name={FORM_NAME}
          refs={FORM_NAME}
          onSubmit={this.onSubmit}
        >
          <InputFieldWrapper>
            <InputField
              name="username"
              placeholder="Username"
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <InputField
              name="password"
              placeholder="Password"
              type="password"
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <Button
              type="submit"
              text="Sign In"
              onClick={this.onSubmit}
            />
          </InputFieldWrapper>
        </Form>
      </div>
    );
  }
}

LoginScreen.propTypes = {
  fleet: React.PropTypes.string.isRequired,
  login: React.PropTypes.func.isRequired,
};

const PureLoginScreen = pure(LoginScreen);

const mapState = (state, ownProps) => ({
  fleet: ownProps.params.fleet,
});
const mapDispatch = {
  login,
};

export default connect(mapState, mapDispatch)(PureLoginScreen);
