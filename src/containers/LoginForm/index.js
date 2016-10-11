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
import { push } from 'react-router-redux';
import SimpleError from 'components/Error';
import { loginActions } from 'services/Auth/actions';
import { errorsActions } from 'services/Global/actions';
import { getErrorMessage } from 'services/Global/reducer';

import styles from './styles.css';

const FORM_NAME = 'login';
const Header = () => <h4 className={styles.header}>Login</h4>;

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

    this.props.login(this.state).then(() => {
      this.props.goToRoot();
    });
  }

  render() {
    const isDisabled = !this.state.username || !this.state.password;

    return (
      <div className={styles.loginContainer}>
        <Paper>
          <div className={styles.paper__inn}>
            <Header />
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
  errorMessage: React.PropTypes.string,
  resetError: React.PropTypes.func.isRequired,
  goToRoot: React.PropTypes.func.isRequired,
};

const PureLoginForm = pure(LoginForm);

const mapState = (state) => ({
  errorMessage: getErrorMessage(state),
});
const mapDispatch = dispatch => ({
  login: data => dispatch(loginActions.login(data)),
  resetError: errorsActions.resetError,
  goToRoot: () => dispatch(push('/')),
});

export default connect(mapState, mapDispatch)(PureLoginForm);
