import React from 'react';
import pure from 'recompose/pure';
import Icon from '../Icons';
import { amountsShape } from '../../PropTypes';
import { isEscape } from 'configs';
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
  <button type="button" className={styles.amount}>
    { amount }
    <div className={styles.amount__icon}>
      { React.cloneElement(icon, {
        style: STYLES.icon,
        className: styles.amount__svg,
      }) }
    </div>
  </button>
);
/*
 (
  <div className={styles.amount}>
    { amount }
    <div className={styles.amount__icon}>
      { React.cloneElement(icon, {
        style: STYLES.icon,
        className: styles.amount__svg,
      }) }
    </div>
  </div>
);*/


Amount.propTypes = {
  amount: React.PropTypes.number,
  icon: React.PropTypes.node.isRequired,
};

const SimpleSummary = ({
  amounts,
}) => (
  <div className={styles.summaryWrapper}>
    <Amount
      amount={amounts.vehiclesAmount}
      icon={<Icon.CarIcon color={theme.palette.primary3Color} />}
    />
    { isEscape &&
      <Amount
        amount={amounts.devicesAmount}
        icon={<Icon.DeviceIcon color={theme.palette.primary3Color} />}
      />
    }
    <Amount
      amount={amounts.deadAmount}
      icon={<Icon.NotReportedIcon color={theme.palette.accent2Color} />}
    />
    {/*<Amount
      amount={amounts.delayedAmount}
      icon={<Icon.DelayedIcon color={theme.palette.accent2Color} />}
    />*/}
  </div>
);

SimpleSummary.propTypes = {
  amounts: amountsShape.isRequired,
};

export default pure(SimpleSummary);

