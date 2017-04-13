import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { setChronicleNormalizedT } from './../../actions';
import { getNormalized100T } from './../../reducer';
// d3 -----
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

class ChartBox extends React.Component {
  constructor(props) {
    super(props);
    this.speedChartPathD = '';
    this.tempChartPathD = '';
  }

  componentDidMount() {
    this.generateCharts();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.chronicleFrame.ownerId !== this.props.chronicleFrame.ownerId
    || !this.props.chronicleFrame.isValid();
  }

  generateCharts() {
    if (!this.props.chronicleFrame.isValid() || this.props.chronicleFrame.isEmpty()) {
      this.speedChartPathD = '';
      this.tempChartPathD = '';
      return;
    }
    const mySvgElement = this.refs.chart;
    if (mySvgElement === undefined) {
      return;
    }
    const myWidht = mySvgElement.clientWidth;
    const myHeight = mySvgElement.clientHeight;
    const srcFrame = this.props.chronicleFrame;
    const tempRangePadding = 3;
    const paddings = {
      top: 10,
      right: 0,
      bottom: 0,
      left: 0,
    };
    const xScale = scaleLinear().range([paddings.left, myWidht - paddings.right])
      .domain([0, srcFrame.timeRangeMs]);
    const yScaleSpeed = scaleLinear().range([myHeight - paddings.bottom, paddings.top])
      .domain([0, srcFrame.maxSpeed]);
    const yScaleTemp = scaleLinear().range([myHeight - paddings.bottom, paddings.top])
      .domain([srcFrame.minTemp - tempRangePadding, srcFrame.maxTemp + tempRangePadding]);
    const lineGenSpeed = line()
      .x((d) => (xScale(d.timeMs)))
      .y((d) => (yScaleSpeed(d.v)));
    const lineGenTemp = line()
      .x((d) => (xScale(d.timeMs)))
      .y((d) => (yScaleTemp(d.t)));

    this.speedChartPathD = lineGenSpeed(srcFrame.speedData);
    this.tempChartPathD = srcFrame.hasTemperature() ? lineGenTemp(srcFrame.temperatureData) : '';
  }

  // componentWillUnmount() {
  // }
  render() {
    this.generateCharts();
    return (
      <svg ref={'chart'} className={styles.chartBox}>
        <path d={this.speedChartPathD} className={styles.speedChart}>
        </path>
        <path d={this.tempChartPathD} className={styles.tempChart}>
        </path>
      </svg>
    );
  }
}

ChartBox.propTypes = {
  chronicleFrame: React.PropTypes.object.isRequired,
  setChronicleNormalizedT: React.PropTypes.func.isRequired,
  normalized100T: React.PropTypes.number.isRequired,
};
const mapState = (state) => ({
  normalized100T: getNormalized100T(state),
});
const mapDispatch = {
  setChronicleNormalizedT,
};
const PureChartBox = pure(ChartBox);
export default connect(mapState, mapDispatch)(PureChartBox);
