import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createBaseUrl from 'utils/createBaseUrl';
import {
  deepOrange500,
  grey300,
} from 'material-ui/styles/colors';
import {
  changeOnlineState,
  checkUserAuthentication,
  setFleet,
} from './actions';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
    disabledColor: grey300,
  },
});

class App extends React.Component {

  componentWillMount() {
    this.props.setFleet(this.props.fleet);
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
    const isOnline = e.type === 'online';

    this.props.changeOnlineState(isOnline);
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
    success: React.PropTypes.string.isRequired,
    failure: React.PropTypes.string.isRequired,
  }).isRequired,
  setFleet: React.PropTypes.func.isRequired,
};

const mapState = (state, ownProps) => {
  const base = createBaseUrl(ownProps.params.fleet);

  return {
    fleet: ownProps.params.fleet,
    urls: {
      success: `${base}/dashboard`,
      failure: `${base}/login`,
    },
  };
};
const mapDispatch = {
  changeOnlineState,
  checkUserAuthentication,
  setFleet,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);
