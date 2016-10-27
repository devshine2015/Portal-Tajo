import React from 'react';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';
import DeviceIcon from 'material-ui/svg-icons/hardware/router';
import NotReportedIcon from 'material-ui/svg-icons/alert/error-outline';
import DelayedIcon from 'material-ui/svg-icons/action/watch-later';
import theme from 'configs/theme';

import styles from './styles.css';

const STYLES = {
  icon: {
    width: 20,
    height: 20,
    verticalAlign: 'middle',
  },
};

const Amount = ({ amount, icon }) => (
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
  amount: React.PropTypes.number.isRequired,
  icon: React.PropTypes.node.isRequired,
};

class FleetSummary extends React.Component {

  render() {
    return (
      <div className={styles.summaryWrapper}>
        <Amount
          amount={134}
          icon={<CarIcon color={theme.palette.primary3Color} />}
        />
        <Amount
          amount={132}
          icon={<DeviceIcon color={theme.palette.primary3Color} />}
        />
        <Amount
          amount={14}
          icon={<NotReportedIcon color={theme.palette.accent2Color} />}
        />
        <Amount
          amount={37}
          icon={<DelayedIcon color={theme.palette.accent2Color} />}
        />
      </div>
    );
  }
}

export default FleetSummary;
