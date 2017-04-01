import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { jrnOpen, jrnAddEntries } from 'containers/Journal/actions';
import * as journalState from 'containers/Journal/reducer';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
import HistoryIcon from 'material-ui/svg-icons/action/history';
import theme from 'configs/theme';

import styles from './styles.css';

const STYLES = {
  icon: {
    width: 20,
    height: 20,
    verticalAlign: 'middle',
  },
};

class JournalBtn extends React.Component {
  toggleJournal() {
    this.props.openJournal(!this.props.isOpened);
  // this._devTestJournalEntry();
  }
  render() {
    const alertIcon = (<AlertIcon color={theme.palette.accent2Color} />);
    return (
      <button type="button"
        className={styles.amount}
        onClick={() => {this.toggleJournal();}}
      >
      {/*<HistoryIcon color={theme.palette.accent2Color} />*/}
        { this.props.newCount }
        <div className={styles.amount__icon}>
          { React.cloneElement(alertIcon, {
            style: STYLES.icon,
            className: styles.amount__svg,
          }) }
        </div>
      </button>
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
