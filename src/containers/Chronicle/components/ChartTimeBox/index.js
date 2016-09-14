import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { setChronicleNormalizedT } from './../../actions';
import { getNormalized100T } from './../../reducer';
import Chart from './../Chart';

class ChartTimeBox extends React.Component {

  constructor(props) {
    super(props);
    this.mouseOut = this.mouseOut.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseClick = this.mouseClick.bind(this);

    this.state = {
      isMouseDown: false,
      isMouseOver: false,
      mouseNormalized100: 0,
    };
  }

  mouseMove = (e) => {
    e.preventDefault();
    const xPos = e.nativeEvent.layerX;
    const totalW = e.nativeEvent.target.clientWidth;
    const mouseNormalized100 = (xPos / totalW) * 100;
    this.setState({ mouseNormalized100 });
    // console.log(xPos + '  ' + (mouseNormalized100).toFixed(3));
    if (this.state.isMouseDown) {
      this.props.setChronicleNormalizedT(mouseNormalized100);
    }
  }
  mouseOver = (e) => {
    e.preventDefault();
    this.setState({ isMouseOver: true });
  }
  mouseOut = (e) => {
    e.preventDefault();
    this.mouseUp();
    this.setState({ isMouseOver: false });
  }
  mouseDown = (e) => {
    e.preventDefault();
    this.setState({ isMouseDown: true });
  }
  mouseUp = (e = null) => {
    if (e !== null) {
      e.preventDefault();
    }
    this.setState({ isMouseDown: false });
  }
  mouseClick = (e) => {
    e.preventDefault();
    this.props.setChronicleNormalizedT(this.state.mouseNormalized100);
  }
  statusText() {
    if (this.props.chronicleFrame.isLoading()) {
      return (
        <div className={styles.statusTextContainer}>
          <h1> LOADING... </h1>
          <span> please wait </span>
        </div>
      );
    }
    if (!this.props.chronicleFrame.isValid()
      || this.props.chronicleFrame.isEmpty()) {
      return (
        <div className={styles.statusTextContainer}>
          <h1> NO DATA </h1>
          <span> please select vehicle </span>
        </div>
      );
    }
    return false;
  }
  render() {
    const isDisplayTimeHears = !this.props.chronicleFrame.isLoading()
          && this.props.chronicleFrame.isValid()
          && !this.props.chronicleFrame.isEmpty();
    const stl = { left: this.props.normalized100T.toFixed(3) + '%' };
    const stlDrag = { left: this.state.mouseNormalized100.toFixed(3) + '%'};
    return (
      <div className={styles.containerBox}
        onMouseMove={this.mouseMove}
        onMouseOut={this.mouseOut}
        onMouseOver={this.mouseOver}
        onMouseUp={this.mouseUp}
        onMouseDown={this.mouseDown}
        onClick={this.mouseClick}
      >
        <Chart chronicleFrame={this.props.chronicleFrame} />
        { isDisplayTimeHears ?
          <div className={styles.timeMarkerLine} style={stl}>
          </div>
          : false
        }
        { isDisplayTimeHears && this.state.isMouseOver ?
          <div className={styles.timeMarkerLineDrag} style={stlDrag}>
          </div>
          : false
        }
        {this.statusText()}
      </div>
    );
  }
}

ChartTimeBox.propTypes = {
  chronicleFrame: React.PropTypes.object,
  setChronicleNormalizedT: React.PropTypes.func.isRequired,
  normalized100T: React.PropTypes.number.isRequired,
};
const mapState = (state) => ({
  normalized100T: getNormalized100T(state),
});
const mapDispatch = {
  setChronicleNormalizedT,
};
const PureChartTimeBox = pure(ChartTimeBox);
export default connect(mapState, mapDispatch)(PureChartTimeBox);
