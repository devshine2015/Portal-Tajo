import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { generateInnerHTMLForHistoryMoment } from 'screens/Chronicle/utils/strings';

class MomentIndicator extends React.Component {

  componentDidUpdate() {
    const infoBox = this.infoBoxRef;
    const momentData = this.props.chronicleFrame.player.getMomentDataAtNormalized(
        this.props.normalized100T);
    infoBox.innerHTML = generateInnerHTMLForHistoryMoment(momentData, this.props.chronicleFrame.theVehicle);
  }

  infoBoxRef = null;

  saveRef = (node) => {
    this.infoBoxRef = node;
  }

  render() {
    const linePos = { left: this.props.normalized100T.toFixed(3) + '%' };
    const boxOffset = { left: this.props.normalized100T < 70 ? '0' : '-100px' };
    return (
      <div className={styles.timeMarkerLineDrag} style={linePos}>
        <div ref={this.saveRef} className={styles.infoBox} style={boxOffset} />
      </div>
    );
  }
}

MomentIndicator.propTypes = {
  normalized100T: PropTypes.number.isRequired,
  chronicleFrame: PropTypes.object,
};
const mapState = () => ({
});
const mapDispatch = {
};
const PureMomentIndicator = pure(MomentIndicator);
export default connect(mapState, mapDispatch)(PureMomentIndicator);
