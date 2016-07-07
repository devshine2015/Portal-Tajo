import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import createBaseUrl from 'utils/createBaseUrl';
import Form from 'components/Form';
import Button from 'components/Button';
import InputField from 'components/InputField';
import InputFieldWrapper from 'components/InputFieldWrapper';
import { authActions } from 'containers/App/actions';
import { PORTALS } from './constants';

const FORM_NAME = 'login';

const URLSList = () => (
  <ul>
    {
      PORTALS.map(p => {
        const link = `${createBaseUrl(p.fleet)}/`;
        return (
          <li key={p.fleet}>
            <Link to={link}>{p.niceName}</Link>
          </li>
        );
      })
    }
  </ul>
);

class LoginForm extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();

    const fields = document.forms[FORM_NAME].elements;
    const data = {};

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].tagName.toLowerCase() !== 'input') continue;

      data[fields[i].name] = fields[i].value.trim();
    }

    this.props.login(data);
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
        <URLSList />
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
};

const PureLoginForm = pure(LoginForm);

const mapState = () => ({});
const mapDispatch = {
  login: authActions.login,
};

export default connect(mapState, mapDispatch)(PureLoginForm);
