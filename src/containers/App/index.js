import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createBaseUrl } from 'utils';
import styles from './styles.css';
import {
  deepOrange500,
  grey300,
} from 'material-ui/styles/colors';
import {
  fleetActions,
  authActions,
  onlineStateActions,
} from './actions';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
    disabledColor: grey300,
  },
});

class App extends React.Component {

  componentWillMount() {
    this.props.setFleetName(this.props.fleet);
  }

  componentDidMount() {
    window.addEventListener('offline', this.handleOnlineState);
    window.addEventListener('online', this.handleOnlineState);
    this.props.checkUserAuthentication(this.props.urls);
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.handleOnlineState);
    window.removeEventListener('online', this.handleOnlineState);
  }

  handleOnlineState = (e) => {
    this.props.changeOnlineState(e.type === 'online');
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

App.propTypes = {
  changeOnlineState: React.PropTypes.func.isRequired,
  checkUserAuthentication: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  fleet: React.PropTypes.string.isRequired,
  urls: React.PropTypes.shape({
    dashboard: React.PropTypes.string.isRequired,
    login: React.PropTypes.string.isRequired,
  }).isRequired,
  setFleetName: React.PropTypes.func.isRequired,
};

const mapState = (state, { params }) => {
  const base = createBaseUrl(params.fleet);

  return {
    fleet: params.fleet,
    urls: {
      dashboard: `${base}/dashboard`,
      login: `${base}/login`,
    },
  };
};
const mapDispatch = {
  changeOnlineState: onlineStateActions.changeOnlineState,
  checkUserAuthentication: authActions.checkUserAuthentication,
  setFleetName: fleetActions.setFleetName,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);
