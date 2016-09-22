import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Form from 'components/Form';
import {
  TextField,
  RaisedButton,
  Paper,
  Divider,
} from 'material-ui';
import { loginActions } from 'services/Auth/actions';
import { getFleetName } from 'services/Global/reducer';

import styles from './styles.css';

const FORM_NAME = 'login';
const Header = ({ fleetName }) => (
  <h4 className={styles.header}>
    Login to <span className={styles.header__portal}>{fleetName}</span> portal</h4>
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
      <div className={styles.loginContainer}>
        <Paper>
          <Header fleetName={this.props.fleetName} />
          <Divider />
          <Form
            name={FORM_NAME}
            onSubmit={this.onSubmit}
            className={styles.loginForm}
          >
            <TextField
              fullWidth
              name="username"
              placeholder="Username"
            />
            <TextField
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
            />
            <RaisedButton
              type="submit"
              label="Sign In"
              onClick={this.onSubmit}
              primary
            />
          </Form>
        </Paper>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
  fleetName: React.PropTypes.string.isRequired,
};

const PureLoginForm = pure(LoginForm);

const mapState = (state) => ({
  fleetName: getFleetName(state),
});
const mapDispatch = {
  login: loginActions.login,
};

export default connect(mapState, mapDispatch)(PureLoginForm);
