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
import SimpleError from 'components/Error';
import { loginActions } from 'services/Auth/actions';
import { errorsActions } from 'services/Global/actions';
import {
  getFleetName,
  getErrorMessage,
} from 'services/Global/reducer';

import styles from './styles.css';

const FORM_NAME = 'login';
const Header = ({ fleetName }) => (
  <h4 className={styles.header}>
    Login to <span className={styles.header__portal}>{fleetName}</span> portal</h4>
);

Header.propTypes = {
  fleetName: React.PropTypes.string.isRequired,
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };
  }

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    }, () => {
      if (this.props.errorMessage !== '') {
        this.props.resetError();
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.login(this.state);
  }

  render() {
    const isDisabled = !this.state.username || !this.state.password;

    return (
      <div className={styles.loginContainer}>
        <Paper>
          <div className={styles.paper__inn}>
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
                onChange={this.onChange}
              />
              <TextField
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                onChange={this.onChange}
              />
              <RaisedButton
                disabled={isDisabled}
                type="submit"
                label="Sign In"
                onClick={this.onSubmit}
                primary
              />
            </Form>
            { this.props.errorMessage !== '' && <SimpleError message={this.props.errorMessage} />}
          </div>
        </Paper>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
  fleetName: React.PropTypes.string.isRequired,
  errorMessage: React.PropTypes.string,
  resetError: React.PropTypes.func.isRequired,
};

const PureLoginForm = pure(LoginForm);

const mapState = (state) => ({
  fleetName: getFleetName(state),
  errorMessage: getErrorMessage(state),
});
const mapDispatch = {
  login: loginActions.login,
  resetError: errorsActions.resetError,
};

export default connect(mapState, mapDispatch)(PureLoginForm);
