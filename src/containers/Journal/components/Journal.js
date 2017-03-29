import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import JournalToggle from './JournalToggle';
import Entry from './Entry';
import * as journalState from 'containers/Journal/reducer';
import { isAlerts } from 'configs';

import styles from './styles.css';

const Journal = ({
  isOpened,
  entries,
}) => {
  if (!isAlerts) {
    return null;
  }
  const entriesE = entries.map((entry, idx) => (
        <Entry entryObj={entry} key={idx} />
      ));
  return (
    <div className={styles.journalContainer}>
      <JournalToggle />
      {!isOpened ? null :
        (<ul className={styles.journalList}>
          {entriesE}
        </ul>)
      }
    </div>
  );
};

// class Journal extends React.Component {
//
//   render() {
//     if (!this.props.isOpened) {
//       return null;
//     }
//     let idx = 0;
//     const entries = this.props.entries.map(entry => (
//           <Entry entryObj={entry} key={++idx} />
//         ));
//
//     return (
//       <div className={styles.journalContainer}>
//       <ul >
//         {entries}
//       </ul>
//       </div>
//     );
//   }
// }

Journal.propTypes = {
  isOpened: React.PropTypes.bool.isRequired,
  newCount: React.PropTypes.number.isRequired,
  entries: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  isOpened: journalState.jrnIsOpened(state),
  newCount: journalState.jrnNewCount(state),
  entries: journalState.jrnGetEntries(state),
});
const mapDispatch = {
  // openFleetSocket: socketActions.openFleetSocket,
  // startLocalTick: localTickActions.startLocalTick,
};

const PureJournal = pure(Journal);
export default connect(mapState, mapDispatch)(PureJournal);
