import React from 'react';
import R from 'ramda';
import {
  readSessionFromLocalStorage,
  cleanLocalStorage,
  saveSession,
} from './authLocalStorage';
import validateSession from './validateSession';
import { login, logout, fetchProfile } from './restCalls';

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
      authorizeWithRole: this.auth.authorizeWithRole,
      authorizeWithPerms: this.auth.authorizeWithPerms,
    };
  }

  componentWillMount() {
    readSessionFromLocalStorage(this.props.storageKey)
      .then(validateSession)
      .then(({ session }) => (
        this.authenticate(session)
      ), this.unauthenticate);
  }

  unauthenticate = () => {
    this.setState({
      authenticated: false,
    }, () => {
      cleanLocalStorage(this.props.storageKey);
      this.auth.roles = [];
      this.auth.permissions = [];
      this.auth.isAuth0 = false;

      if (typeof this.props.onLogoutSuccess === 'function') {
        this.props.onLogoutSuccess();
      }
    });
  }

  authenticate = (profile, save = false) => {
    this.setState({
      authenticated: true,
    }, () => {
      // we don't need to save session for every case
      // e.g. when authenticated from localStorage
      if (save) {
        saveSession(this.props.storageKey, profile);
      }

      if (profile.id_token !== undefined) {
        this.auth.isAuth0 = true;

        if (profile.roles !== undefined) {
          this.auth.roles = profile.roles;
        }

        if (profile.permissions !== undefined) {
          this.auth.permissions = profile.permissions;
        }
      }

      if (typeof this.props.onLoginSuccess === 'function') {
        this.props.onLoginSuccess(profile);
      }
    });
  }

  isAuthenticated = () => this.state.authenticated

  login = (payload, options = {}) => (
    login(payload, options)
      .then(validateSession)
      // session contain just id_token if authenticated with auth0
      .then(({ session, hasJWT }) => {
        if (hasJWT) {
          // get additional user info with permissions and roles
          return fetchProfile(session.id_token)
            .then(profile => ({
              profile: Object.assign({}, profile, session),
            }));
        }

        return { profile: session };
      })
      // at this point we have enriched profile with data came from auth0,
      // or regular session-id came from engine.
      .then(({ profile }) => {
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

  // interface to authorization with role
  authorizeWithRole: React.PropTypes.func,

  // interface to authorization with permission(s)
  authorizeWithPerms: React.PropTypes.func,
};

export default AuthProvider;
