import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import pure from 'recompose/pure';
import moment from 'moment';

import TheMap from 'containers/Map/MapContainer';
// import LabelMarker from 'containers/Map/OnMapElements/LabelMarker';
import FuelMarker from 'containers/Map/OnMapElements/FuelEventMarker';
import { mapStoreSetPan } from 'containers/Map/reducerAction';

import { getVehiclesExSorted } from '../../../services/FleetModel/reducer';
import { getFuelReportForVehicle, getFuelReportTimeRange } from './../services/reducer';


import inClasses from './classes';

class FuelMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapMarkers = null;
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.selectedVehicleId !== nextProps.selectedVehicleId) || (this.props.timeRange !== nextProps.timeRange);
  }

  createVehicleMarkers(theVehicleId) {
    const fuelReport = this.props.getFuelReportForVehicle(theVehicleId);
    // debugger;
    return fuelReport.alerts
      .filter(alrt => alrt.position !== undefined)
      .map((alrt, i) =>
        (<FuelMarker
          // be careful should create unique key, here here copied elems
          key={`${moment(alrt.date).utc().format('YYYY-MM-DDTHH-mm-ss-SSS')}&${i}`}
          theMap={null}
          fuelEvent={alrt}
          latLng={[alrt.position.lat, alrt.position.lng]}
          isSelected={false}
          isHighLighted={this.props.selectedVehicleId === theVehicleId}
          onClick={() => {}}
        />),
      );
  }

  render() {
    return (
      <div className={css(inClasses.mapContainer)}>
        <TheMap />
      </div>
    );
  }
}

FuelMap.propTypes = {
  selectedVehicleId: PropTypes.string,
  getFuelReportForVehicle: PropTypes.func.isRequired,
  vehicles: PropTypes.array.isRequired,
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
