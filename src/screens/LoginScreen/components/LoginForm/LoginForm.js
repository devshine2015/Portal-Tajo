import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import Form from 'components/Form';
import {
  TextField,
  Paper,
  Divider,
  RaisedButton,
} from 'material-ui';
import SimpleError from 'components/Error';
import ButtonWithProgress from 'components/ButtonWithProgress';
import { translate } from 'utils/i18n';
import {
  BASE_URL,
  setMwa,
} from 'configs';
import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const FORM_NAME = 'login';
const Header = ({ text }) => <h4 className={styles.header}>{ text }</h4>;

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: null,
      password: null,
      isLoading: false,
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    }, () => {
      if (this.props.errorType !== '') {
        this.props.resetError();
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.changeLoadingState(true);

    this.props.route.auth.traditionalLogin(this.state.username, this.state.password, this.onLoginFinish);
  }

  onGoogleLoginClick = () => {
    this.props.route.auth.authorize('google-oauth2');
  }

  onLoginFinish = (err, profile) => {
    this.changeLoadingState(false);

    if (err) {
      console.error(err);
    } else {
      this.__sideEffects(profile);
      this.context.router.replace(`${BASE_URL}/`);
    }
  }

  changeLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  /**
   * Stuff which sets some global vars, API calls etc..
   * @param {Object} profile
   */
  __sideEffects(profile) {
    const isMwaProfile = isItMwaProfile(profile);

    if (isMwaProfile) {
      setMwa(true);
      this.props.setReportsMWA();
    }

    this.props.setSession(profile)
      .then(this.props.fetchAccessTokens);
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
            <Header text={translations.login} />
            <Divider />
            <Form
              name={FORM_NAME}
              onSubmit={this.onSubmit}
              className={styles.loginForm}
            >
              <TextField
                fullWidth
                name="username"
                placeholder={translations.username}
                onChange={this.onChange}
              />
              <TextField
                fullWidth
                name="password"
                placeholder={translations.password}
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
            { this.props.errorType !== '' && <SimpleError type={this.props.errorType} />}
            <RaisedButton
              label="Login with Google"
              onClick={this.onGoogleLoginClick}
              primary
            />
          </div>
        </Paper>
        {this.props.children}
      </div>
    );
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object,
};

LoginForm.propTypes = {
  children: PropTypes.element,
  errorType: PropTypes.string,
  resetError: PropTypes.func.isRequired,
  translations: phrasesShape.isRequired,
  route: PropTypes.shape({
    auth: PropTypes.shape({
      traditionalLogin: PropTypes.func.isRequired,
      authorize: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  setReportsMWA: PropTypes.func.isRequired,
  fetchAccessTokens: PropTypes.func.isRequired,
  setSession: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  errorType: undefined,
  children: null,
};

export default translate(phrases)(LoginForm);

const isItMwaProfile = R.propEq('fleet', 'mwa');
