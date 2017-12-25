import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import pure from 'recompose/pure';

import TheMap from 'containers/Map/MapContainer';
// import LabelMarker from 'containers/Map/OnMapElements/LabelMarker';
import FuelMarker from 'containers/Map/OnMapElements/FuelEventMarker';
import { mapStoreSetPan } from 'containers/Map/reducerAction';

import { getVehiclesExSorted } from '../../../services/FleetModel/reducer';
import { getFuelReportForVehicle, getFuelReportTimeRange } from './../services/reducer';


import inClasses from './classes';

// import { makeMaintenanceData,
//   MaintenanceStatus } from './../utils/maintenanceHelper';

class FuelMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapMarkers = null;
    this.createMarkers(props.vehicles);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.selectedVehicleId !== nextProps.selectedVehicleId
    || this.props.timeRange !== nextProps.timeRange;
  }

  createMarkers(vehicles) {
    this.mapMarkers = vehicles.reduce((acum, aVehicle) => acum.concat(this.createVehicleMarkers(aVehicle.id)), []);
  }

  createVehicleMarkers(theVehicleId) {
    const fuelReport = this.props.getFuelReportForVehicle(theVehicleId);
    return fuelReport.alerts
      .filter(alrt => alrt.position !== undefined)
      .map(alrt =>
        (<FuelMarker
          key={alrt.date}
          theMap={null}
          // label={alrt.liters.toFixed(1)}
          // label={alrt.alertType}
          fuelEvent={alrt}
          latLng={[alrt.position.lat, alrt.position.lng]}
          isSelected={false}
          isHighLighted={this.props.selectedVehicleId === theVehicleId}
          onClick={() => {}}
        />),
      );
  }

  render() {
    this.createMarkers(this.props.vehicles);

    return (
      <div className={css(inClasses.mapContainer)}>
        <TheMap >
          {this.mapMarkers}
        </TheMap>
      </div>
    );
  }
}

FuelMap.propTypes = {
  selectedVehicleId: PropTypes.string,
  getFuelReportForVehicle: PropTypes.func.isRequired,
  vehicles: PropTypes.array.isRequired,
  mapStoreSetPan: PropTypes.func.isRequired,
  timeRange: PropTypes.object.isRequired,
};

FuelMap.defaultProps = {
  theVehicleId: '',
};

const mapState = state => ({
  getFuelReportForVehicle: getFuelReportForVehicle(state),
  vehicles: getVehiclesExSorted(state),
  timeRange: getFuelReportTimeRange(state),
});

const mapDispatch = {
  mapStoreSetPan,
};

export default connect(mapState, mapDispatch)(pure(FuelMap));
