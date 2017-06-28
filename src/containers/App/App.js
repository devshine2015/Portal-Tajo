import 'font-awesome/css/font-awesome.css';

import React from 'react';
import R from 'ramda';
import pure from 'recompose/pure';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InnerPortal from 'containers/InnerPortal/ConnectedInnerPortal';
import {
  BASE_URL,
  setMwa,
  LOCAL_STORAGE_SESSION_KEY,
} from 'configs';
import drvrDevTheme from 'configs/theme';
import { TranslationProvider } from 'utils/i18n';
import { AuthProvider, auth } from 'utils/auth';
import { auth0Api } from 'utils/api';
import phrases, { locales } from 'configs/phrases';
import { journalActions } from 'services/AlertsSystem/actions';

// need this for global styling
require('./styles.css');

function screenIsProtected(routes = []) {
  const lastRoute = routes[routes.length - 1];

  // if screen don't have 'protected' property
  // consider it as protected by default
  return Object.hasOwnProperty.call(lastRoute, 'protected') ? lastRoute.protected : true;
}

function needRedirect(fromLocation) {
  return fromLocation === '/login' || fromLocation === '/mwa';
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      initialLocation: context.router.location.pathname,
      authenticationFinished: false,
    };

    this.isMwaProfile = undefined;

    setMwa(context.router.location.pathname);

    auth.onInitSuccess(this.onLoginSuccess);
  }

  componentDidMount() {
    window.addEventListener('offline', this.handleOnlineState);
    window.addEventListener('online', this.handleOnlineState);
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.handleOnlineState);
    window.removeEventListener('online', this.handleOnlineState);
    journalActions.clearNotificationsListener();
  }

  onLoginSuccess = (profile) => {
    if (this.state.authenticationFinished) return;

    this.isMwaProfile = isItMwaProfile(profile);
    setMwa(this.isMwaProfile);

    if (profile.id_token) {
      auth0Api.setIdToken(profile.id_token);
    }

    if (profile.accessTokens) {
      auth0Api.setAccessTokens(profile.accessTokens);
    }

    this._fetchData(profile);

    this.setState({
      authenticationFinished: true,
    }, () => {
      if (needRedirect(this.state.initialLocation)) {
        this.context.router.replace(`${BASE_URL}/`);
      }

      if (this.isMwaProfile) {
        this.props.setReportsMWA();
      }

      // fetch access tokens and optionally roles and permissions
      // just for those clients who are using auth0
      if (profile.id_token) {
        if (!profile.accessTokens) {
          // all customers will have access to users management system
          // so we need to get access for those apis
          this.props.fetchAccessTokens()
            .then((tokens) => {
              auth0Api.setAccessTokens(tokens);

              /**
               * fetch list of all available permissions and roles for users management
               * @todo it hasn't be here, since it's used for users management only.
               */
              this.props.fetchRolesAndPermissions(tokens);
            });
        } else {
          this.props.fetchRolesAndPermissions(profile.accessTokens);
        }
      }
    });
  }

  onLogoutSuccess = () => {
    this.props.cleanSession();
    journalActions.clearNotificationsListener();

    /**
     * @deprecated
     * soon there will not be
     * any difference between mwa and other customers anymore.
     * So login url finally be unified: '/login'
     */
    const loginUrl = this.isMwaProfile || this.state.initialLocation.search('mwa') !== -1 ? '/mwa' : '/login';

    // we need reset it
    // to support login flow
    this.setState({
      initialLocation: loginUrl,
      authenticationFinished: false,
    }, () => {
      auth0Api.clean();
      this.context.router.replace(`${BASE_URL}${loginUrl}`);
    });
  }

  _fetchData(profile) {
    this.props.saveSession(profile)
      .then(this.props.fetchFleet);
  }

  handleOnlineState = (e) => {
    this.props.changeOnlineState(e.type === 'online');
  }

  render() {
    let children = this.props.children;

    const screenProtected = screenIsProtected(this.props.routes);

    if (this.state.authenticationFinished && screenProtected) {
      children = (
        <InnerPortal>
          {children}
        </InnerPortal>
      );
    } else if (!this.state.authenticationFinished && screenProtected) {
      children = null;
    }

    return (
      <AuthProvider
        onLoginSuccess={this.onLoginSuccess}
        onLogoutSuccess={this.onLogoutSuccess}
        localStorageKey={LOCAL_STORAGE_SESSION_KEY}
      >
        <TranslationProvider
          phrases={phrases}
          locales={locales}
          locale={this.props.locale}
        >
          <MuiThemeProvider muiTheme={drvrDevTheme}>
            {children}
          </MuiThemeProvider>
        </TranslationProvider>
      </AuthProvider>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

App.propTypes = {
  locale: React.PropTypes.string,
  changeOnlineState: React.PropTypes.func.isRequired,
  saveSession: React.PropTypes.func.isRequired,
  cleanSession: React.PropTypes.func.isRequired,
  fetchFleet: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
  routes: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      protected: React.PropTypes.bool,
    }),
  ).isRequired,
  fetchAccessTokens: React.PropTypes.func.isRequired,
  fetchRolesAndPermissions: React.PropTypes.func.isRequired,
  setReportsMWA: React.PropTypes.func.isRequired,
};

App.defaultProps = {
  locale: 'en',
};

export default pure(App);

const isItMwaProfile = R.propEq('fleet', 'mwa');
