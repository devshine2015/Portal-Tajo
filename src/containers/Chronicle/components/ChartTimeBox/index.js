import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { setChronicleNormalizedT } from './../../actions';
import { getNormalized100T } from './../../reducer';
import Chart from './../Chart';
import MomentIndicator from './../MomentIndicator';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

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
    const { translations } = this.props;

    if (this.props.chronicleFrame.isLoading()) {
      return (
        <div className={styles.statusTextContainer}>
          <h1>{ translations.loading }</h1>
          <span>{ translations.please_wait }</span>
        </div>
      );
    }
    if (!this.props.chronicleFrame.isValid()
      || this.props.chronicleFrame.isEmpty()) {
      return (
        <div className={styles.statusTextContainer}>
          <h1>{ translations.no_data }</h1>
          <span>{ translations.please_select_vehicle }</span>
        </div>
      );
    }
    return false;
  }
  frameInfo() {
    if (this.props.chronicleFrame.isValid()
      && !this.props.chronicleFrame.isEmpty()) {
      return (
        <div className={styles.infoTextContainer}>
          <div className={styles.infoPropContainer}>
            <span>{ `${this.props.translations.max_speed}:` }</span>
            <span>{this.props.chronicleFrame.maxSpeed.toFixed(1)} km/h</span>
          </div>
          { !this.props.chronicleFrame.hasTemperature() ? false :
            <div>
              <div className={styles.infoPropContainer}>
                <span>{ `${this.props.translations.max_temp}:` }</span>
                <span>{this.props.chronicleFrame.maxTemp.toFixed(1)} &deg;C</span>
              </div>
              <div className={styles.infoPropContainer}>
                <span>{ `${this.props.translations.min_temp}:` }</span>
                <span>{this.props.chronicleFrame.minTemp.toFixed(1)} &deg;C</span>
              </div>
            </div>
          }
        </div>
      );
    }
    return false;
  }
  render() {
    const isDisplayTimeHears = !this.props.chronicleFrame.isLoading()
          && this.props.chronicleFrame.isValid()
          && !this.props.chronicleFrame.isEmpty();
    const stl = { left: `${this.props.normalized100T.toFixed(3)}%` };
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
          <MomentIndicator
            normalized100T={this.state.mouseNormalized100}
            chronicleFrame={this.props.chronicleFrame}
          />
          : false
        }
        {this.statusText()}
        {this.frameInfo()}
      </div>
    );
  }
}

ChartTimeBox.propTypes = {
  chronicleFrame: React.PropTypes.object,
  setChronicleNormalizedT: React.PropTypes.func.isRequired,
  normalized100T: React.PropTypes.number.isRequired,

  translations: phrasesShape.isRequired,
};
ChartTimeBox.defaultProps = {
  translations: {
    loading: 'LOADING...',
    please_wait: 'please wait',
    no_data: 'NO DATA',
    please_select_vehicle: 'please select vehicle',
    max_speed: 'Max speed',
    max_temp: 'Max temp',
    min_temp: 'Min temp',
  },
};

const mapState = (state) => ({
  normalized100T: getNormalized100T(state),
});
const mapDispatch = {
  setChronicleNormalizedT,
};

const PureChartTimeBox = pure(ChartTimeBox);
const Connected = connect(mapState, mapDispatch)(PureChartTimeBox);

export default translate(phrases)(Connected);
