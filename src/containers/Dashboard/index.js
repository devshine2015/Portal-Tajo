import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import createBaseUrl from 'utils/createBaseUrl';
import SnackbarNotification from 'containers/Snackbar';
import { getFleetName } from 'containers/App/reducer';
import styles from './styles.css';
import { getDashboardPages } from './reducer';
import MainSidebar from 'containers/MainSidebar';
import ApplicationBar from 'containers/ApplicationBar';

class Dashboard extends React.Component {

  render() {
    const baseUrl = `${createBaseUrl(this.props.fleet)}/dashboard`;

    return (
      <div className={styles.appContent}>

        <div className={styles.topBarContainer}>
          <ApplicationBar fleet={this.props.fleet} />
        </div>
        <MainSidebar baseUrl={baseUrl} />

        <div className={styles.content}>{this.props.children}</div>
        <SnackbarNotification />
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: React.PropTypes.node,
  fleet: React.PropTypes.string.isRequired,
};

const PureDashboard = pure(Dashboard);

const mapState = (state) => ({
  pages: getDashboardPages(state).toArray(),
  fleet: getFleetName(state),
});
const mapDispatch = {};

export default connect(mapState, mapDispatch)(PureDashboard);
