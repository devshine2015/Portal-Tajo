import React from 'react';
import pure from 'recompose/pure';
import { textForEventType } from 'containers/Journal/entryTypes';

import styles from './styles.css';

class Entry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  render() {
    return (
      <div className={styles.journalEntry}>
        <span className={styles.journalEntrySpanT}>
          {this.props.entryObj.localTime}
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
