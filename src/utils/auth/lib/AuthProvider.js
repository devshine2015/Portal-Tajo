import React from 'react';
import {
  readSessionFromLocalStorage,
  cleanLocalStorage,
  saveSession,
} from './authLocalStorage';
import validateSession from './validateSession';
import { login, logout } from './restCalls';

// class Authenticator {
//   constructor() {

//   }
// }

class AuthProvider extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.authenticator = new Authenticator(props);
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
    // if !this.noAthenticated
    readSessionFromLocalStorage(this.props.storageKey)
      .then(validateSession)
      .then(session => (
        this.authenticate(session)
      ), this.unauthenticate);
  }

  isAuthenticated = () => this.state.authenticated

  authenticate = session => {
    console.warn('authenticating');

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
    console.warn('unauthenticating');

    this.setState({
      authenticated: false,
    }, () => {
      cleanLocalStorage(this.props.storageKey);

      if (typeof this.props.onLogoutSuccess === 'function') {
        this.props.onLogoutSuccess();
      }
    });
  }

  login = payload => (
    login(payload)
      .then(validateSession)
      .then(profile => {
        this.authenticate(profile);

        return profile;
      })
  )

  logout = () => (
    logout()
      .then(this.unauthenticate())

    // if (typeof cb === 'function') {
    //   cb();
    // } else if (typeof this.props.onLogoutSuccess === 'function') {
    //   this.props.onLogoutSuccess();
    // }
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
  // onFail: React.PropTypes.func,
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
