import React from 'react';
import {
  readSessionFromLocalStorage,
  cleanLocalStorage,
  saveSession,
} from './authLocalStorage';
import validateSession from './validateSession';
import { login, logout } from './restCalls';

class AuthProvider extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      authenticated: false,
    };
  }

  getChildContext() {
    return {
      login: this.login,
      logout: this.logout,
      authenticated: this.isAuthenticated,
    };
  }

  componentWillMount() {
    readSessionFromLocalStorage(this.props.storageKey)
      .then(validateSession)
      .then(session => (
        this.authenticate(session)
      ), this.unauthenticate);
  }

  isAuthenticated = () => this.state.authenticated

  authenticate = session => {
    this.setState({
      authenticated: true,
    }, () => {
      saveSession(this.props.storageKey, session);

      if (typeof this.props.onLoginSuccess === 'function') {
        this.props.onLoginSuccess(session);
      }
    });
  }

  unauthenticate = () => {
    this.setState({
      authenticated: false,
    }, () => {
      cleanLocalStorage(this.props.storageKey);

      if (typeof this.props.onLogoutSuccess === 'function') {
        this.props.onLogoutSuccess();
      }
    });
  }

  login = (payload, options = {}) => (
    login(payload, options)
      .then(validateSession)
      .then(profile => {
        this.authenticate(profile);

        return profile;
      })
  )

  logout = (options = {}) => (
    logout(options)
      .then(this.unauthenticate())
  )

  render() {
    return this.props.children;
  }
}

AuthProvider.propTypes = {
  children: React.PropTypes.any.isRequired,
  storageKey: React.PropTypes.string.isRequired,
  onLoginSuccess: React.PropTypes.func,
  onLogoutSuccess: React.PropTypes.func,
};

AuthProvider.childContextTypes = {
  // translator: React.PropTypes.object,
  // call it when u need to login
  // take a callback, send token as a parameter
  // callback will override onLoginSuccess if it provided
  login: React.PropTypes.func,
  // call it when u need to logout
  // callback will override onLogoutSuccess if it provided
  logout: React.PropTypes.func,

  authenticated: React.PropTypes.func,
};

export default AuthProvider;
