import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { setChronicleNormalizedT } from './../../actions';
import { getNormalized100T } from './../../reducer';

class PlaybackCtr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playbackSpeed: 2,
    };
    this.animationProc = null;
  }
  isPlaying() {
    return this.animationProc !== null;
  }

  play(doPlay) {
    if (!doPlay) {
      if (this.isPlaying()) {
        window.clearInterval(this.animationProc);
      }
      this.animationProc = null;
      return;
    }
    // already playing?
    if (this.isPlaying()) {
      return;
    }
    const _this = this;
    // targeting 30fps
    this.animationProc = window.setInterval(() => {
      let t = _this.props.normalized100T + _this.state.playbackSpeed;
      if (t >= 100) {
        t = 0;
      }
      _this.props.setChronicleNormalizedT(t);
    }, 33);
  }

  render() {
    this.play(true);
    return (
      <div className={styles.containerBox}>
        controll playback
      </div>
    );
  }
}

PlaybackCtr.propTypes = {
  selectedVehicleId: React.PropTypes.string.isRequired,
  setChronicleNormalizedT: React.PropTypes.func.isRequired,
  normalized100T: React.PropTypes.number.isRequired,
};
const mapState = (state) => ({
  normalized100T: getNormalized100T(state),
});
const mapDispatch = {
  setChronicleNormalizedT,
};
const PurePlaybackCtr = pure(PlaybackCtr);
export default connect(mapState, mapDispatch)(PurePlaybackCtr);
