import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import { sidebarActions } from 'containers/Dashboard/actions';
import { authActions } from 'containers/App/actions';

import styles from './styles.css';

class ApplicationBar extends React.Component {

  onLogoutClick = () => {
    this.props.logout(this.props.fleet);
  }

  render() {
    return (
      <AppBar
        title="Dashboard"
        iconElementRight={
          <FlatButton
            label="Logout"
            onClick={this.onLogoutClick}
          />
        }
        className={styles.bar}
        zDepth={0}
        onLeftIconButtonTouchTap={this.props.toggleSidebar}
      />
    );
  }
}

ApplicationBar.propTypes = {
  fleet: React.PropTypes.string.isRequired,
  logout: React.PropTypes.func.isRequired,
  toggleSidebar: React.PropTypes.func.isRequired,
};

const mapState = () => ({});
const mapDispatch = {
  toggleSidebar: sidebarActions.sidebarStateChange,
  logout: authActions.logout,
};

const PureApplicationBar = pure(ApplicationBar);

export default connect(mapState, mapDispatch)(PureApplicationBar);
