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

    this.reqId = null;

    this.mainStyle = {
      // backgroundColor: this.props.colorIn || 'white',
      backgroundColor: this.props.color,
      width: this.props.radius * 2,
      height: this.props.radius * 2,
    };
    this.clipCircleStyle = !this.props.is3D ? {} : {
      perspective: '25px',
      perspectiveOrigin: '50% 40%',
    };
    this.clipCircleStyle.backgroundColor = this.props.colorIn;
    this.innerStyle = {
      backgroundColor: this.mainStyle.backgroundColor,
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

  componentWillUnmount() {
    this.play(false);
  }

  isPlaying = () => (
    this.state.isPlaying
  );

  aniStep = timestamp => {
    if (!this.lastTime) this.lastTime = timestamp;

    const aStep = timestamp - this.lastTime;

    this.lastTime = timestamp;
    this.setState({ aniT: this.state.aniT + aStep * this.aniSpeed });

    this.reqId = window.requestAnimationFrame(this.aniStep);
  }

  play = doPlay => {
    if (doPlay === this.isPlaying()) {
      return;
    }

    if (doPlay) {
      this.reqId = window.requestAnimationFrame(this.aniStep);
    } else {
      window.cancelAnimationFrame(this.reqId);
    }

    this.setState({
      isPlaying: doPlay,
    });
  }

  render() {
    // const leftRight = 10 * this.noiseGen.simplex2(this.state.aniT, 3);
    const offsetValue = this.noiseGen.getVal(this.state.aniT - 0.05);
    const turnValue = -this.noiseGen.getVal(this.state.aniT);
    const leftRight = this.props.swayRange * offsetValue;
    this.mainStyle.transform = `rotate(${turnValue * this.props.turnRange}deg)`;
    return (
      <div className={styles.roundFrame} style={this.mainStyle}>
        <div className={styles.clipCircle} style={this.clipCircleStyle}>
          <div className={styles.innerCircle} style={this.innerStyle} />
          <RoadLines color={this.clipCircleStyle.backgroundColor} leftRightSway={leftRight} is3D={this.props.is3D} />
        </div>
      </div>
    );
  }
}

RunningLogo.propTypes = {
  radius: React.PropTypes.number,
  color: React.PropTypes.string,
  colorIn: React.PropTypes.string,
  turnRange: React.PropTypes.number,
  swayRange: React.PropTypes.number,
  is3D: React.PropTypes.bool,
};

RunningLogo.defaultProps = {
  radius: 15,
  colorIn: 'white',
  color: 'darkslategrey',
  turnRange: 0,
  swayRange: 0,
  is3D: false,
};

export default pure(RunningLogo);
