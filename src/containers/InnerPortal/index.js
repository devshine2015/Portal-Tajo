import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import SnackbarNotification from 'containers/Snackbar';
import { getFleetName } from 'services/Session/reducer';
import ApplicationBar from './components/ApplicationBar';
import MainSidebar from './components/MainSidebar';

import styles from './styles.css';

class InnerPortal extends React.Component {

  state = {
    isSidebarOpen: false,
  };

  toggleSidebar = () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  }

  render() {
    // hide InnerPortal from unauthenticated users
    if (this.context.authenticated()) {
      return (
        <div className={styles.innerPortal}>

          <ApplicationBar
            title={this.props.fleet}
            toggleSidebar={this.toggleSidebar}
          />

          <MainSidebar
            isOpened={this.state.isSidebarOpen}
            toggleSidebar={this.toggleSidebar}
          />

          <div className={styles.content}>
            {this.props.children}
          </div>

          {/* absolutely positioned stuff */}
          <SnackbarNotification />

        </div>
      );
    }

    return null;
  }
}

InnerPortal.contextTypes = {
  authenticated: React.PropTypes.func.isRequired,
};

InnerPortal.propTypes = {
  children: React.PropTypes.node.isRequired,
  fleet: React.PropTypes.string,
};

InnerPortal.defaultProps = {
  fleet: '',
};

const PureInnerPortal = pure(InnerPortal);

const mapState = state => ({
  fleet: getFleetName(state),
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(PureInnerPortal);
