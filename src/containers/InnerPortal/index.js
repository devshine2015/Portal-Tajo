import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SnackbarNotification from 'containers/Snackbar';
import styles from './styles.css';
import ApplicationBar from './components/ApplicationBar';
import MainSidebar from './components/MainSidebar';
import { getIsUserAuthenticated, getFleetName } from 'containers/App/reducer';
import { authActions } from 'containers/App/actions';

const URLS = {
  success: 'dashboard',
  failure: 'login',
};

class InnerPortal extends React.Component {

  componentDidMount() {
    // console.log(this.props.fleet, nextProps.fleet);
    // if (!this.props.isAuthenticated) {
    this.props.checkUserAuthentication(URLS);
    // }
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div className={styles.appContent}>

          <div className={styles.topBarContainer}>
            <ApplicationBar />
          </div>
          <MainSidebar />
          <Link to={'/portal/test/tajo/login'}>Login</Link>
          <div className={styles.content}>{this.props.children}</div>
          <SnackbarNotification />
        </div>
      );
    }

    return null;
  }
}

InnerPortal.propTypes = {
  checkUserAuthentication: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  fleet: React.PropTypes.string.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
};

const PureInnerPortal = pure(InnerPortal);

const mapState = (state) => ({
  fleet: getFleetName(state),
  isAuthenticated: getIsUserAuthenticated(state),
});
const mapDispatch = {
  checkUserAuthentication: authActions.checkUserAuthentication,
};

export default connect(mapState, mapDispatch)(PureInnerPortal);
