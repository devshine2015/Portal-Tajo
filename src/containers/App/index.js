import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import InnerPortal from 'containers/InnerPortal';
import { onlineActions } from 'services/Global/actions';
import {
  setSession,
  cleanSession,
} from 'services/Session/actions';
import { getLocale } from 'services/Session/reducer';
import { commonFleetActions } from 'services/FleetModel/actions';
import { fetchDevices } from 'services/Devices/actions';
import {
  LOCAL_STORAGE_SESSION_KEY,
  BASE_URL,
  checkSetMwa,
  isMwa,
} from 'configs';
import drvrDevTheme from 'configs/theme';
import { TranslationProvider } from 'utils/i18n';
import { AuthProvider } from 'utils/auth';
import { auth0Api } from 'utils/api';
import phrases, { locales } from 'configs/phrases';

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

const muiTheme = getMuiTheme(drvrDevTheme);

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      initialLocation: context.router.location.pathname,
    };

    checkSetMwa(context.router.location.pathname);
  }

  componentDidMount() {
    window.addEventListener('offline', this.handleOnlineState);
    window.addEventListener('online', this.handleOnlineState);
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.handleOnlineState);
    window.removeEventListener('online', this.handleOnlineState);
  }

  onLoginSuccess = session => {
    this.props.saveSession(session)
      .then(this.props.fetchFleet)
      .then(this.props.fetchDevices);

    auth0Api.setAccessToken(session.sessionId);

    if (needRedirect(this.state.initialLocation)) {
      this.context.router.replace(`${BASE_URL}/`);
    }
  }

  onLogoutSuccess = () => {
    this.props.cleanSession();

    const loginUrl = isMwa ? '/mwa' : '/login';

    // we need reset it
    // to support login flow
    this.setState({
      initialLocation: loginUrl,
    }, () => {
      auth0Api.setAccessToken();
      this.context.router.replace(`${BASE_URL}${loginUrl}`);
    });
  }

  handleOnlineState = (e) => {
    this.props.changeOnlineState(e.type === 'online');
  }

  render() {
    let children = this.props.children;

    const screenProtected = screenIsProtected(this.props.routes);

    if (screenProtected) {
      children = (
        <InnerPortal>
          {children}
        </InnerPortal>
      );
    }

    return (
      <AuthProvider
        storageKey={LOCAL_STORAGE_SESSION_KEY}
        onLoginSuccess={this.onLoginSuccess}
        onLogoutSuccess={this.onLogoutSuccess}
      >
        <TranslationProvider
          phrases={phrases}
          locales={locales}
          locale={this.props.locale || 'en'}
        >
          <MuiThemeProvider muiTheme={muiTheme}>
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
  children: React.PropTypes.node,
  routes: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      protected: React.PropTypes.bool,
    })
  ).isRequired,
};

const mapState = state => ({
  locale: getLocale(state),
});
const mapDispatch = {
  changeOnlineState: onlineActions.changeOnlineState,
  saveSession: setSession,
  cleanSession,
  fetchDevices,
  fetchFleet: commonFleetActions.fetchFleet,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);
