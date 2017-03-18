import React from 'react';
import pure from 'recompose/pure';
import RoadLines from '../shared/RoadLines';
// import Noise from 'noisejs';
// const Noise = require('noisejs');
import noise1D from 'utils/noise1d';

import styles from './styles.css';


class RunningLogo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      aniT: 0,
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

    this.aniSpeed = 0.0003;
    // this.noiseGen = new Noise(0);

    this.noiseGen = noise1D();
    // this.noiseGen.setScale(0.3);
    //  new Noise(Math.random());
  }

  componentDidMount() {
    this.play(true);
  }

  // componentWillUnmount() {
  //   // localTickActions.stopLocalTick();
  // }

  isPlaying = () => (
    this.state.isPlaying
  );
  aniStep = timestamp => {
    if (!this.lastTime) this.lastTime = timestamp;
    const aStep = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.setState({ aniT: this.state.aniT + aStep * this.aniSpeed });
    window.requestAnimationFrame(this.aniStep);
  }
  play = doPlay => {
    if (doPlay === this.isPlaying()) {
      return;
    }
    window.requestAnimationFrame(this.aniStep);
    this.setState({
      isPlaying: true,
    });
  }

  render() {
    // const leftRight = 10 * this.noiseGen.simplex2(this.state.aniT, 3);
    const offsetValue = this.noiseGen.getVal(this.state.aniT - 0.05);
    const turnValue = -this.noiseGen.getVal(this.state.aniT);
    const leftRight = 10 * offsetValue;
    const clipCircleStyle = !this.props.is3D ? {} : {
      perspective: '25px',
      perspectiveOrigin: '50% 40%',
    };
    this.mainStyle.transform = `rotate(${turnValue * 5}deg)`;
    return (
      <div className={styles.roundFrame} style={this.mainStyle}>
        <div className={styles.innerCircle} style={this.innerStyle}>
        </div>
        <div className={styles.clipCircle} style={clipCircleStyle}>
          <RoadLines color={this.mainStyle.backgroundColor} leftRightSway={leftRight} is3D={this.props.is3D} />
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
  driveSpeed: React.PropTypes.number,
  is3D: React.PropTypes.bool,
};

export default pure(RunningLogo);
