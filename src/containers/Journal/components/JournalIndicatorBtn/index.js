import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { FlatButton, IconButton } from 'material-ui';
import { jrnOpen, jrnAddEntries } from 'containers/Journal/actions';
import * as journalState from 'containers/Journal/reducer';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
// import HistoryIcon from 'material-ui/svg-icons/action/history';
// import HistoryIcon from 'material-ui/svg-icons/action/alarm';
import HistoryIcon from 'material-ui/svg-icons/action/view-list';
import theme from 'configs/theme';

import styles from './styles.css';

const STYLES = {
  icon: {
    width: 20,
    height: 20,
    verticalAlign: 'middle',
  },
};
const alertIcon = (<AlertIcon color={theme.palette.accent2Color} />);
const btnStyle = { border: 'solid 1px rgba(255, 255, 255, 0.3)', borderRadius: '50%',
    width: '48px', height: '48px', minWidth: '48px', overflow: 'visible', color: 'white' };

class JournalBtn extends React.Component {
  toggleJournal() {
    this.props.openJournal(!this.props.isOpened);
  // this._devTestJournalEntry();
  }
  render() {
    const hasNew = this.props.newCount > 0;
    return (
      <FlatButton type="button"
        className={styles.amount}
        style={btnStyle}
        onClick={() => {this.toggleJournal();}}
      >
        { hasNew ? this.props.newCount : <HistoryIcon color={'white'} /> }
        { hasNew && 
          <div className={styles.amount__icon}>
            { React.cloneElement(alertIcon, {
              style: STYLES.icon,
              className: styles.amount__svg,
            }) }
          </div>
        }
      </FlatButton>
    );
  }
}

JournalBtn.propTypes = {
  amount: React.PropTypes.number,
  openJournal: React.PropTypes.func.isRequired,
  // addEntries: React.PropTypes.func.isRequired,
  isOpened: React.PropTypes.bool.isRequired,
  newCount: React.PropTypes.number.isRequired,
};

const mapState = (state) => ({
  isOpened: journalState.jrnIsOpened(state),
  newCount: journalState.jrnNewCount(state),
});
const mapDispatch = {
  openJournal: jrnOpen,
  // addEntries: jrnAddEntries,
};

const PureJournalBtn = pure(JournalBtn);
export default connect(mapState, mapDispatch)(PureJournalBtn);
