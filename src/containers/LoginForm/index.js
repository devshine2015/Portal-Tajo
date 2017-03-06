import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Form from 'components/Form';
import {
  TextField,
  Paper,
  Divider,
} from 'material-ui';
import { push } from 'react-router-redux';
import { BASE_URL } from 'configs';
import SimpleError from 'components/Error';
import ButtonWithProgress from 'components/ButtonWithProgress';
import { loginActions } from 'services/Auth/actions';
import { errorsActions } from 'services/Global/actions';
import { getErrorMessage } from 'services/Global/reducer';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const FORM_NAME = 'login';
const Header = () => <h4 className={styles.header}>Login</h4>;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      isLoading: false,
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

    const payload = {
      username: this.state.username,
      password: this.state.password,
    };

    this.changeLoadingState(true);

    this.props.login(payload).then(() => {
      this.changeLoadingState(false);

      this.props.goToRoot();
    }, () => {
      this.changeLoadingState(false);
    });
  }

  changeLoadingState = nextState => {
    this.setState({
      isLoading: nextState,
    });
  }

  render() {
    const { translations } = this.props;
    const isDisabled = !this.state.username || !this.state.password;
    const buttonText = !this.state.isLoading ? translations.signin : `${translations.signing}...`;
    const { isLoading } = this.state;

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
                placeholder={ translations.username }
                onChange={this.onChange}
              />
              <TextField
                fullWidth
                name="password"
                placeholder={ translations.password }
                type="password"
                onChange={this.onChange}
              />

              <ButtonWithProgress
                isLoading={isLoading}
                disabled={isDisabled || isLoading}
                label={buttonText}
                type="submit"
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

  translations: phrasesShape.isRequired,
};

const PureLoginForm = pure(LoginForm);

const mapState = (state) => ({
  errorMessage: getErrorMessage(state),
});
const mapDispatch = dispatch => ({
  login: data => dispatch(loginActions.login(data)),
  resetError: () => dispatch(errorsActions.resetError()),
  goToRoot: () => dispatch(push(`${BASE_URL}/`)),
});

const Connected = connect(mapState, mapDispatch)(PureLoginForm);

export default translate(phrases)(Connected);
