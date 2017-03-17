import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
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
} from 'configs';
import drvrDevTheme from 'configs/theme';
import { TranslationProvider } from 'utils/i18n';
import { AuthProvider } from 'utils/auth';
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

const muiTheme = getMuiTheme(drvrDevTheme);

class App extends React.Component {

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

    this.props.replace(`${BASE_URL}/`);
  }

  onLogoutSuccess = () => {
    this.props.cleanSession();

    this.props.replace(`${BASE_URL}/login`);
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
  replace: React.PropTypes.func.isRequired,
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
  replace,
  fetchDevices,
  fetchFleet: commonFleetActions.fetchFleet,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);
