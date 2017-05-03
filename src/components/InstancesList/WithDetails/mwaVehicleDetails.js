import React from 'react';
import pure from 'recompose/pure';

import { vehicleShape } from 'services/FleetModel/PropTypes';


class MWAVehicleDetails extends React.Component {

  render() {
    const jobsCount = this.props.vehicle.mwa === undefined ? 0 :
        (this.props.vehicle.mwa.jobs === undefined ? 0 :
            this.props.vehicle.mwa.jobs.length);
    const aGreen = '#00c51a';
    const aYellow = '#ffe201';
    const aRed = '#f50000';
    const mwaIdicator = {
      backgroundColor: jobsCount < 4 ? aGreen : (jobsCount < 7 ? aYellow : aRed),
      border: 'solid 1px rgba(255, 255, 255, 0.75)',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      marginTop: '2px',
      float: 'right',
    };
    return (
      <div style={mwaIdicator} />
    );
  }
}

MWAVehicleDetails.propTypes = {
  vehicle: vehicleShape.isRequired,
};

export default pure(MWAVehicleDetails);
