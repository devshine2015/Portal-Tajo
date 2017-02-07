import React from 'react';
import pure from 'recompose/pure';
import cs from 'classnames';
import moment from 'moment';
import { VelocityTransitionGroup } from 'velocity-react';
require('velocity-animate');
require('velocity-animate/velocity.ui');
import Divider from 'material-ui/Divider';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
import AlertLagIcon from 'material-ui/svg-icons/action/watch-later';
import { yellow700, blueGrey200 } from 'material-ui/styles/colors';
import ItemProperty from '../DetailItemProperty';

import {
  speedKmHToKnots,
  decimalDegToDMS,
  kmToNauticalMiles,
} from 'utils/convertors';
import { isEscape } from 'configs';
import { maritimeShape } from 'services/FleetModel/PropTypes';

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
};

Icon.propTypes = {
  isDead: React.PropTypes.bool.isRequired,
  isDelayed: React.PropTypes.bool.isRequired,
  isDelayedWithIgnitionOff: React.PropTypes.bool.isRequired,
};

const Warn = ({
  isDead,
  isDelayed,
  isExpanded = false,
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

Warn.propTypes = {
  isDead: React.PropTypes.bool.isRequired,
  isDelayed: React.PropTypes.bool.isRequired,
  isExpanded: React.PropTypes.bool,
  updateDate: React.PropTypes.number.isRequired,
};

class ListItemMaritime extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.vehicle.id);
  }

  inActivityIndicator() {
    const { vehicle, isExpanded } = this.props;

    if (!vehicle.isDead && !vehicle.isDelayed) return null;

    return (
      <Warn
        isExpanded={isExpanded}
        isDead={vehicle.isDead}
        isDelayed={vehicle.isDelayed}
        updateDate={vehicle.lastUpdateSinceEpoch}
      />
    );
  }

  renderDetails() {
    if (!this.props.isExpanded) return null;

    const { vehicle } = this.props;
    const estimatedTravelNM = kmToNauticalMiles(vehicle.estimatedTravelKm);

    return (
      <div>
        <Divider />
        <ItemProperty
          title="Call Sign"
          value={`${vehicle.original.licensePlate}`}
        />
        <ItemProperty
          title="Tracking Interval"
          value={`${vehicle.trackigInterval}min`}
        />
        <ItemProperty
          title="Speed"
          value={`${speedKmHToKnots(vehicle.speed).toFixed(3)}kn`}
        />
        <ItemProperty
          title="Heading"
          value={`${vehicle.heading}\xB0`}
        />
        <ItemProperty
          title="Latitude"
          value={`${decimalDegToDMS(vehicle.pos[0], false)}`}
        />
        <ItemProperty
          title="Longtitude"
          value={`${decimalDegToDMS(vehicle.pos[1], true)}`}
        />
        <ItemProperty
          title="Time since report"
          value={`${vehicle.timeSinceUpdateMin}min`}
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
    const { vehicle } = this.props;
    const needIndicator = vehicle.isDead || vehicle.isDelayed || vehicle.isDelayedWithIgnitionOff;

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        <h1>
          {vehicle.original.name}
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
            isDead={vehicle.isDead}
            isDelayed={vehicle.isDelayed}
            isDelayedWithIgnitionOff={vehicle.isDelayedWithIgnitionOff}
          />
        )}
      </div>
    );
  }
}

ListItemMaritime.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  isExpanded: React.PropTypes.bool,
  vehicle: maritimeShape.isRequired,
};

const PureListItemMaritime = pure(ListItemMaritime);

export default PureListItemMaritime;
