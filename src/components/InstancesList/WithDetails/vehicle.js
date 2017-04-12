import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import cs from 'classnames';
import { contextActions } from 'services/Global/actions';
import { mapStoreSetPan } from 'containers/MapFleet/reducerAction';

import { VelocityTransitionGroup } from 'velocity-react';
import Divider from 'material-ui/Divider';
import ItemProperty from '../DetailItemProperty';
import Warn from './Warn';

import { isEscape, isMwa } from 'configs';
import { vehicleShape } from 'services/FleetModel/PropTypes';

import stylesBase from '../styles.css';
import styles from './styles.css';
import { vehicleDetailsShape } from '../PropTypes';
import MwaIdicator from './mwaVehicleDetails';


class ListItemVehicle extends React.Component {

  onClick = () => {
    this.props.selectVehicle(this.props.vehicle.id);
    this.props.mapStoreSetPan([this.props.vehicle.pos]);
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

    const N_A = 'N/A';
    const speed = `${this.props.vehicle.speed.toFixed(1)} ${this.props.translations.speed_km_h}`;
    const fuel = `${this.props.vehicle.fuelNormalized ? this.props.vehicle.fuelNormalized : N_A}`;
    const jobsCount = this.props.vehicle.mwa === undefined ? 0 :
        (this.props.vehicle.mwa.jobs === undefined ? 0 :
            this.props.vehicle.mwa.jobs.length);  

    const license = this.props.vehicle.original !== undefined
        && this.props.vehicle.original.licensePlate !== undefined ?
          this.props.vehicle.original.licensePlate
          : N_A;
    const driverName = this.props.vehicle.original !== undefined
        && this.props.vehicle.original.meta !== undefined
        && this.props.vehicle.original.meta.driverName !== undefined ?
          this.props.vehicle.original.meta.driverName
          : N_A;
    return (
      <div>
        <Divider />
        <ItemProperty
          title={ this.props.translations.speed }
          value={ speed }
        />
        { isMwa &&
          <ItemProperty
            title={ this.props.translations.mwa_vehicle_group }
            value={ '01' }
          />
        }
        { isMwa &&
          <ItemProperty
            title={ this.props.translations.license_plate }
            value={ license }
          />
        }
        { isMwa &&
          <ItemProperty
            title={ this.props.translations.driver_name }
            value={ driverName }
          />
        }
        { isMwa &&
          <ItemProperty
            title={ this.props.translations.mwa_n_jobs }
            value={ jobsCount }
          />
        }
        { isMwa &&
          <ItemProperty
            title={ this.props.translations.door_open_close }
            value={ N_A }
          />
        }
        { isMwa &&
          <ItemProperty
            title={ this.props.translations.engine_status }
            value={ N_A }
          />
        }
        { isMwa &&
          <ItemProperty
            title={ this.props.translations.fuel_level }
            value={ fuel }
          />
        }
        {this.props.vehicle.temp &&
          <ItemProperty
            title={ this.props.translations.temperature }
            value={`${this.props.vehicle.temp.toFixed(1)} \xB0C`}
          />
        }
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
          { isEscape ? `${vehicle.original.name} ig:${vehicle.ignitionOn}` : vehicle.original.name }
        </h1>

        { this.inActivityIndicator() }
        { isMwa && !this.props.isExpanded
          && <MwaIdicator vehicle={vehicle} />
        }
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
  selectVehicle: React.PropTypes.func.isRequired,
  isExpanded: React.PropTypes.bool,
  vehicle: vehicleShape.isRequired,
  mapStoreSetPan: React.PropTypes.func.isRequired,

  translations: vehicleDetailsShape.isRequired,
};

const mapState = (state) => ({
});
const mapDispatch = {
  selectVehicle: contextActions.ctxSelectVehicle,
  mapStoreSetPan,
};

export default connect(mapState, mapDispatch)(pure(ListItemVehicle));
