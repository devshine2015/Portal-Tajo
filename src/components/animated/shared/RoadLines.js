import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

import styles from './styles.css';


class RoadLines extends React.Component {

  constructor(props) {
    super(props);

    this.reqId = null;

    this.state = {
      isPlaying: false,
      aniT: 0,
    };
    this.animationProc = null;

    this.segLen = '30%';
    this.segStep = 45;
    this.segCount = this.props.is3D ? 7 : 3;

    this.aniSpeed = 0.005;   //
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
    const advancedT = this.state.aniT + aStep * this.aniSpeed;

    this.setState({ aniT: advancedT - Math.floor(advancedT) });

    this.reqId = window.requestAnimationFrame(this.aniStep);
  }

  aniStepFixed = () => {
    const aStep = 0.075;
    const advancedT = this.state.aniT + aStep;
    this.setState({ aniT: advancedT - Math.floor(advancedT) });
  }

  play = doPlay => {
    if (doPlay === this.isPlaying()) {
      return;
    }
    // if (!doPlay) {
    //   if (this.isPlaying()) {
    //     window.clearInterval(this.animationProc);
    //   }
    //   this.animationProc = null;
    //   this.setState({
    //     isPlaying: false,
    //   });
    //   return;
    // }
    // // already playing?
    // if (this.isPlaying()) {
    //   return;
    // }
    // targeting 30fps
    // TODO: use requestAnimationFrame
    // when do - make sure actual frame time used
    // for speed/advance calculations
//    this.animationProc = window.setInterval(this.aniStepFixed, 33);
    if (doPlay) {
      this.reqId = window.requestAnimationFrame(this.aniStep);
    } else {
      window.cancelAnimationFrame(this.reqId);
    }

    this.setState({
      isPlaying: doPlay,
    });
  }

  generateRoadLines = () => {
    const theLines = [];
    let segPos = -this.state.aniT * this.segStep;
    let i = 0;
    while ((i++) < this.segCount) {
      const segStyle = {
        // bottom: (step * (i - 1))/2 + '%',
        // width: this.segWidth,
        height: this.segLen,
        bottom: segPos + '%',
        backgroundColor: this.props.color,
        // backgroundColor: 'gray',
      };
    //   segStyle.bottom = segPos;
      segPos += this.segStep;
      theLines.push((<div className={styles.roadLineSeg} style={segStyle} key={i} />));
    }
    return theLines;
  }

  render() {
    const lines = this.generateRoadLines();
    const baseStyle = {
      left: `${this.props.leftRightSway}%`,
      transform: this.props.is3D ? 'rotateX(45deg)' : '',
    };
    return (
      <div className={styles.roadLine} style={baseStyle} >
        {lines}
      </div>
    );
  }
}


RoadLines.propTypes = {
  color: PropTypes.string.isRequired,
  leftRightSway: PropTypes.number,
  is3D: PropTypes.bool,
};

RoadLines.defaultProps = {
  leftRightSway: 0,
  is3D: false,
};

export default pure(RoadLines);
