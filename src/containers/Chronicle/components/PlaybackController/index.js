import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { setChronicleNormalizedT } from './../../actions';
import { getNormalized100T } from './../../reducer';

import IconButton from 'material-ui/IconButton';
import PlayIcon1 from 'material-ui/svg-icons/av/play-arrow';
import PlayIcon2 from 'material-ui/svg-icons/av/forward-5';
import PlayIcon3 from 'material-ui/svg-icons/av/forward-10';
import PlayIcon4 from 'material-ui/svg-icons/av/forward-30';
import PauseIcon from 'material-ui/svg-icons/av/pause';
// import FFwdIcon from 'material-ui/svg-icons/av/fast-forward';
// import FFwdIcon from 'material-ui/svg-icons/av/fast-forward';

import { red900, red500, teal100, teal400, yellow700, yellow500 } from 'material-ui/styles/colors';

class PlaybackCtr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playbackSpeedEnum: 0,
      isPlaying: false,
    };
    this.playbackSpeed = 0;
    this.animationProc = null;
  }

  componentWillUnmount() {
    this.play(false);
  }

  isPlaying() {
    return this.state.isPlaying; // this.animationProc !== null;
  }

  play(doPlay) {
    if (doPlay === this.isPlaying()) {
      return;
    }
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
      let t = _this.props.normalized100T + _this.playbackSpeed;
      if (t >= 100) {
        t = 0;
      }
      _this.props.setChronicleNormalizedT(t);
    }, 33);
    this.setState({
      isPlaying: true,
    });
  }

  getBtnColor(btnIdx) {
    return this.state.playbackSpeedEnum === btnIdx ? yellow500 : teal100;
  }
  getBtnHoverColor(btnIdx) {
    return this.state.playbackSpeedEnum === btnIdx ? yellow700 : teal400;
  }

  playSpeed(speed) {
    this.setState({
      playbackSpeedEnum: speed,
    });
    if (speed === 0) {
      this.play(false);
      return;
    }
    this.play(true);
    switch (speed) {
      case 1:
        this.playbackSpeed = 0.2;
        break;
      case 2:
        this.playbackSpeed = 0.4;
        break;
      case 3:
        this.playbackSpeed = 0.75;
        break;
      case 4:
        this.playbackSpeed = 1;
        break;
      default:
        this.playbackSpeed = 0;
        break;
    }
  }

  render() {
    return (
      <div className={styles.containerBox}>
        <div style={{ width: '48px', height: '48px', backgroundColor: 'red' }}>
        </div>
        <IconButton
          tooltip="pause"
          onClick={() => (this.playSpeed(0))}
          key="pauseBtn"
        >
           <PauseIcon color={this.getBtnColor(0)} hoverColor={this.getBtnHoverColor(0)} />
         </IconButton>
       <IconButton
         tooltip="play"
         onClick={() => (this.playSpeed(1))}
         key="playBtn"
       >
          <PlayIcon1 color={this.getBtnColor(1)} hoverColor={this.getBtnHoverColor(1)} />
      </IconButton>
        <IconButton
          tooltip="play2"
          onClick={() => (this.playSpeed(2))}
          key="playBtn2"
        >
           <PlayIcon2 color={this.getBtnColor(2)} hoverColor={this.getBtnHoverColor(2)} />
         </IconButton>
       <IconButton
         tooltip="play3"
         onClick={() => (this.playSpeed(3))}
         key="playBtn3"
       >
          <PlayIcon3 color={this.getBtnColor(3)} hoverColor={this.getBtnHoverColor(3)} />
        </IconButton>
      <IconButton
        tooltip="play4"
        onClick={() => (this.playSpeed(4))}
        key="playBtn4"
      >
         <PlayIcon4 color={this.getBtnColor(4)} hoverColor={this.getBtnHoverColor(4)} />
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
