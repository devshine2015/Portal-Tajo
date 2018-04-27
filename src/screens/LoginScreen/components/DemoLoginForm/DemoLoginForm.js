import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stylePropTypes from 'react-style-proptype'; // eslint-disable-line import/no-extraneous-dependencies
import R from 'ramda';
import { Paper } from 'material-ui';
import drvrStorage from 'utils/drvrStorage';
import {
  DRVR_PROFILE_LAST_KEY,
  isFeatureSupported,
} from 'configs';
import SimpleError from 'components/Error';
import LoginButton from './DemoLoginButton';
import styles from './styles.css';

const STYLES = {
  paper: {
    backgroundColor: '#fafafa',
    borderRadius: 0,
    boxShadow: '0 60px 60px 0 rgba(0, 0, 0, 0.15)',
  },
  wrapper: {
    marginTop: 26,
  },
};

// const DEFAULT_WIDTH = 400;
const DEFAULT_WIDTH = 968;
const getPicture = R.ifElse(R.isNil, R.always(null), R.ifElse(R.has('picture'), R.prop('picture'), R.always(null)));
const getEmail = R.ifElse(R.isNil, R.always(''), R.ifElse(R.has('email'), R.prop('email'), R.always('')));
const notNil = R.compose(R.not, R.isNil);
const notEmpty = R.compose(R.not, R.isEmpty);
const canRestorePassword = isFeatureSupported('restorePassword');

class DemoLoginForm extends Component {
  constructor(props) {
    super(props);

    this.emailRef = null;
    this.passRef = null;
    this.state = {
      password: '',
      email: '',
      isLoading: false,
      profile: null,
    };
  }

  async componentWillMount() {
    try {
      const prevProfile = await drvrStorage.load(DRVR_PROFILE_LAST_KEY);

      this.setState({
        profile: prevProfile,
        showProfile: notEmpty(prevProfile),
        email: getEmail(prevProfile),
      });
      this.focusOn(this.passRef);
    } catch (err) {
      if (err.name.toLowerCase() === 'notfounderror') {
        // do nothing if no previous profile has been found
        // except focusing on appropriate node
        this.focusOn(this.emailRef);
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.changeLoadingState(true);

    this.props.route.auth.traditionalLogin(this.state.email, this.state.password)
      .then(() => ({}), () => {
        this.changeLoadingState(false);
      });
  }

  onType = (e) => {
    const { name, value } = e.target;
    const { errorType, resetError } = this.props;

    if (notEmpty(errorType)) resetError();

    this.setState({
      [name]: value,
    });
  }

  onGoogleLoginClick = () => {
    this.props.route.auth.authorize('google-oauth2');
  }

  changeLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  hideProfile = () => {
    this.setState({
      showProfile: false,
      profile: null,
      email: '',
    });
    // now we can remove previous profile
    drvrStorage.remove(DRVR_PROFILE_LAST_KEY);
    this.focusOnEmail();
  }

  saveRef = propName => (node) => {
    if (node) {
      this[propName] = node;
    }
  }

  focusOn = (node) => {
    node.focus();
  }

  focusOnEmail() {
    this.emailRef.focus();
  }

  renderError() {
    const { errorType } = this.props;

    if (notNil(errorType)) {
      return (
        <div className={styles.error}>
          <SimpleError
            type={this.props.errorType}
            color="red"
          />
        </div>
      );
    }

    return null;
  }

  render() {
    const showProfile = this.state.showProfile; // notNil(this.state.profile);

    return (
      <div
        className={styles.loginFormWrapper}
      >
        <Paper
          zDepth={2}
          style={STYLES.paper}
        >
          <form
            className={styles.inn}
            onSubmit={this.onSubmit}
          >
            <h2 className={styles.title}>Login</h2>
            <input
              autoComplete="off"
              className={styles.formInput}
              name="email"
              placeholder="Email"
              type="text"
              ref={this.saveRef('emailRef')}
              value={this.state.email}
              onChange={this.onType}
            />
            <input
              autoComplete="off"
              className={styles.formInput}
              name="password"
              placeholder="Password"
              ref={this.saveRef('passRef')}
              type="password"
              onChange={this.onType}
            />
            <label className={styles.radioLabel}>
              <input type="checkbox" name="stay-logged" value="stay" />
              <span className={styles.checkmark}></span>
              Stay Logged In
            </label>
            <LoginButton
              onClick={this.onSubmit}
              isLoading={this.state.isLoading}
              // isLoading={false}
            />
            { this.renderError() }
          </form>
        </Paper>
      </div>
    );
  }
}

DemoLoginForm.propTypes = {
  children: PropTypes.element,
  errorType: PropTypes.string,
  resetError: PropTypes.func.isRequired,
  route: PropTypes.shape({
    auth: PropTypes.shape({
      traditionalLogin: PropTypes.func.isRequired,
      authorize: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  innerStyles: stylePropTypes,
};

DemoLoginForm.defaultProps = {
  errorType: undefined,
  children: null,
  innerStyles: undefined,
};

export default DemoLoginForm;
