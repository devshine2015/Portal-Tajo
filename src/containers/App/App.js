import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CommonWrappers from './CommonWrappers';
import { theme } from 'configs';
import createInnerPortal from 'containers/InnerPortal';

import 'font-awesome/css/font-awesome.css';
import './styles.css';


const InnerPortal = props => createInnerPortal(props);


class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.route.auth;

    // case for login screen
    if (!isAuthenticated()) {
      return (
        <CommonWrappers>
          { this.props.children }
        </CommonWrappers>
      );
    }

    return (
      <CommonWrappers>
        <InnerPortal auth={this.props.route.auth}>
          { this.props.children }
        </InnerPortal>
      </CommonWrappers>
    );
  }
}

App.propTypes = {
  route: PropTypes.shape({
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default App;
