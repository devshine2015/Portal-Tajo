import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Form from 'components/Form';
import {
  TextField,
  Paper,
  Divider,
} from 'material-ui';
import SimpleError from 'components/Error';
import ButtonWithProgress from 'components/ButtonWithProgress';
import { errorsActions } from 'services/Global/actions';
import { getErrorType } from 'services/Global/reducer';
import { translate } from 'utils/i18n';
import { isMwa } from 'configs';
import endpoints from 'configs/endpoints';

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

  onChange = e => {
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

    const payload = {
      username: this.state.username,
      password: this.state.password,
    };

    this.changeLoadingState(true);

    const loginDescriptor = isMwa ? endpoints.loginAuth0 : endpoints.login;

    this.context.login(payload, loginDescriptor).then(null, err => {
      if (err) console.error(err);

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
            { this.props.errorType !== '' && <SimpleError type={this.props.errorType} />}
          </div>
        </Paper>
      </div>
    );
  }
}

LoginForm.contextTypes = {
  login: PropTypes.func.isRequired,
};

LoginForm.propTypes = {
  // login: React.PropTypes.func.isRequired,
  errorType: PropTypes.string,
  resetError: PropTypes.func.isRequired,
  // goToRoot: React.PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};

LoginForm.defaultProps = {
  errorType: undefined,
};

const PureLoginForm = pure(LoginForm);

const mapState = (state) => ({
  errorType: getErrorType(state),
});
const mapDispatch = dispatch => ({
  // login: data => dispatch(loginActions.login(data)),
  resetError: () => dispatch(errorsActions.resetError()),
  // goToRoot: () => dispatch(push(`${BASE_URL}/`)),
});

const Connected = connect(mapState, mapDispatch)(PureLoginForm);

export default translate(phrases)(Connected);
