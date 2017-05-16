//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Layout from 'components/Layout';
import Divider from 'material-ui/Divider';
import ItemProperty from './DetailItemProperty';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import { getInstanceExecReportFrameById } from './../services/reducer';

// import classes from './classes';

const SoloDetails = ({
  vehicleId,
  getSoloReportById,
  getVehicleById,
}) => {
  const theVehicle = getVehicleById(vehicleId);
  const reportFrame = getSoloReportById(vehicleId);
  if (theVehicle === null || reportFrame === null) {
    return false;
  }
  return (
    <Layout.Content>
      <ItemProperty
        title={'driving Time'}
        value={reportFrame.idiling.drivingTime}
      />
      <ItemProperty
        title={'ignOffWhileStopped Time'}
        value={reportFrame.idiling.ignOffWhileStopped}
      />
      <ItemProperty
        title={'ignOn Time'}
        value={reportFrame.idiling.ignOn}
      />
      <ItemProperty
        title={'ignOnWhileStopped Time'}
        value={reportFrame.idiling.ignOnWhileStopped}
      />
      <ItemProperty
        title={'stopped Time'}
        value={reportFrame.idiling.stoppedTime}
      />
      <Divider />
      <ItemProperty
        title={'Odometr Total'}
        value={(reportFrame.distTotal / 1000).toFixed(3)}
      />
      <ItemProperty
        title={'Odometr Last Trip'}
        value={(reportFrame.distLastTrip / 1000).toFixed(3)}
      />
      <ItemProperty
        title={'Distance'}
        value={reportFrame.milageDistance.toFixed(3)}
      />
      <Divider />
      <ItemProperty
        title={'CalculatedDistance'}
        value={(reportFrame.calculatedDistanceM / 1000).toFixed(3)}
      />
      <ItemProperty
        title={'Samples'}
        value={reportFrame.numberOfPosSamples}
      />
      <ItemProperty
        title={'Vechicle Id'}
        value={theVehicle.id}
      />
    </Layout.Content>
  );
};

SoloDetails.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,

  getSoloReportById: React.PropTypes.func.isRequired,
  getVehicleById: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
  getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(SoloDetails));
