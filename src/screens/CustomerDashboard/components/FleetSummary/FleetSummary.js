import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import {
  project,
  isFeatureSupported,
  hasFullScreenBoard,
} from 'configs';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import takeVendorPrefixedProp from 'utils/vendors';
import Widget from 'components/Widget';
import Icon from './Icons';
import Amount from './Amount';
import FullscreenSummary from '../FullscreenSummary';
import { summaryClasses } from './classes';
import amountsPropType, { phrases } from './PropTypes';

const AMOUNT_TYPES_AVAILABILITY = {
  vehicles: true,
  devices: project === 'tajo',
  dead: true,
  delayed: true,
};

const fullscreenElement = takeVendorPrefixedProp(document, isFeatureSupported('prefix'), 'fullscreenElement');

function getEventName(prefix) {
  const standartEvent = 'fullscreenchange';
  return prefix ? `${prefix.lowercase}${standartEvent}` : standartEvent;
}

const FullscreenModeAction = ({ onClick, text }) => {   
  return !hasFullScreenBoard ? false
    : (<button
      onClick={onClick}
      className={css(summaryClasses.action)}
    >
      { text }
    </button>
    );
};

FullscreenModeAction.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.node.isRequired,
};

class FullSummary extends React.Component {
  state = {
    fullscreen: false,
  };
  prefix = isFeatureSupported('prefix') || null;

  toggleFullscreenMode = () => {
    this.setState(prevState => ({
      fullscreen: !prevState.fullscreen,
    }));
  }

  componentDidMount() {
    document.addEventListener(getEventName(this.prefix), this.onFullscreenChange);
  }

  componentWillUnmount() {
    document.removeEventListener(getEventName(this.prefix), this.onFullscreenChange);
  }

  onFullscreenChange = () => {
    this.setState(() => ({
      fullscreen: !!document[fullscreenElement],
    }));
  }

  render() {
    if (this.state.fullscreen) return <FullscreenSummary />;

    const { amounts, translations } = this.props;
    const { muiTheme } = this.context;

    return (
      <Widget
        containerClassName={css(summaryClasses.fullSummary)}
        title={translations.fleet_summary_title}
        rightElement={
          <FullscreenModeAction
            text={translations.fullscreen_mode}
            onClick={this.toggleFullscreenMode}
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
  }
}

FullSummary.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};
FullSummary.propTypes = {
  amounts: amountsPropType.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

const Pure = pure(FullSummary);

export default translate(phrases)(Pure);
