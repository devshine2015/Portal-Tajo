import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  deepOrange500,
  grey300,
} from 'material-ui/styles/colors';
import {
  authActions,
  onlineStateActions,
} from './actions';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
    disabledColor: grey300,
  },
});

const URLS = {
  success: 'dashboard',
  failure: 'login',
};

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('offline', this.handleOnlineState);
    window.addEventListener('online', this.handleOnlineState);
    this.props.checkUserAuthentication(URLS);
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
};

const mapState = () => ({});
const mapDispatch = {
  changeOnlineState: onlineStateActions.changeOnlineState,
  checkUserAuthentication: authActions.checkUserAuthentication,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);
