import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import createBaseUrl from 'utils/createBaseUrl';
import SnackbarNotification from 'containers/Snackbar';
import { getFleetName } from 'containers/App/reducer';
import styles from './styles.css';
import MainSidebar from 'containers/MainSidebar';
import ApplicationBar from 'containers/ApplicationBar';

const Dashboard = ({
  fleet,
  children,
}) => {
  const baseUrl = `${createBaseUrl(fleet)}/dashboard`;

  return (
    <div className={styles.appContent}>

      <div className={styles.topBarContainer}>
        <ApplicationBar />
      </div>
      <MainSidebar baseUrl={baseUrl} />

      <div className={styles.content}>{children}</div>
      <SnackbarNotification />
    </div>
  );
};

Dashboard.propTypes = {
  children: React.PropTypes.node,
  fleet: React.PropTypes.string.isRequired,
};

const PureDashboard = pure(Dashboard);

const mapState = (state) => ({
  fleet: getFleetName(state),
});
const mapDispatch = {};

export default connect(mapState, mapDispatch)(PureDashboard);
