import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InnerPortal from 'containers/InnerPortal';
import { onlineActions } from 'services/Global/actions';
import {
  setSession,
  cleanSession,
  fetchAccessTokens,
} from 'services/Session/actions';
import { fetchRolesAndPermissions } from 'services/Users/actions';
import { getLocale } from 'services/Session/reducer';
import { commonFleetActions } from 'services/FleetModel/actions';
import { fetchDevices } from 'services/Devices/actions';
import {
  BASE_URL,
  checkSetMwa,
  isMwa,
} from 'configs';
import drvrDevTheme from 'configs/theme';
import { TranslationProvider } from 'utils/i18n';
import { AuthProvider, auth } from 'utils/auth';
import { auth0Api } from 'utils/api';
import phrases, { locales } from 'configs/phrases';
import { setReportsMWA } from 'containers/Report/actions/reportActions';
import { conditionsActions } from 'services/AlertsSystem/actions';

// need this for global styling
require('./styles.css');
import 'font-awesome/css/font-awesome.css';

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

    checkSetMwa(context.router.location.pathname);

    auth.onInitSuccess(this.onLoginSuccess);
  }

  componentDidMount() {
    window.addEventListener('offline', this.handleOnlineState);
    window.addEventListener('online', this.handleOnlineState);
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.handleOnlineState);
    window.removeEventListener('online', this.handleOnlineState);
  }

  onLoginSuccess = (profile) => {
    if (this.state.authenticationFinished) return;

    if (profile.id_token) {
      checkSetMwa(true);
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

      if (isMwa) {
        this.props.setReportsMWA();
        if (!profile.accessTokens) {
          this.props.fetchAccessTokens()
            .then(tokens => {
              auth0Api.setAccessTokens(tokens);

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

    const loginUrl = isMwa ? '/mwa' : '/login';

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
      .then(this.props.fetchFleet)
      .then(this.props.fetchAlertConditions)
      .then(this.props.fetchDevices);
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
  fetchDevices: React.PropTypes.func.isRequired,
  fetchFleet: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
  routes: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      protected: React.PropTypes.bool,
    })
  ).isRequired,
  fetchAccessTokens: React.PropTypes.func.isRequired,
  fetchRolesAndPermissions: React.PropTypes.func.isRequired,
  fetchAlertConditions: React.PropTypes.func.isRequired,
  setReportsMWA: React.PropTypes.func.isRequired,
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
  fetchDevices,
  fetchAccessTokens,
  fetchRolesAndPermissions,
  fetchFleet: commonFleetActions.fetchFleet,
  fetchAlertConditions: conditionsActions.fetchAlertConditions,
  setReportsMWA,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);
