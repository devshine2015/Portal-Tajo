import React from 'react';
import pure from 'recompose/pure';
import cs from 'classnames';
import { VelocityTransitionGroup } from 'velocity-react';
import Divider from 'material-ui/Divider';
import ItemProperty from '../DetailItemProperty';
import Warn from './Warn';

import {
  speedKmHToKnots,
  decimalDegToDMS,
  kmToNauticalMiles,
} from 'utils/convertors';
import { maritimeShape } from 'services/FleetModel/PropTypes';

import stylesBase from '../styles.css';
import styles from './styles.css';

class ListItemMaritime extends React.Component {

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
