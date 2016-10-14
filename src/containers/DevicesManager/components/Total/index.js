import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { getDevicesAmount } from 'services/Devices/reducer';
import {
  getFaultVehiclesAmount,
  getNotAttachedAmount,
} from '../../reducer';

import styles from './styles.css';

const TotalLink = ({ onClick, text }) => {
  const isZero = text === 0 || text === '0';

  if (isZero) {
    return <span>{text}</span>;
  }

  return (
    <span
      className={styles.total__link}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

TotalLink.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.number.isRequired,
};

const Total = ({
  totalDevices,
  totalFaultVehicles,
  totalNotAttached,
}) => (
  <div className={styles.total}>
    Total devices: <TotalLink onClick={() => {}} text={totalDevices} />,
    Not attached: <TotalLink onClick={() => {}} text={totalNotAttached} />,
    Attached to wrong vehicle: <TotalLink onClick={() => {}} text={totalFaultVehicles} />.
  </div>
);

Total.propTypes = {
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

const PureTotal = pure(Total);

export default connect(mapState, mapDispatch)(PureTotal);
