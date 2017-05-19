//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Layout from 'components/Layout';
import ItemProperty from './DetailItemProperty';
import { metersToKmString, speedToString, msToTimeIntervalString } from 'utils/convertors';

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
    <Layout.Content style={{ alignItems: 'center' }}>
      <table style={{ width: 400, border: 'solid 1px #aaa' }}>
        {/*<ItemProperty
          title={'Driving Time'}
          value={msToTimeIntervalString(reportFrame.idiling.drivingTime)}
        />
        <ItemProperty
          title={'Stopped Time'}
          value={msToTimeIntervalString(reportFrame.idiling.stoppedTime)}
        />
        <ItemProperty
          title={'IgnOn Time'}
          value={msToTimeIntervalString(reportFrame.idiling.ignOn)}
        />
        <ItemProperty
          title={'IgnOn Stopped Time'}
          value={msToTimeIntervalString(reportFrame.idiling.ignOnWhileStopped)}
        />
        <ItemProperty
          title={'IgnOff Stopped Time'}
          value={msToTimeIntervalString(reportFrame.idiling.ignOffWhileStopped)}
        />*/}
        <ItemProperty
          title={'Odometr Total'}
          value={metersToKmString(reportFrame.distTotal)}
        />
        <ItemProperty
          title={'Odometr Last Trip'}
          value={metersToKmString(reportFrame.distLastTrip)}
        />
        <ItemProperty
          title={'Distance'}
          value={`${reportFrame.milageDistance.toFixed(1)} km`}
        />
        {/*<ItemProperty
          title={'CalculatedDistance'}
          value={(reportFrame.calculatedDistanceM / 1000).toFixed(3)}
        />*/}
        {/*<ItemProperty
          title={'Samples'}
          value={reportFrame.numberOfPosSamples}
        />*/}
        {/*<ItemProperty
          title={'Vechicle Id'}
          value={theVehicle.id}
        />*/}
      </table>
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
