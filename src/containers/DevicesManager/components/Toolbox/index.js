import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { getDevicesAmount } from 'services/Devices/reducer';
import {
  getFaultVehiclesAmount,
  getNotAttachedAmount,
} from '../../reducer';

import styles from './styles.css';

const Total = ({
  totalDevices,
  totalFaultVehicles,
  totalNotAttached,
}) => (
  <div className={styles.total}>
    Total devices: {totalDevices},
    Not attached: {totalNotAttached},
    Attached to wrong vehicle: {totalFaultVehicles}.
  </div>
);

Total.propTypes = {
  totalDevices: React.PropTypes.number.isRequired,
  totalNotAttached: React.PropTypes.number.isRequired,
  totalFaultVehicles: React.PropTypes.number.isRequired,
};

class Toolbox extends React.Component {
  render() {
    return (
      <div className={styles.toolbox}>
        <div className={styles.totalContainer}>
          <Total {...this.props} />
        </div>
      </div>
    );
  }
}

Toolbox.propTypes = {
  totalDevices: React.PropTypes.number.isRequired,
  totalNotAttached: React.PropTypes.number.isRequired,
  totalFaultVehicles: React.PropTypes.number.isRequired,
};

const mapState = state => ({
  totalDevices: getDevicesAmount(state),
  totalNotAttached: getNotAttachedAmount(state),
  totalFaultVehicles: getFaultVehiclesAmount(state),
});
const mapDispatch = null;

const PureToolbox = pure(Toolbox);

export default connect(mapState, mapDispatch)(PureToolbox);
