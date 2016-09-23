import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import InnerPortal from 'containers/InnerPortal';
import { onlineActions } from 'services/Global/actions';
import { localActions } from 'services/Auth/actions';
import drvrDevTheme from 'configs/theme';

// need this for global styling
require('./styles.css');

function screenIsProtected(routes = []) {
  const lastRoute = routes[routes.length - 1];

  // if screen don't have 'protected' property
  // recon it as protected by default
  return Object.hasOwnProperty.call(lastRoute, 'protected') ? lastRoute.protected : true;
}

const muiTheme = getMuiTheme(drvrDevTheme);

const URLS = {
  failure: 'login',
};

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('offline', this.handleOnlineState);
    window.addEventListener('online', this.handleOnlineState);
    this.props.checkUserAuthentication({ urls: URLS });
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.handleOnlineState);
    window.removeEventListener('online', this.handleOnlineState);
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
      <MuiThemeProvider muiTheme={muiTheme}>
        {children}
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

App.propTypes = {
  changeOnlineState: React.PropTypes.func.isRequired,
  checkUserAuthentication: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  routes: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      protected: React.PropTypes.bool,
    })
  ).isRequired,
};

const mapState = () => ({});
const mapDispatch = {
  changeOnlineState: onlineActions.changeOnlineState,
  checkUserAuthentication: localActions.checkUserAuthentication,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);
