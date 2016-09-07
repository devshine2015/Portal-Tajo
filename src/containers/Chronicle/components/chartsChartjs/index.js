import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { setChronicleNormalizedT } from './../../actions';
import { getNormalized100T } from './../../reducer';

import Chart from 'chart.js';
// const LineChart = require('react-chartjs').Line;
function rand(min, max, num) {
  const rtn = [];
  let i = 0;
  while (rtn.length < num) {
    rtn.push({ y: i+min+Math.random()*(max-min), x: i });
    ++i;
  }
  return rtn;
}

class ChartBox extends React.Component {
  constructor(props) {
    super(props);
    Chart.defaults.global.animation.duration = 1;

    this.speedChart = null;
  }
  componentDidMount() {
    const chartCanvas = this.refs.chart;

    // const myChartD = new Chart(chartCanvas,
    //   {
    //     type: 'doughnut',
    //     data: {
    //       labels: [
    //         'red',
    //         'blue',
    //         'yellow',
    //       ],
    //       datasets: [{
    //         data: [300, 50, 100],
    //         backgroundColor: [
    //           '#ff6384',
    //           '#36a2eb',
    //           '#ffce56',
    //         ],
    //         hoverBackgroundColor: [
    //           '#ff6384',
    //           '#36a2eb',
    //           '#ffce56',
    //         ],
    //       }],
    //     },
    //     // options: {
    //     //   responsive: false,
    //     // },
    //   });
      const aData = rand(0, 25, 12500);
    this.speedChart = new Chart(chartCanvas,
        {
          type: 'line',
          data: {
            datasets: [{
              label: 'Scatter Dataset',
              data: aData,
              // showLine: false,
              // steppedLine: true,
              // lineTension: 0,
              // borderWidth: 0,
              // pointBorderWidth: 0,
              pointRadius: 0,
              pointHoverRadius: 0,
              pointHitRadius: 0,
            }],
          },
          options: {
            scales: {
              xAxes: [{
                type: 'linear',
                position: 'bottom',
              }],
            },
            tooltips: {
              enabled: false,
            },
            legend: {
              display: false,
            }
          },
        });
  }
  componentDidUpdate() {
//    let data = this.props.data;
    if (this.props.srcVehicle.chronicleFrame === null
    || !this.props.srcVehicle.chronicleFrame.isValid()) {
      return;
    }
    const speedDataSrc = this.props.srcVehicle.chronicleFrame.speedData;
    const speedData = speedDataSrc.map((sample) => ({ x: sample.timeMs, y: sample.v }));
    // debugger;
      // data.datasets.forEach((dataset, i) => chart.data.datasets[i].data = dataset.data);
      //
      // chart.data.labels = data.labels;
    this.speedChart.data.datasets[0].data = [];
    this.speedChart.update(0);
    this.speedChart.data.datasets[0].data = speedData;
    this.speedChart.update(0);
  }
  componentWillUnmount() {
//    this.play(false);
  }
  render() {

    const stl={left: this.props.normalized100T.toFixed(3)+"%"};

    return (
      <div className={styles.containerBox}>
      <canvas ref={'chart'} height={'150'} width={'600'}
        style={{ maxHeight: '150px' }}
      >
      </canvas>
        <div className={styles.timeMarkerLine} style={stl}>
        </div>
      </div>
    );
    // return (
    //   <div className={styles.containerBox}>
    //   <LineChart data={data} width="600" height="250" />
    //   </div>
    // );
  }
}

ChartBox.propTypes = {
  srcVehicle: React.PropTypes.object.isRequired,
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
