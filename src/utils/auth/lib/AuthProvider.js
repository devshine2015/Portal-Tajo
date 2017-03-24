import React from 'react';
import {
  readSessionFromLocalStorage,
  cleanLocalStorage,
  saveSession,
} from './authLocalStorage';
import validateSession from './validateSession';
import { takeProfile } from './tokenHelpers';
import { login, logout } from './restCalls';

const permissions = [
  'view:dashboard',
  'view:fleet',
  'view:location',
  'edit:location',
  'delete:location',
  'view:vehicle',
  'edit:vehicle',
  'add:user',
  'edit:user',
  'view:users_manager',
];
const roles = [
  'Admin',
];

class Auth {
  constructor() {
    this.roles = [];
    this.permissions = [];

    // flag, indicating if authorization is needed
    this.isAuth0 = false;
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

  authorize = (perms = []) => {
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

    this.state = {
      authenticated: false,
    };
  }

  getChildContext() {
    return {
      login: this.login,
      logout: this.logout,
      authenticated: this.isAuthenticated,
      permissions: this.auth.permissions,
      roles: this.auth.roles,
    };
  }

  componentWillMount() {
    readSessionFromLocalStorage(this.props.storageKey)
      .then(validateSession)
      .then(({ session, hasJWT }) => (
        this.authenticate(session, hasJWT)
      ), this.unauthenticate);
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

  authenticate = (session, hasJWT, save = false) => {
    this.setState({
      authenticated: true,
    }, () => {
      // we don't need to save session for every case
      // e.g. when authenticated from localStorage
      if (save) {
        saveSession(this.props.storageKey, session);
      }

      if (hasJWT) {
        this.auth.isAuth0 = true;
      }

      this.auth.roles = roles;
      this.auth.permissions = permissions;

      if (typeof this.props.onLoginSuccess === 'function') {
        let profile = takeProfile(session);

        // don't enrich profile of non-auth0 users
        if (hasJWT) {
          profile = Object.assign({}, profile, {
            roles,
            permissions,
          });
        }

        this.props.onLoginSuccess(profile, session.id_token);
      }
    });
  }

  isAuthenticated = () => this.state.authenticated

  login = (payload, options = {}) => (
    login(payload, options)
      .then(validateSession)
      .then(({ session, hasJWT }) => {
        // true - session must been saved after login
        this.authenticate(session, hasJWT, true);

        return session;
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

  // get roles list for current session.
  roles: React.PropTypes.array,

  // get permissions list for current session.
  permissions: React.PropTypes.array,
};

export default AuthProvider;
