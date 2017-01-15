import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';

import { jrnOpen, jrnAddEntries } from 'containers/Journal/actions';
import { createJournalEntry } from 'containers/Journal/entryHelpers';
import * as journalState from 'containers/Journal/reducer';

import ToOpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import ToCloseIcon from 'material-ui/svg-icons/navigation/expand-less';
import styles from './styles.css';

class JournalToggle extends React.Component {

  toggleJournal() {
    this.props.openJournal(!this.props.isOpened);
    this.props.addEntries([createJournalEntry('toggling the journal '
      + (this.props.isOpened ? '+++>>>' : '<<<---')),
    ]);
  }
  generateBadgeContent() {
    return this.props.newCount < 9 ? this.props.newCount : '!';
  }
  render() {
    const badgeContent = this.generateBadgeContent();
    return (
      <RaisedButton
        className={styles.toggleBtn}
        backgroundColor="#84c7c1"
        label="ALERTS"
        labelPosition="before"
        labelColor="#006d63"
        children={badgeContent !== 0 && !this.props.isOpened ?
          <div className={styles.toggleBadge}>{badgeContent}</div> : null}
        icon={this.props.isOpened ? <ToCloseIcon color="#006d63" />
          : <ToOpenIcon color="#006d63" />}
        onClick={() => {this.toggleJournal();}}
      />
    );
  }
}

JournalToggle.propTypes = {
  openJournal: React.PropTypes.func.isRequired,
  addEntries: React.PropTypes.func.isRequired,
  isOpened: React.PropTypes.bool.isRequired,
  newCount: React.PropTypes.number.isRequired,
};

const mapState = (state) => ({
  isOpened: journalState.jrnIsOpened(state),
  newCount: journalState.jrnNewCount(state),
});
const mapDispatch = {
  openJournal: jrnOpen,
  addEntries: jrnAddEntries,
};

const PureJournalToggle = pure(JournalToggle);
export default connect(mapState, mapDispatch)(PureJournalToggle);
