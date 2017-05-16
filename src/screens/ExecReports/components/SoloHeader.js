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

const SoloHeader = ({
  vehicleId,
  // getSoloReportById,
  getVehicleById,
}) => {
  const theVehicle = getVehicleById(vehicleId);
  if (theVehicle === null) {
    return false;
  }
  return (
    <Layout.Content>
      <Layout.Header label={theVehicle.original.name} />
      <Divider />
      <ItemProperty
        title={'Licence Plate'}
        value={theVehicle.original.licensePlate}
      />
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
