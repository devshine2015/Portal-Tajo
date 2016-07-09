import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import SplitSwitch from './components/SplitSwitch';
import SplitBox from './components/SplitBox';
import TheMap from 'components/Map';


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

  _getSplitStateForBox = function (boxIdx) {
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
          content = {<TheMap />}
        />
        <SplitBox
          mySplitState = {this._getSplitStateForBox(1)}
          content = "TACTICAL VIEW  here"
        />
      </div>
    );
  }
}

const PureSplitContainer = pure(SplitContainer);

export default PureSplitContainer;
