import 'font-awesome/css/font-awesome.css';

import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InnerPortal from 'containers/InnerPortal/ConnectedInnerPortal';
import { onlineActions } from 'services/Global/actions';
import {
  setSession,
  cleanSession,
  fetchAccessTokens,
} from 'services/Session/actions';
import { fetchRolesAndPermissions } from 'services/Users/actions';
import { getLocale } from 'services/Session/reducer';
import { commonFleetActions } from 'services/FleetModel/actions';
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
import { setReportsMWA } from 'containers/Report/actions/reportActions';
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
               * but only for mwa we have to keep asking
               * for user permissions and role with extra call
               * this must be @deprecated since there will not be
               * any difference between mwa and other customers anymore.
               *
               * With new login system permissions and roles already in profile
               */
              if (this.isMwaProfile) {
                this.props.fetchRolesAndPermissions(tokens);
              }
            });
        } else if (this.isMwaProfile) {
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
  router: PropTypes.object,
};

App.propTypes = {
  locale: PropTypes.string,
  changeOnlineState: PropTypes.func.isRequired,
  saveSession: PropTypes.func.isRequired,
  cleanSession: PropTypes.func.isRequired,
  fetchFleet: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      protected: PropTypes.bool,
    }),
  ).isRequired,
  fetchAccessTokens: PropTypes.func.isRequired,
  fetchRolesAndPermissions: PropTypes.func.isRequired,
  setReportsMWA: PropTypes.func.isRequired,
};

App.defaultProps = {
  locale: 'en',
};

const mapState = state => ({
  locale: getLocale(state),
});
const mapDispatch = {
  changeOnlineState: onlineActions.changeOnlineState,
  saveSession: setSession,
  cleanSession,
  fetchAccessTokens,
  fetchRolesAndPermissions,
  fetchFleet: commonFleetActions.fetchFleet,
  setReportsMWA,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);

const isItMwaProfile = R.propEq('fleet', 'mwa');
