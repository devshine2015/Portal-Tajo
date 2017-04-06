import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import * as journalState from 'containers/Journal/reducer';
import { jrnOpen, jrnAddEntries } from 'containers/Journal/actions';
import { Toggle } from 'material-ui';

import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import styles from './styles.css';

const tglStyle = {
  root: {
    marginLeft: '12px',
  },
  thumbOff: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '10%',
    transform: 'rotate(0deg)',
  },
  trackOff: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  thumbSwitched: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '10%',
    transform: 'rotate(135deg)',
  },
  trackSwitched: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
};

const JournalBar = ({
  openJournal,
  toggleAll,
}) => {
  return (
    <div className={styles.journalControlBar}>
      <div className={styles.controlsWrapper}> 
        <Toggle
          label="Show All"
          labelPosition={'right'}
          style={tglStyle.root}
          thumbStyle={tglStyle.thumbOff}
          trackStyle={tglStyle.trackOff}
          thumbSwitchedStyle={tglStyle.thumbSwitched}
          trackSwitchedStyle={tglStyle.trackSwitched}
          onToggle={(e, tgl) => toggleAll(tgl)}
        />
      </div>
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
  toggleAll: React.PropTypes.func.isRequired,
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
