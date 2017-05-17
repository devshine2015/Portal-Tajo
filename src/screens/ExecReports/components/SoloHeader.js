//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Layout from 'components/Layout';
import Divider from 'material-ui/Divider';

import { getVehicleByValue } from 'services/FleetModel/utils/vehiclesMap';
import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import { getInstanceExecReportFrameById } from './../services/reducer';

// import classes from './classes';

const SoloHeader = ({
  vehicleId,
  getSoloReportById,
  getVehicleById,
}, context) => {
  const theVehicle = getVehicleById(vehicleId);
  const reportFrame = getSoloReportById(vehicleId);
  if (theVehicle === null || reportFrame === null) {
    return false;
  }
  const hPadding = 7;
  const kindData = getVehicleByValue(theVehicle.original.kind);
  const kindLabel = context.translator.getTranslation(kindData.value.toLowerCase());
  // const propDivStyle = { textAlign: 'center', paddingTop: hPadding };
  const propDivStyle = { paddingLeft: 100, paddingTop: hPadding };
  return (
    <Layout.Content style={{ paddingBottom: 32 }}>
      <Layout.Header
        label={theVehicle.original.name}
        style={{ textAlign: 'center', paddingLeft: 0 }}
        labelStyle={{ color: 'rgba(0, 0, 0, 0.5)' }}
      />
      <div style={propDivStyle}>
        <span >
          Kind:
        </span>
        <span style={{ paddingLeft: 8, paddingRight: 12, fontWeight: 'bolder' }}>
          {kindLabel}
        </span>
      </div>
      <div style={propDivStyle}>
        <span >
          Licence Plate:
        </span>
        <span style={{ paddingLeft: 8, fontWeight: 'bolder' }}>
          {theVehicle.original.licensePlate}
        </span>
      </div>
      <div style={propDivStyle}>
        {/*<span >
          {`Make: ${theVehicle.original.make}  Model: ${theVehicle.original.model}  Year: ${theVehicle.original.year}`}
        </span>*/}
        <span >
          Make:
        </span>
        <span style={{ paddingLeft: 8, paddingRight: 12, fontWeight: 'bolder' }}>
          {theVehicle.original.make}
        </span>
        <span >
          Model:
        </span>
        <span style={{ paddingLeft: 8, paddingRight: 12, fontWeight: 'bolder' }}>
          {theVehicle.original.model}
        </span>
        <span >
          Year:
        </span>
        <span style={{ paddingLeft: 8, paddingRight: 12, fontWeight: 'bolder' }}>
          {theVehicle.original.year}
        </span>
      </div>
      {/*<div style={propDivStyle}>
        <span >
          DeviceId:
        </span>
        <span style={{ paddingLeft: 8, fontWeight: 'bolder' }}>
          {theVehicle.original.deviceId}
        </span>
      </div>
      <div style={propDivStyle}>
        <span >
          Id:
        </span>
        <span style={{ paddingLeft: 8, fontWeight: 'bolder' }}>
          {theVehicle.original.id}
        </span>
      </div>*/}
      <div style={propDivStyle}>
        <span >
          Report from:
        </span>
        <span style={{ paddingLeft: 8, paddingRight: 8, fontWeight: 'bolder' }}>
          {reportFrame.dateFrom.toLocaleString()}
        </span>
        <span >
          to:
        </span>
        <span style={{ paddingLeft: 8, fontWeight: 'bolder' }}>
          {reportFrame.dateTo.toLocaleString()}
        </span>
      </div>
      <Divider />
    </Layout.Content>
  );
};

SoloHeader.contextTypes = {
  translator: React.PropTypes.object.isRequired,
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
