import React from 'react';
import pure from 'recompose/pure';
import cs from 'classnames';
import moment from 'moment';
import { VelocityTransitionGroup } from 'velocity-react';
require('velocity-animate');
require('velocity-animate/velocity.ui');

import { speedKmHToKnots,
  decimalDegToDMS,
  kmToNauticalMiles } from 'utils/convertors';

import { isEscape } from 'configs';
import ItemProperty from '../DetailItemProperty';
import Divider from 'material-ui/Divider';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
import AlertLagIcon from 'material-ui/svg-icons/action/watch-later';
import { yellow700, blueGrey200 } from 'material-ui/styles/colors';

import stylesBase from '../styles.css';
import styles from './styles.css';

const NEVER_REPORTED = 'never reported - check device';

const Icon = ({
  isDead,
  isDelayed,
  isDelayedWithIgnitionOff,
}) => {
  let icon = null;

  if (isDead) {
    icon = <AlertIcon color={yellow700} />;
  } else if (isEscape && isDelayedWithIgnitionOff) {
    icon = <AlertLagIcon color={blueGrey200} />;
  } else if (isDelayed) {
    icon = <AlertLagIcon color={yellow700} />;
  }

  return (
    <div className={styles.indicator}>
      { icon }
    </div>
  );
}

const Warn = ({
  isDead,
  isDelayed,
  isExpanded,
  updateDate,
}) => {
  let infoStr = '';

  if (isDead) {
    infoStr = NEVER_REPORTED;
  } else if (isDelayed) {
    infoStr = `Delayed ${moment().from(updateDate, true)}`;
  }

  const className = cs(styles.warn, {
    [styles.warn_white]: isExpanded,
  });

  return (
    <div className={className}>
      { infoStr }
    </div>
  );
};

class ListItemMaritime extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.id);
  }

  inActivityIndicator() {
    if (!this.props.isDead && !this.props.isDelayed) return null;

    return (
      <Warn
        isExpanded={this.props.isExpanded}
        isDead={this.props.isDead}
        isDelayed={this.props.isDelayed}
        updateDate={this.props.lastUpdateSinceEpoch}
      />
    );
  }

  renderDetails() {
    if (!this.props.isExpanded) return null;
    // const reportDate = new Date(this.props.lastUpdateSinceEpoch);
    const estimatedTravelNM = kmToNauticalMiles(this.props.estimatedTravelKm);
    // <ItemProperty
    //   title="Reporting Time"
    //   value={`${reportDate.toISOString()}`}
    // />

    return (
      <div>
        <Divider />
        <ItemProperty
          title="Call Sign"
          value={`${this.props.licensePlate}`}
        />
        <ItemProperty
          title="Tracking Interval"
          value={`${this.props.trackigInterval}min`}
        />
        <ItemProperty
          title="Speed"
          value={`${speedKmHToKnots(this.props.speed).toFixed(3)}kn`}
        />
        <ItemProperty
          title="Heading"
          value={`${this.props.heading}\xB0`}
        />
        <ItemProperty
          title="Latitude"
          value={`${decimalDegToDMS(this.props.pos[0], false)}`}
        />
        <ItemProperty
          title="Longtitude"
          value={`${decimalDegToDMS(this.props.pos[1], true)}`}
        />
        <ItemProperty
          title="Time since report"
          value={`${this.props.timeSinceUpdateMin}min`}
        />
        <ItemProperty
          title="Est Distance since report"
          value={`${estimatedTravelNM.toFixed(1)}NM`}
        />
      </div>
    );
  }

  render() {
    const className = cs(stylesBase.listItemInn, {
      [styles.listItemInn_expanded]: this.props.isExpanded,
    });
    const { isDead, isDelayed, isDelayedWithIgnitionOff } = this.props;
    const needIndicator = isDead || isDelayed || isDelayedWithIgnitionOff;
    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        <h1>
          {this.props.name}
        </h1>

        { this.inActivityIndicator() }

        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 500 }}
          leave={{ animation: 'slideUp', duration: 350 }}
        >
          { this.renderDetails() }
        </VelocityTransitionGroup>

        { needIndicator && (
          <Icon
            isDead={isDead}
            isDelayed={isDelayed}
            isDelayedWithIgnitionOff={isDelayedWithIgnitionOff}
          />
        )}
      </div>
    );
  }
}

ListItemMaritime.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  isExpanded: React.PropTypes.bool,
  isDelayed: React.PropTypes.bool.isRequired,
  isDead: React.PropTypes.bool.isRequired,
  lastUpdateSinceEpoch: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  speed: React.PropTypes.number,
  pos: React.PropTypes.array,
  temp: React.PropTypes.number,
  dist: React.PropTypes.object,
  licensePlate: React.PropTypes.string,
  make: React.PropTypes.string,
  model: React.PropTypes.string,
  year: React.PropTypes.string,
  ignitionOn: React.PropTypes.number,
  isDelayedWithIgnitionOff: React.PropTypes.bool.isRequired,
};

const PureListItemMaritime = pure(ListItemMaritime);

export default PureListItemMaritime;
