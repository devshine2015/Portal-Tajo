//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Layout from 'components/Layout';
import Divider from 'material-ui/Divider';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import { getInstanceExecReportFrameById } from './../services/reducer';

// import classes from './classes';

const SoloHeader = ({
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
      <Layout.Header
        label={theVehicle.original.name}
        style={{ textAlign: 'center', paddingLeft: 0 }}
        labelStyle={{ color: 'rgba(0, 0, 0, 0.5)' }}
      />
      <div style={{ textAlign: 'center', paddingTop: 12 }}>
        <span >
          Licence Plate
        </span>
        <span style={{ paddingLeft: 8, fontWeight: 'bolder' }}>
          {theVehicle.original.licensePlate}
        </span>
      </div>
      <div style={{ textAlign: 'center', paddingTop: 12, paddingBottom: 32 }}>
        <span >
          {`Report From: ${reportFrame.dateFrom.toLocaleString()} To: ${reportFrame.dateTo.toLocaleString()}`}
        </span>
      </div>
      <Divider />
    </Layout.Content>
  );
};


SoloHeader.propTypes = {
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

export default connect(mapState, mapDispatch)(pure(SoloHeader));
