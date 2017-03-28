import React from 'react';
import pure from 'recompose/pure';
import { textForEventType } from 'containers/Journal/entryTypes';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

import styles from './styles.css';

class Entry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  render() {
    const alertKindObj = alertKinds.getAlertByKind(this.props.entryObj.eventKind);
    return (
      <div className={styles.journalEntry}>
        <span className={styles.journalEntrySpanT}>
          {this.props.entryObj.localTime}
        </span>
        <span className={styles.journalEntrySpan}>
          {alertKindObj.icon}
        </span>
        <span className={styles.journalEntrySpanName}>
          {this.props.entryObj.ownerName}
        </span>
        <span className={styles.journalEntrySpan}>
          {this.props.entryObj.eventName}
        </span>
      </div>
    );
  }
}

        /*<span className={styles.journalEntrySpan}>
          {textForEventType(this.props.entryObj.eventName)}
        </span>*/

Entry.propTypes = {
  // Main data to display
  entryObj: React.PropTypes.object.isRequired,
};

export default pure(Entry);
