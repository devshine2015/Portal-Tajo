import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { setChronicleNormalizedT } from './../../actions';
import { getNormalized100T } from './../../reducer';
import { translate } from 'utils/i18n';
import classnames from 'classnames';
import { teal100, teal400, yellow700, yellow500 } from 'material-ui/styles/colors';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

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
    // TODO: use requestAnimationFrame
    // when do - make sure actual frame time used
    // for speed/advance calculations
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
    // time (minutes) it takes to playback the whole history (24hvrs timeline initialy)
    let timeToPlayMin = 5;
    switch (speed) {
      case 1:
        timeToPlayMin = 1440 * 2; // realime speed 24*60 = 1440
        break;
      case 2:
        timeToPlayMin = 100;
        break;
      case 3:
        timeToPlayMin = 5;
        break;
      case 4:
        timeToPlayMin = 1;
        break;
      default:
        break;
    }
    // assuming we have 30 fps
    this.playbackSpeed = 100 / (timeToPlayMin * 60 * 30);
  }

  toggleEvents = () => {
    this.props.toggleEventsCallback();
  }

  render() {
    return (
      <div className={styles.containerBox}>
        <div
          role="play"
          className={classnames(styles.playbackButton,
            {[styles.playbackButtonActive]: this.state.playbackSpeedEnum === 1}
          )}
          onClick={() => (this.playSpeed(1))}
          key="playBtn"
        >
          <img
            className={styles.playbackImage}
            src={require('assets/images/demo/icon-playback/play.png')}
            alt="button"
          />
          <img
            className={styles.playbackActiveImage}
            src={require('assets/images/demo/icon-playback/play-active.png')}
            alt="button"
          />
        </div>
        <div
          data-speed="0"
          role="pause"
          className={classnames(styles.playbackButton,
            {[styles.playbackButtonActive]: this.state.playbackSpeedEnum === 0}
          )}
          onClick={() => (this.playSpeed(0))}
          key="pauseBtn"
        >
          <img
            className={styles.playbackImage}
            src={require('assets/images/demo/icon-playback/pause.png')}
            alt="button"
          />
          <img
            className={styles.playbackActiveImage}
            src={require('assets/images/demo/icon-playback/pause-active.png')}
            alt="button"
          />
        </div>

        <div
          data-speed="2"
          role="play2"
          className={classnames(styles.playbackButton,
            {[styles.playbackButtonActive]: this.state.playbackSpeedEnum === 2}
          )}
          onClick={() => (this.playSpeed(2))}
          key="playBtn2"
        >
          <img
            className={styles.playbackImage}
            src={require('assets/images/demo/icon-playback/x5.png')}
            alt="button"
          />
          <img
            className={styles.playbackActiveImage}
            src={require('assets/images/demo/icon-playback/x5-active.png')}
            alt="button"
          />
        </div>
        <div
          data-speed="3"
          role="play3"
          className={classnames(styles.playbackButton,
            {[styles.playbackButtonActive]: this.state.playbackSpeedEnum === 3}
          )}
          onClick={() => (this.playSpeed(3))}
          key="playBtn3"
        >
          <img
            className={styles.playbackImage}
            src={require('assets/images/demo/icon-playback/x10.png')}
            alt="button"
          />
          <img
            className={styles.playbackActiveImage}
            src={require('assets/images/demo/icon-playback/x10-active.png')}
            alt="button"
          />
        </div>
        <div
          data-speed="4"
          role="play4"
          className={classnames(styles.playbackButton,
            {[styles.playbackButtonActive]: this.state.playbackSpeedEnum === 4}
          )}
          onClick={() => (this.playSpeed(4))}
          key="playBtn4"
        >
          <img
            className={styles.playbackImage}
            src={require('assets/images/demo/icon-playback/x50.png')}
            alt="button"
          />
          <img
            className={styles.playbackActiveImage}
            src={require('assets/images/demo/icon-playback/x50-active.png')}
            alt="button"
          />
        </div>
      </div>
    );
  }
}

PlaybackCtr.propTypes = {
  toggleEventsCallback: PropTypes.func.isRequired,
  setChronicleNormalizedT: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  normalized100T: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types

  translations: phrasesShape.isRequired,
};

const mapState = state => ({
  normalized100T: getNormalized100T(state),
});
const mapDispatch = {
  setChronicleNormalizedT,
};

const PurePlaybackCtr = pure(PlaybackCtr);
const Connected = connect(mapState, mapDispatch)(PurePlaybackCtr);

export default translate(phrases)(Connected);
