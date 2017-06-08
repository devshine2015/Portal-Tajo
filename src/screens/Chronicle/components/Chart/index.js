import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
// d3 -----
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

class ChartBox extends React.Component {
  constructor(props) {
    super(props);

    this.chartRef = null;

    this.state = {
      speedChartPathD: '',
      tempChartPathD: '',
      fuelChartPathD: '',
    };
  }

  componentDidMount() {
    this.generateCharts(this.props.chronicleFrame);
  }

  componentWillReceiveProps(nextProps) {
    this.generateCharts(nextProps.chronicleFrame);
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.chronicleFrame.ownerId !== this.props.chronicleFrame.ownerId
  //   || !this.props.chronicleFrame.isValid();
  // }

  generateCharts(chronicleFrame) {
    if (!chronicleFrame.isValid() || chronicleFrame.isEmpty()) {
      this.setState({
        speedChartPathD: '',
        tempChartPathD: '',
        fuelChartPathD: '',
      });
      return;
    }
    const mySvgElement = this.chartRef;
    // if (mySvgElement === undefined) {
    //   return;
    // }
    const myWidht = mySvgElement.clientWidth;
    const myHeight = mySvgElement.clientHeight;
    const srcFrame = chronicleFrame;
    const tempRangePadding = 3;
    const fuelRangePadding = 0.05;
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
    const yScaleFuel = scaleLinear().range([myHeight - paddings.bottom, paddings.top])
      .domain([srcFrame.minFuel - fuelRangePadding, srcFrame.maxFuel + fuelRangePadding]);
    const lineGenSpeed = line()
      .x(d => (xScale(d.timeMs)))
      .y(d => (yScaleSpeed(d.v)));
    const lineGenTemp = line()
      .x(d => (xScale(d.timeMs)))
      .y(d => (yScaleTemp(d.t)));
    const lineGenFuel = line()
      .x(d => (xScale(d.timeMs)))
      .y(d => (yScaleFuel(d.f)));

    this.setState({
      speedChartPathD: lineGenSpeed(srcFrame.speedData),
      tempChartPathD: srcFrame.hasTemperature() ? lineGenTemp(srcFrame.temperatureData) : '',
      fuelChartPathD: srcFrame.hasFuel() ? lineGenFuel(srcFrame.fuelData) : '',
    });
  }

  saveNode = (node) => {
    this.chartRef = node;
  }

  render() {
    return (
      <svg
        ref={this.saveNode}
        className={styles.chartBox}
      >
        <path d={this.state.speedChartPathD} className={styles.speedChart} />
        <path d={this.state.tempChartPathD} className={styles.tempChart} />
        <path d={this.state.fuelChartPathD} className={styles.fuelChart} />
      </svg>
    );
  }
}

ChartBox.propTypes = {
  chronicleFrame: React.PropTypes.object.isRequired,
};

export default pure(ChartBox);
