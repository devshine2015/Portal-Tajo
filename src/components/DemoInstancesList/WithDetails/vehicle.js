import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import { contextActions } from 'services/Global/actions';
import { mapStoreSetPan } from 'containers/Map/reducerAction';
import { vehicleShape } from 'services/FleetModel/PropTypes';
import { getDriverByIdFunc } from 'services/FleetModel/reducer';
import stylesBase from '../styles.css';
import styles from './styles.css';
import classnames from 'classnames';
import { vehicleDetailsShape } from '../PropTypes';

class ListItemVehicle extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.isExpanded !== nextProps.isExpanded
      || this.props.vehicle.filteredOut !== nextProps.vehicle.filteredOut
      // always update the expanded vehicle - to show all the stats
      || nextProps.isExpanded
      // TODO: no MWA checks here
      || this.props.vehicle !== undefined && nextProps.vehicle !== undefined && this.props.vehicle.mwa !== nextProps.vehicle.mwa;
  }
  onClick = () => {
    this.props.selectVehicle(this.props.vehicle.id);
    this.props.mapStoreSetPan([this.props.vehicle.pos]);
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
        <div className={styles.imageWrapper}>
          <img
            src={require('assets/images/demo/combined-shape.png')}
            alt="vehicle"
          />
        </div>
        <div className={styles.nameWrapper}>
          <h2>
            { vehicle.original.name }
          </h2>
          <span className={styles.trips}>{this.props.vehicle.original.trips} trips</span>
        </div>
        <div className={classnames(styles.selectedCircle, {[styles.selectedCircleActive]: this.props.isExpanded})}></div>
      </div>
    );
  }
}

ListItemVehicle.propTypes = {
  selectVehicle: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  vehicle: vehicleShape.isRequired,
  mapStoreSetPan: PropTypes.func.isRequired,
  driverById: PropTypes.func.isRequired,

  translations: vehicleDetailsShape.isRequired,
};

ListItemVehicle.defaultProps = {
  isExpanded: false,
};

const mapState = state => ({
  driverById: getDriverByIdFunc(state),
});
const mapDispatch = {
  selectVehicle: contextActions.ctxSelectVehicle,
  mapStoreSetPan,
};

export default connect(mapState, mapDispatch)(ListItemVehicle);
