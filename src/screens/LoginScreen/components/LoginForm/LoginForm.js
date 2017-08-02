import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/Form';
import {
  TextField,
  Paper,
  Divider,
} from 'material-ui';
import SimpleError from 'components/Error';
import ButtonWithProgress from 'components/ButtonWithProgress';
import { translate } from 'utils/i18n';

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

    this.props.route.auth.traditionalLogin(this.state.username, this.state.password)
      .then(() => {
        this.props.router.replace('/');
      }, (err) => {
        if (err) console.error(err);

        this.changeLoadingState(false);
      });
  }

  changeLoadingState = (nextState) => {
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
          </div>
        </Paper>
      </div>
    );
  }
}

LoginForm.propTypes = {
  errorType: PropTypes.string,
  resetError: PropTypes.func.isRequired,
  translations: phrasesShape.isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    auth: PropTypes.shape({
      traditionalLogin: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

LoginForm.defaultProps = {
  errorType: undefined,
};

export default translate(phrases)(LoginForm);
