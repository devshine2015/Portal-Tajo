import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { setChronicleNormalizedT } from './../../actions';
import { getNormalized100T } from './../../reducer';

import IconButton from 'material-ui/IconButton';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import FFwdIcon from 'material-ui/svg-icons/av/fast-forward';
// import FFwdIcon from 'material-ui/svg-icons/av/fast-forward';

import { red900, red500, teal100, teal200, yellow700, yellow500 } from 'material-ui/styles/colors';

class PlaybackCtr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playbackSpeed: 0.5,
      isPlaying: false,
    };
    this.animationProc = null;
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentWillUnmount() {
    this.play(false);
  }

  isPlaying() {
    return this.state.isPlaying; // this.animationProc !== null;
  }

  play(doPlay) {
    if (!doPlay) {
      if (this.isPlaying()) {
        window.clearInterval(this.animationProc);
      }
      this.animationProc = null;
      this.setState({
        isPlaying: false,
      });
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
    this.setState({
      isPlaying: true,
    });
  }

  togglePlay() {
    this.play(!this.isPlaying());
  }

  render() {
    return (
      <div className={styles.containerBox}>
        <IconButton
          tooltip="Play"
          onClick={this.togglePlay}
          key="toggleBnt"
        >
        {this.isPlaying() ?
           <PauseIcon color={teal200} hoverColor={teal100} />
           : <PlayIcon color={teal200} hoverColor={teal100} />
         }
         </IconButton>
         <IconButton
           tooltip="Edit"
           onClick={this.togglePlay}
           key="editBnt"
         >
            <FFwdIcon color={teal200} hoverColor={teal100} />
          </IconButton>
      </div>
    );
  }
}

PlaybackCtr.propTypes = {
  selectedVehicleId: React.PropTypes.string,
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
