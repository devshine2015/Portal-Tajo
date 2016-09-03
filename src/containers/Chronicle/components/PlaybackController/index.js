import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';

class PlaybackCtr extends React.Component {

  render() {
    return (
      <div className={styles.containerBox}>
        controll playback
      </div>
    );
  }
}

// SplitBox.propTypes = {
//   mySplitState: React.PropTypes.number,
//   content: React.PropTypes.node,
// };

const PurePlaybackCtr = pure(PlaybackCtr);

export default PurePlaybackCtr;
