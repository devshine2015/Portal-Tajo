import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { FlatButton } from 'material-ui';

import { jrOpen } from 'containers/Journal/actions';
import * as journalState from 'containers/Journal/reducer';

// import styles from './styles.css';

class JournalToggle extends React.Component {

  toggleJournal() {
    this.props.openJournal(!this.props.isOpened);
  }

  render() {
    return (
      <FlatButton
        label={this.props.isOpened ? 'closeJ' : 'openJ'}
        onClick={() => {this.toggleJournal();}}
      />
    );
  }
}

JournalToggle.propTypes = {
  openJournal: React.PropTypes.func.isRequired,
  isOpened: React.PropTypes.bool.isRequired,
  newCount: React.PropTypes.number.isRequired,
};

const mapState = (state) => ({
  isOpened: journalState.jrIsOpened(state),
  newCount: journalState.jrNewCount(state),
});
const mapDispatch = {
  openJournal: jrOpen,
};

const PureJournalToggle = pure(JournalToggle);
export default connect(mapState, mapDispatch)(PureJournalToggle);
