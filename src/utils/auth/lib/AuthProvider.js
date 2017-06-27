import React from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import {
  readSessionFromLocalStorage,
  cleanLocalStorage,
  saveSession,
} from './authLocalStorage';
import validateSession from './validateSession';
import {
  login,
  logout,
  enrichProfileWithAuth0,
} from './restCalls';

class Auth {
  constructor() {
    this.roles = [];
    this.permissions = [];

    // flag, indicating if authorization is needed
    this.isAuth0 = false;

    this.initialAuthenticationComplete = false;

    // read session data from local storage asap
    // this.init();

    this.onInitSuccessSubs = [];
    this.onInitFailSubs = [];
  }

  init() {
    readSessionFromLocalStorage(LOCAL_STORAGE_SESSION_KEY)
      .then(validateSession)
      .then(this._initSuccess, this._initFail);
  }

  _initSuccess = ({ session }) => {
    this.takeProfileAuthData(session);
    this.onInitSuccessSubs.forEach(cb => cb(session));
  }

  _initFail = error => {
    console.warn(error);
    this.cleanAuthData();
    this.onInitFailSubs.forEach(cb => cb());
  }

  getRoles() {
    // uncomment next line when backend will work with permissons and roles
    // if (!this.isAuth0) return true;

    return this.roles;
  }

  getPermissions() {
    // uncomment next line when backend will work with permissons and roles
    // if (!this.isAuth0) return true;

    return this.permissions;
  }

  _chekPermission(permission) {
    return this.permissions.indexOf(permission) !== -1;
  }

  authorizeWithPerms = (perms = []) => {
    if (typeof perms === 'string') {
      return this._chekPermission(perms);
    }

    if (perms.length === 1) {
      return this._chekPermission(perms[0]);
    }

    const result = {};

    perms.forEach(p => {
      result[p] = this._chekPermission(p);
    });

    return result;
  }

  authorizeWithRole = (askedRole = '') => {
    const findRole = role => R.toLower(role) === R.toLower(askedRole);
    const filterRoles = roles => R.filter(findRole, roles);
    const isAuthorized = () => filterRoles(this.roles).length === 1;

    return isAuthorized();
  }

  takeProfileAuthData = (profile) => {
    this.initialAuthenticationComplete = true;

    if (profile.id_token !== undefined) {
      this.isAuth0 = true;

      if (profile.roles !== undefined) {
        this.roles = profile.roles;
      }

      if (profile.permissions !== undefined) {
        this.permissions = profile.permissions;
      }
    }
  }

  cleanAuthData() {
    this.roles = [];
    this.permissions = [];
    this.isAuth0 = false;
    this.initialAuthenticationComplete = false;
  }

  onInitSuccess = cb => this.onInitSuccessSubs.push(cb);
  onInitFail = cb => this.onInitFailSubs.push(cb);
}

/**
 *
 * same instance of Auth as used in AuthProvider
 * can be used outside of react components
 *
 **/
export const auth = new Auth();

class AuthProvider extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.auth = auth;
    this.auth.onInitSuccess(this.authenticate);
    this.auth.onInitFail(this.unauthenticate);

    auth.init();
  }

  getChildContext() {
    return {
      login: this.login,
      logout: this.logout,
      authenticated: this.isAuthenticated,
      permissions: this.auth.permissions,
      roles: this.auth.roles,
      authorizeWithRole: this.auth.authorizeWithRole,
      authorizeWithPerms: this.auth.authorizeWithPerms,
    };
  }

  unauthenticate = () => {
    cleanLocalStorage(LOCAL_STORAGE_SESSION_KEY);

    if (typeof this.props.onLogoutSuccess === 'function') {
      this.props.onLogoutSuccess();
    }
  }

  authenticate = (profile, save = false) => {
    // we don't need to save session for every case
    // e.g. when authenticated from localStorage
    if (save) {
      saveSession(LOCAL_STORAGE_SESSION_KEY, profile);
    }

    if (typeof this.props.onLoginSuccess === 'function') {
      this.props.onLoginSuccess(profile);
    }
  }

  isAuthenticated = () => this.auth.initialAuthenticationComplete

  login = (payload, options = {}) => (
    login(payload, options)
      .then(validateSession)
      // session contain just id_token if authenticated with auth0
      .then(enrichProfileWithAuth0)
      // at this point we have enriched profile with data came from auth0,
      // or regular sessionId came from engine.
      .then((profile) => {
        this.auth.takeProfileAuthData(profile);

        return Promise.resolve(profile);
      })
      .then((profile) => {
        // true - session must been saved after login
        this.authenticate(profile, true);

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
  children: PropTypes.any.isRequired,
  onLoginSuccess: PropTypes.func,
  onLogoutSuccess: PropTypes.func,
};

AuthProvider.childContextTypes = {
  // translator: React.PropTypes.object,
  // call it when u need to login
  // take a callback, send token as a parameter
  // callback will override onLoginSuccess if it provided
  login: PropTypes.func,
  // call it when u need to logout
  // callback will override onLogoutSuccess if it provided
  logout: PropTypes.func,

  authenticated: PropTypes.func,

  // get roles list for current session.
  roles: PropTypes.array,

  // get permissions list for current session.
  permissions: PropTypes.array,

  // interface to authorization with role
  authorizeWithRole: PropTypes.func,

  // interface to authorization with permission(s)
  authorizeWithPerms: PropTypes.func,
};

export default AuthProvider;
