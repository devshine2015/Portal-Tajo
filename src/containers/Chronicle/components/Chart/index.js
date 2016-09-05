import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { setChronicleNormalizedT } from './../../actions';
import { getNormalized100T } from './../../reducer';


class ChartBox extends React.Component {

  componentWillUnmount() {
//    this.play(false);
  }
  
  render() {
    return (
      <div className={styles.containerBox}>
      </div>
    );
  }
}

ChartBox.propTypes = {
  selectedVehicleId: React.PropTypes.string,
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
