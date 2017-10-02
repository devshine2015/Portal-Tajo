import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import { project } from 'configs';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import Widget from 'components/Widget';
import Icon from './Icons';
import Amount from './Amount';
import { summaryClasses } from './classes';
import amountsPropType, { phrases } from './PropTypes';

const AMOUNT_TYPES_AVAILABILITY = {
  vehicles: true,
  devices: project === 'tajo',
  dead: true,
  delayed: true,
};

const FullscreenModeAction = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className={css(summaryClasses.action)}
  >
    { text }
  </button>
);
FullscreenModeAction.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.node.isRequired,
};

const FullSummary = ({
  amounts,
  translations,
}, {
  muiTheme,
}) => (
  <Widget
    containerClassName={css(summaryClasses.fullSummary)}
    title={translations.fleet_summary_title}
    rightElement={
      <FullscreenModeAction
        text={translations.fullscreen_mode}
        onClick={() => null}
      />
    }
  >
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
