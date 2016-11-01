import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';
import DeviceIcon from 'material-ui/svg-icons/hardware/router';
import NotReportedIcon from 'material-ui/svg-icons/alert/error-outline';
import DelayedIcon from 'material-ui/svg-icons/action/watch-later';
import { getDevicesAmount } from 'services/Devices/reducer';
import { getAmounts } from 'services/FleetModel/reducer';
import { portal } from 'configs';
import theme from 'configs/theme';

import styles from './styles.css';

const STYLES = {
  icon: {
    width: 20,
    height: 20,
    verticalAlign: 'middle',
  },
};

const Amount = ({
  amount = 0,
  icon,
}) => (
  <div className={styles.amount}>
    { amount }
    <div className={styles.amount__icon}>
      { React.cloneElement(icon, {
        style: STYLES.icon,
        className: styles.amount__svg,
      }) }
    </div>
  </div>
);

Amount.propTypes = {
  amount: React.PropTypes.number,
  icon: React.PropTypes.node.isRequired,
};

const FleetSummary = ({
  devicesAmount,
  deadAmount,
  delayedAmount,
  vehiclesAmount,
}) => (
  <div className={styles.summaryWrapper}>
    <Amount
      amount={vehiclesAmount}
      icon={<CarIcon color={theme.palette.primary3Color} />}
    />
    { portal === 'tajo' &&
      <Amount
        amount={devicesAmount}
        icon={<DeviceIcon color={theme.palette.primary3Color} />}
      />
    }
    <Amount
      amount={deadAmount}
      icon={<NotReportedIcon color={theme.palette.accent2Color} />}
    />
    <Amount
      amount={delayedAmount}
      icon={<DelayedIcon color={theme.palette.accent2Color} />}
    />
  </div>
);

FleetSummary.propTypes = {
  vehiclesAmount: React.PropTypes.number.isRequired,
  devicesAmount: React.PropTypes.number.isRequired,
  delayedAmount: React.PropTypes.number.isRequired,
  deadAmount: React.PropTypes.number.isRequired,
};

const mapState = state => ({
  ...getAmounts(state),
  devicesAmount: getDevicesAmount(state),
});

const PureFleetSummary = pure(FleetSummary);

export default connect(mapState)(PureFleetSummary);

