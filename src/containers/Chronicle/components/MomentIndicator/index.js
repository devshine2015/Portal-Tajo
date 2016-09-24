import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { generateInnerHTMLForHistoryMoment } from 'containers/Chronicle/utils/strings';

class MomentIndicator extends React.Component {

  componentDidUpdate() {
    const infoBox = this.refs.infoBox;
    const momentData = this.props.chronicleFrame.player.getMomentDataAtNormalized(
        this.props.normalized100T);
    infoBox.innerHTML = generateInnerHTMLForHistoryMoment(momentData);
  }
  render() {
    const linePos = { left: this.props.normalized100T.toFixed(3) + '%' };
    const boxOffset = { left: this.props.normalized100T < 70 ? '0' : '-100px' };
    return (
      <div className={styles.timeMarkerLineDrag} style={linePos}>
        <div ref={'infoBox'} className={styles.infoBox} style={boxOffset}>
        </div>
      </div>
    );
  }
}

MomentIndicator.propTypes = {
  normalized100T: React.PropTypes.number.isRequired,
  chronicleFrame: React.PropTypes.object,
};
const mapState = () => ({
});
const mapDispatch = {
};
const PureMomentIndicator = pure(MomentIndicator);
export default connect(mapState, mapDispatch)(PureMomentIndicator);
