import React from 'react';
import pure from 'recompose/pure';
import RoadLines from '../shared/RoadLines';

import styles from './styles.css';


class RunningLogo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
    this.mainStyle = {
      backgroundColor: this.props.colorIn || 'white',
      borderColor: this.props.color || 'black',
      width: this.props.radius * 2,
      height: this.props.radius * 2,
    };
    this.innerStyle = {
      backgroundColor: this.mainStyle.borderColor,
    };
    this.borderStyle = {
      borderColor: this.mainStyle.borderColor,
    };
  }

  // componentDidMount() {
  // }

  // componentWillUnmount() {
  //   // localTickActions.stopLocalTick();
  // }

  isPlaying = () => (
    this.state.isPlaying
  );

  // play = doPlay => {
  //   if (doPlay === this.isPlaying()) {
  //     return;
  //   }
  //   if (!doPlay) {
  //     if (this.isPlaying()) {
  //       window.clearInterval(this.animationProc);
  //     }
  //     this.animationProc = null;
  //     this.setState({
  //       isPlaying: false,
  //     });
  //     return;
  //   }
  //   // already playing?
  //   if (this.isPlaying()) {
  //     return;
  //   }
  //   const _this = this;
  //   // targeting 30fps
  //   // TODO: use requestAnimationFrame
  //   // when do - make sure actual frame time used
  //   // for speed/advance calculations
  //   this.animationProc = window.setInterval(() => {
  //     let t = _this.props.normalized100T + _this.playbackSpeed;
  //     if (t >= 100) {
  //       t = 0;
  //     }
  //     _this.props.setChronicleNormalizedT(t);
  //   }, 33);
  //   this.setState({
  //     isPlaying: true,
  //   });
  // }

  render() {
    return (
      <div className={styles.roundFrame} style={this.mainStyle}>
        <div className={styles.innerCircle} style={this.innerStyle}>
        </div>
        <div className={styles.clipCircle}>
          <RoadLines color={this.mainStyle.backgroundColor} leftRightSway={10} />
        </div>
        <div className={styles.borderCircle} style={this.borderStyle}>
        </div>
      </div>
    );
  }
}


RunningLogo.propTypes = {
  radius: React.PropTypes.number.isRequired,
  color: React.PropTypes.string,
  colorIn: React.PropTypes.string,
};

export default pure(RunningLogo);
