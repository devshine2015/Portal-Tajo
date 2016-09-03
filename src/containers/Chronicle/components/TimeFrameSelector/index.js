import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import styles from './styles.css';
import { requestHistory } from './../../actions';

import FlatButton from 'material-ui/FlatButton';

class TimeFrame extends React.Component {

  getData(_props) {
    _props.requestHistory(_props.selectedVehicleId, new Date());
  }

  render() {
    return (
      <div className={styles.timeFrameBox}>
        select from-to here
        <FlatButton
          onClick={ () => this.getData(this.props) }
          label="Get Data"
        />

      </div>
    );
  }
}

TimeFrame.propTypes = {
  selectedVehicleId: React.PropTypes.string.isRequired,
  requestHistory: React.PropTypes.func.isRequired,
};
const mapState = () => ({
});
const mapDispatch = {
  requestHistory,
};
const PureTimeFrame = pure(TimeFrame);
export default connect(mapState, mapDispatch)(PureTimeFrame);
