import React from 'react';
import pure from 'recompose/pure';
import cs from 'classnames';
import { VelocityTransitionGroup } from 'velocity-react';
import Divider from 'material-ui/Divider';
import ItemProperty from '../DetailItemProperty';
import Warn from './Warn';

import { isEscape } from 'configs';
import { vehicleShape } from 'services/FleetModel/PropTypes';

import stylesBase from '../styles.css';
import styles from './styles.css';
import { vehicleDetailsShape } from '../PropTypes';

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

    const speed = `${this.props.vehicle.speed.toFixed(1)} ${this.props.translations.speed_km_h}`;

    return (
      <div>
        <Divider />
        <ItemProperty
          title={ this.props.translations.speed }
          value={ speed }
        />
        {this.props.vehicle.temp &&
          <ItemProperty
            title={ this.props.translations.temperature }
            value={`${this.props.vehicle.temp.toFixed(1)} \xB0C`}
          />
        }
      </div>
    );
  }

  // renderMoreDetails() {
  //   if (!this.props.isExpanded) return null;

  //   const { vehicle } = this.props;

  //   return (
  //     <div>
  //       <Divider />
  //       <ItemProperty
  //         title="License Plate"
  //         value={vehicle.original.licensePlate}
  //       />
  //       <ItemProperty
  //         title="Make"
  //         value={vehicle.original.make}
  //       />
  //       <ItemProperty
  //         title="Model"
  //         value={vehicle.original.model}
  //       />
  //       <ItemProperty
  //         title="Year"
  //         value={vehicle.original.year}
  //       />
  //       <Divider />
  //       <ItemProperty
  //         title="lat"
  //         value={vehicle.pos[0].toFixed(6)}
  //       />
  //       <ItemProperty
  //         title="lon"
  //         value={vehicle.pos[1].toFixed(6)}
  //       />
  //     </div>
  //   );
  // }

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
          { isEscape ? `${vehicle.original.name} ig:${vehicle.ignitionOn}` : vehicle.original.name }
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

ListItemVehicle.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  isExpanded: React.PropTypes.bool,
  vehicle: vehicleShape.isRequired,

  translations: vehicleDetailsShape.isRequired,
};

export default pure(ListItemVehicle);
