import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import * as journalState from 'containers/Journal/reducer';
import { jrnOpen, jrnAddEntries } from 'containers/Journal/actions';
import { Toggle } from 'material-ui';

import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import styles from './styles.css';

const JournalBar = ({
  openJournal,
}) => {
   const tglStyle =  {
    marginBottom: 16,
  };
  return (
    <div className={styles.journalControlBar}>
      <Toggle
        label="New"
        style={tglStyle}
      />
      <IconButton
        onClick={() => {openJournal(false);}}
        style={{ float: 'right' }}
      >
        <CloseIcon color={'white'} />
      </IconButton>
    </div>
  );
};


JournalBar.propTypes = {
  openJournal: React.PropTypes.func.isRequired,
  // isOpened: React.PropTypes.bool.isRequired,
  // newCount: React.PropTypes.number.isRequired,
  // entries: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  // isOpened: journalState.jrnIsOpened(state),
  // newCount: journalState.jrnNewCount(state),
  // entries: journalState.jrnGetEntries(state),
});
const mapDispatch = {
  openJournal: jrnOpen,
  // openFleetSocket: socketActions.openFleetSocket,
  // startLocalTick: localTickActions.startLocalTick,
};

const jp = pure(JournalBar);
export default connect(mapState, mapDispatch)(jp);
