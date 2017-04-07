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
    const eventTime = (new Date(this.props.entryObj.eventTS)).toLocaleTimeString();

    return (
      <div className={styles.journalEntry}>
        <span className={styles.journalEntrySpanT}>
          {eventTime}
        </span>
        <span className={styles.journalEntrySpanIcon}>
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

Entry.propTypes = {
  // Main data to display
  entryObj: React.PropTypes.object.isRequired,
  // isNew: React.PropTypes.object.isRequired,
};

export default pure(Entry);
