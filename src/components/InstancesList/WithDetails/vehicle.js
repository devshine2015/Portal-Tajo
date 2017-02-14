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

import { isEscape } from 'configs';
import { vehicleShape } from 'services/FleetModel/PropTypes';

import stylesBase from '../styles.css';
import styles from './styles.css';

const NEVER_REPORTED = 'never reported - check device';

const Icon = ({
  activityStatus,
  isDelayedWithIgnitionOff,
}) => {
  let icon = null;

  if (activityStatus === 'dead') {
    icon = <AlertIcon color={yellow700} />;
  } else if (isEscape && isDelayedWithIgnitionOff) {
    icon = <AlertLagIcon color={blueGrey200} />;
  } else if (activityStatus === 'delayed') {
    icon = <AlertLagIcon color={yellow700} />;
  }

  return (
    <div className={styles.indicator}>
      { icon }
    </div>
  );
};

Icon.propTypes = {
  activityStatus: React.PropTypes.oneOf([
    'ok', 'dead', 'delayed',
  ]).isRequired,
  isDelayedWithIgnitionOff: React.PropTypes.bool.isRequired,
};

const Warn = ({
  activityStatus,
  isExpanded = false,
  updateDate,
}) => {
  let infoStr = '';

  if (activityStatus === 'dead') {
    infoStr = NEVER_REPORTED;
  } else if (activityStatus === 'delayed') {
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
  activityStatus: React.PropTypes.oneOf([
    'ok', 'dead', 'delayed',
  ]).isRequired,
  isExpanded: React.PropTypes.bool,
  updateDate: React.PropTypes.number.isRequired,
};

class ListItemVehicle extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.vehicle.id);
  }

  inActivityIndicator() {
    const { vehicle, isExpanded } = this.props;

    if (vehicle.activityStatus === 'ok') return null;

    return (
      <Warn
        isExpanded={isExpanded}
        activityStatus={vehicle.activityStatus}
        updateDate={vehicle.lastUpdateSinceEpoch}
      />
    );
  }

  renderDetails() {
    if (!this.props.isExpanded) return null;

    return (
      <div>
        <Divider />
        <ItemProperty
          title="Speed"
          value={`${this.props.vehicle.speed.toFixed(1)} km/h`}
        />
        {this.props.vehicle.temp &&
          <ItemProperty
            title="Temperature"
            value={`${this.props.vehicle.temp.toFixed(1)}\xB0 C`}
          />
        }
      </div>
    );
  }

  renderMoreDetails() {
    if (!this.props.isExpanded) return null;

    const { vehicle } = this.props;

    return (
      <div>
        <Divider />
        <ItemProperty
          title="License Plate"
          value={vehicle.original.licensePlate}
        />
        <ItemProperty
          title="Make"
          value={vehicle.original.make}
        />
        <ItemProperty
          title="Model"
          value={vehicle.original.model}
        />
        <ItemProperty
          title="Year"
          value={vehicle.original.year}
        />
        <Divider />
        <ItemProperty
          title="lat"
          value={vehicle.pos[0].toFixed(6)}
        />
        <ItemProperty
          title="lon"
          value={vehicle.pos[1].toFixed(6)}
        />
      </div>
    );
  }

  render() {
    const className = cs(stylesBase.listItemInn, {
      [styles.listItemInn_expanded]: this.props.isExpanded,
    });
    const { vehicle } = this.props;
    const needIndicator = vehicle.activityStatus !== 'ok' || vehicle.isDelayedWithIgnitionOff;

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        <h1>
          { isEscape ? `${vehicle.original.name} ig:${vehicle.ignitionOn}` : vehicle.original.name }
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
            activityStatus={vehicle.activityStatus}
            isDelayedWithIgnitionOff={vehicle.isDelayedWithIgnitionOff}
          />
        )}
      </div>
    );
  }
}

ListItemVehicle.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  isExpanded: React.PropTypes.bool,
  vehicle: vehicleShape.isRequired,
};

const PureListItemVehicle = pure(ListItemVehicle);

export default PureListItemVehicle;
