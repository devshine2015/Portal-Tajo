import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import SplitSwitch from './components/SplitSwitch';
import SplitBox from './components/SplitBox';
import TheMap from 'containers/MapFleet/realTime';


class SplitContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      splitState: 0,
    };
    this.onSwithClick = this.switchClickCallback.bind(this);
  }

  switchClickCallback = (selectIdx) => {
    this.setState({ splitState: selectIdx });
  };

  _getSplitStateForBox = (boxIdx) => {
    if (boxIdx === 0) {
      return this.state.splitState;
    }
    if (this.state.splitState === 2) {
      return 2;
    }
    return 1 - this.state.splitState;
  };

  render() {
    return (
      <div className={styles.splitContainer}>
        <SplitSwitch clickCallback={this.onSwithClick} />
        <SplitBox
          mySplitState = {this._getSplitStateForBox(0)}
          content = {<TheMap eventDispatcher={this.props.eventDispatcher}
            gfEditMode={this.props.gfEditMode}
          />}
        />
        <SplitBox
          mySplitState = {this._getSplitStateForBox(1)}
          content = "TACTICAL VIEW  here"
        />
      </div>
    );
  }
}

SplitContainer.propTypes = {
  eventDispatcher: React.PropTypes.object.isRequired,
  gfEditMode: React.PropTypes.bool.isRequired,
};

const PureSplitContainer = pure(SplitContainer);

export default PureSplitContainer;
