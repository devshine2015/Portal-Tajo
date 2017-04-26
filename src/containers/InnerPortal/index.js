import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import SnackbarNotification from 'containers/Snackbar';
import ApplicationBar from './components/ApplicationBar';
import MainSidebar from './components/MainSidebar';
import { getFleetName } from 'services/Session/reducer';
import Journal from 'containers/Journal/components/Journal';

import styles from './styles.css';

class InnerPortal extends React.Component {

  render() {
    // hide InnerPortal from unauthenticated users
    if (this.context.authenticated()) {
      return (
        <div className={styles.innerPortal}>

          <ApplicationBar title={this.props.fleet} />
          <Journal />
          <MainSidebar />

          <div className={styles.content}>
            {this.props.children}
          </div>

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
  showPortalsList: React.PropTypes.bool,
};

const PureInnerPortal = pure(InnerPortal);

const mapState = (state) => ({
  fleet: getFleetName(state),
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(PureInnerPortal);
