import React from 'react';
import pure from 'recompose/pure';
import { Toggle } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { connect } from 'react-redux';
import { journalActions } from 'services/AlertsSystem/actions';
import styles from './styles.css';

const tglStyle = {
  root: {
    marginLeft: '12px',
  },
  lbl: {
    color: 'white',
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
}) => (
  <div className={styles.journalControlBar}>
    <div className={styles.controlsWrapper}>
      <Toggle
        label="Show All"
        labelPosition={'right'}
        style={tglStyle.root}
        labelStyle={tglStyle.lbl}
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


JournalBar.propTypes = {
  openJournal: React.PropTypes.func.isRequired,
  toggleAll: React.PropTypes.func.isRequired,
};

const mapState = null;
const mapDispatch = {
  openJournal: journalActions.jrnOpen,
};

const jp = pure(JournalBar);
export default connect(mapState, mapDispatch)(jp);
