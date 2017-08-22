import React from 'react';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import { isEscape } from 'configs';
import theme from 'configs/theme';
import { translate } from 'utils/i18n';
import Widget, { WidgetPaper } from 'components/Widget';
import Icon from '../Icons';
import classes from './classes';
import amountsPropType from '../../PropTypes';
import phrases, { phrasesShape } from './PropTypes';

const STYLES = {
  icon: {
    width: 40,
    height: 40,
  },
  widgetPaper: {
    width: '49%',
  },
};

const AMOUNT_TYPES_AVAILABILITY = {
  vehicles: true,
  devices: isEscape,
  dead: true,
  delayed: true,
};

// function countAvailableTypes() {
//   return Object.values(AMOUNT_TYPES_AVAILABILITY).filter(v => v).length;
// }

// const AVAILABLE_TYPES_COUNT = countAvailableTypes();

const Amount = ({
  amount,
  helpText,
  icon,
}) => {
  return (
    <WidgetPaper style={STYLES.widgetPaper}>
      <div className={css(classes.amount__inn)}>
        <div className={css(classes.amount__icon)}>
          { React.cloneElement(icon, {
            style: STYLES.icon,
          }) }
        </div>
        <div className={css(classes.amount__col)}>
          <div className={css(classes.amount__title)}>
            { amount }
          </div>
          <div className={css(classes.amount__help)}>
            { helpText }
          </div>
        </div>
      </div>
    </WidgetPaper>
  );
};

Amount.propTypes = {
  amount: React.PropTypes.number.isRequired,
  helpText: React.PropTypes.string.isRequired,
  icon: React.PropTypes.node.isRequired,
};

const FullSummary = ({
  amounts,
  translations,
}) => (
  <Widget title={translations.fleet_summary_title}>
    <Amount
      icon={<Icon.CarIcon color={theme.palette.primary3Color} />}
      amount={amounts.vehiclesAmount}
      helpText={translations.vehicles_amount}
    />
    { AMOUNT_TYPES_AVAILABILITY.devices && (
      <Amount
        icon={<Icon.DeviceIcon color={theme.palette.primary3Color} />}
        amount={amounts.devicesAmount}
        helpText="devices in fleet"
      />
    )}
    <Amount
      icon={<Icon.NotReportedIcon color={theme.palette.accent2Color} />}
      amount={amounts.deadAmount}
      helpText={translations.never_reported}
    />
    {/* <Amount
          icon={<Icon.DelayedIcon color={theme.palette.accent2Color} />}
          amount={amounts.delayedAmount}
          helpText="vehicles sending delayed messages"
        />
    */}
  </Widget>
);

FullSummary.propTypes = {
  amounts: amountsPropType.isRequired,
  translations: phrasesShape.isRequired,
};
FullSummary.defaultProps = {
  translations: phrases,
};

const Pure = pure(FullSummary);

export default translate(phrases)(Pure);
