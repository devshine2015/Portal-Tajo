import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import * as journalState from 'containers/Journal/reducer';

import styles from './styles.css';

class Journal extends React.Component {

  render() {
    if (!this.props.isOpened) {
      return null;
    }
    return (
      <div className={styles.logContainer}>
      </div>
    );
  }
}

Journal.propTypes = {
  isOpened: React.PropTypes.bool.isRequired,
  newCount: React.PropTypes.number.isRequired,
};

const mapState = (state) => ({
  isOpened: journalState.jrIsOpened(state),
  newCount: journalState.jrNewCount(state),
});
const mapDispatch = {
  // openFleetSocket: socketActions.openFleetSocket,
  // startLocalTick: localTickActions.startLocalTick,
};

const PureJournal = pure(Journal);
export default connect(mapState, mapDispatch)(PureJournal);
