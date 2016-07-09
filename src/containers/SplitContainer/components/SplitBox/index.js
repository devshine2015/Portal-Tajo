import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';

class SplitBox extends React.Component {

  render() {
    let aClass = styles.splitBoxFull;
    if (this.props.mySplitState !== 0) {
      aClass = (this.props.mySplitState === 1 ? styles.splitBoxZero : styles.splitBoxSplit);
    }
    return (
      <div className={aClass}>
        {this.props.content}
      </div>
    );
  }
}

SplitBox.propTypes = {
  mySplitState: React.PropTypes.number,
  content: React.PropTypes.node,
};

const PureSplitBox = pure(SplitBox);

export default PureSplitBox;
