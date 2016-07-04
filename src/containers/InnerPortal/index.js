import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import SnackbarNotification from 'containers/Snackbar';
import styles from './styles.css';
import ApplicationBar from './components/ApplicationBar';
import MainSidebar from './components/MainSidebar';

const InnerPortal = ({
  children,
}) => (
  <div className={styles.appContent}>

    <div className={styles.topBarContainer}>
      <ApplicationBar />
    </div>
    <MainSidebar />

    <div className={styles.content}>{children}</div>
    <SnackbarNotification />
  </div>
);

InnerPortal.propTypes = {
  children: React.PropTypes.node,
};

const PureInnerPortal = pure(InnerPortal);

const mapState = () => ({});
const mapDispatch = {};

export default connect(mapState, mapDispatch)(PureInnerPortal);
