import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import {
  jrnIsOpened,
  jrnGetEntries,
  jrnGetLastOpenedTS,
} from 'services/AlertsSystem/reducer';
import { isAlerts } from 'configs';
import ControlBar from './ControlBar';
import Entry from './Entry';
import styles from './styles.css';

class Journal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showNewEventsOnly: true,
    };
  }

  toggleShowAll = (tgl) => {
    this.setState({ showNewEventsOnly: !tgl });
  };

  render() {
    if (!isAlerts) {
      return null;
    }

    const showFromTS = this.state.showNewEventsOnly ? this.props.lastOpenedTS : 0;
    const entriesE = this.props.entries.filter(entry => entry.eventTS > showFromTS).map((entry, idx) => (
      <Entry entryObj={entry} key={idx} />
        ));

    return (
      <div
        className={styles.journalContainer} style={ { width: this.props.isOpened ? '400px' : '0px', 
          position: this.props.isPositioned === true ? '' : 'fixed' }}
      >
        <ControlBar toggleAll={this.toggleShowAll} />
        <ul className={styles.journalList}>
          {entriesE}
        </ul>
      </div>
    );
  }
}

Journal.propTypes = {
  isOpened: React.PropTypes.bool.isRequired,
  entries: React.PropTypes.arrayOf(
    React.PropTypes.object.isRequired,
  ).isRequired,
  lastOpenedTS: React.PropTypes.number.isRequired,
  isPositioned: React.PropTypes.bool,
};

Journal.defaultProps = {
  isPositioned: false,
};

const mapState = (state) => ({
  isOpened: jrnIsOpened(state),
  entries: jrnGetEntries(state),
  lastOpenedTS: jrnGetLastOpenedTS(state),
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(pure(Journal));
