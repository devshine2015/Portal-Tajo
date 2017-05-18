//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import moment from 'moment';
import { metersToKmString, speedToString, msToTimeIntervalString } from 'utils/convertors';

import Layout from 'components/Layout';
import Divider from 'material-ui/Divider';
import ItemProperty from './DetailItemProperty';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import { getInstanceExecReportFrameById } from './../services/reducer';

// import classes from './classes';

const valueOrLoading = value => value === -1 ? 'loading...' : value;
const formatKm = value => value === 'loading...' ? value : `${(value / 1000).toFixed(1)} km`;

const TripDetails = ({
  vehicleId,
  reportFrame,
  aTripData,
  getVehicleById,
}) => {
  const theVehicle = getVehicleById(vehicleId);
  if (theVehicle === null) {
    return false;
  }
  return (
    <Layout.Content style={{ alignItems: 'center' }}>
      <div>
        <span >
          Trip from:
        </span>
        <span style={{ paddingLeft: 8, paddingRight: 8, fontWeight: 'bolder' }}>
          {aTripData.startDate.toLocaleTimeString()}
        </span>
        <span >
          to:
        </span>
        <span style={{ paddingLeft: 8, fontWeight: 'bolder' }}>
          {aTripData.endDate.toLocaleTimeString()}
        </span>
      </div>
      {/*<div>
        <span >
          Start Location:
        </span>
        <span style={{ paddingLeft: 8, paddingRight: 8, fontWeight: 'bolder' }}>
          {aTripData.startAddress}
        </span>
      </div>
      <div>
        <span >
          End Location:
        </span>
        <span style={{ paddingLeft: 8, fontWeight: 'bolder' }}>
          {aTripData.endAddress}
        </span>
      </div>*/}
      <table style={{ width: 600, border: 'solid 1px #aaa' }}>
        <ItemProperty
          title={'Start Location'}
          value={aTripData.startAddress}
        />
        <ItemProperty
          title={'End Location'}
          value={aTripData.endAddress}
        />
        <ItemProperty
          title={'Trip Duration'}
          value={msToTimeIntervalString(aTripData.durationMs)}
        />
        <ItemProperty
          title={'Trip Distance'}
          value={metersToKmString(aTripData.calculatedDistanceM)}
        />
        <ItemProperty
          title={'Max Speed'}
          value={speedToString(aTripData.maxSpeed)}
        />
        <ItemProperty
          title={'Samples all/pos'}
          value={`${aTripData.numberOfSamples}/${aTripData.numberOfPosSamples}`}
        />
      </table>
    </Layout.Content>
  );
};

TripDetails.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  reportFrame: React.PropTypes.object.isRequired,
  aTripData: React.PropTypes.object.isRequired,
  getVehicleById: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(TripDetails));
