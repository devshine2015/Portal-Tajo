import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FullScreenIn from 'material-ui/svg-icons/navigation/fullscreen';
import FullScreenOut from 'material-ui/svg-icons/navigation/fullscreen-exit';

import {
  project,
  isFeatureSupported,
  hasFullScreenBoard,
  isMwa,
} from 'configs';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import takeVendorPrefixedProp from 'utils/vendors';
import Widget from 'components/Widget';
import Layout from 'components/Layout';

import JobsWidget from '../JobsWidget';

import Icon from './Icons';
import Amount from './Amount';
// import FullscreenSummary from '../FullscreenSummaryWindowed';
import WindowedSummary from '../WindowedSummary';
import { summaryClasses, fabClasses } from './classes';
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

const FullscreenModeAction = ({ onClick, text }) => !hasFullScreenBoard ? false
  : (<button
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
    if (this.state.fullscreen) {
      return (<div style={{ height: '100%'}}>
        <FloatingActionButton
          onClick={this.toggleFullscreenMode}
          className={css(fabClasses.fab)}
        >
          <FullScreenOut />
        </FloatingActionButton>
        <WindowedSummary />
      </div>);
    }

    const { amounts, translations } = this.props;
    const { muiTheme } = this.context;

    return (
      <div>
        {hasFullScreenBoard &&
          <FloatingActionButton
            onClick={this.toggleFullscreenMode}
            className={css(fabClasses.fab)}
          >
            <FullScreenIn />
          </FloatingActionButton>
        }
        <Layout.Content>
          <Widget
            containerClassName={css(summaryClasses.fullSummary)}
            title={translations.fleet_summary_title}
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
          { isMwa && <JobsWidget /> }

        </Layout.Content>
      </div>
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
