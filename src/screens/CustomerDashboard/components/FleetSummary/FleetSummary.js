import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import { project } from 'configs';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import Widget, { WidgetPaper } from 'components/Widget';
import Icon from './Icons';
import classes from './classes';
import amountsPropType, { phrases } from './PropTypes';

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
  devices: project === 'tajo',
  dead: true,
  delayed: true,
};

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
  amount: PropTypes.number.isRequired,
  helpText: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

const FullSummary = ({
  amounts,
  translations,
}, {
  muiTheme,
}) => (
  <Widget title={translations.fleet_summary_title}>
    <Amount
      icon={<Icon.CarIcon color={muiTheme.palette.primary3Color} />}
      amount={amounts.vehiclesAmount}
      helpText={translations.vehicles_amount}
    />
    { AMOUNT_TYPES_AVAILABILITY.devices && (
      <Amount
        icon={<Icon.DeviceIcon color={muiTheme.palette.primary3Color} />}
        amount={amounts.devicesAmount}
        helpText="devices in fleet"
      />
    )}
    <Amount
      icon={<Icon.NotReportedIcon color={muiTheme.palette.accent2Color} />}
      amount={amounts.deadAmount}
      helpText={translations.never_reported}
    />
  </Widget>
);

FullSummary.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};
FullSummary.propTypes = {
  amounts: amountsPropType.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

const Pure = pure(FullSummary);

export default translate(phrases)(Pure);
