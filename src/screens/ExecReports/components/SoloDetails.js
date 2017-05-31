//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Layout from 'components/Layout';
import { metersToKmString, msToTimeIntervalString } from 'utils/convertors';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import { getInstanceExecReportFrameById } from './../services/reducer';

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const noBgdStyle = { backgroundColor: 'transparent' };
const btmColorStyle = { borderBottomColor: 'gray' };

const cellStyle = {
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
};
const timeCellStyle = {
  // width: '20%',
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
};
const DataRow = ({
  title,
  value,
}) => (
  <TableRow style={btmColorStyle}>
    <TableRowColumn style={timeCellStyle}>{title}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{value}</TableRowColumn>
  </TableRow>
);

DataRow.propTypes = {
  title: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
};

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
      <Table style={noBgdStyle}>
        <TableBody>

          <DataRow
            title={'Trips'}
            value={reportFrame.getValidTrips().length}
          />
          <DataRow
            title={'Duration'}
            value={msToTimeIntervalString(reportFrame.durationMs)}
          />
          <DataRow
            title={'StopsDuration'}
            value={msToTimeIntervalString(reportFrame.totalStoOverDurationMs)}
          />
          <DataRow
            title={'TripsDuration'}
            value={msToTimeIntervalString(reportFrame.totalTripDurationMs)}
          />
          <DataRow
            title={'Driving Time'}
            value={msToTimeIntervalString(reportFrame.idiling.drivingTime)}
          />
          <DataRow
            title={'Stopped Time'}
            value={msToTimeIntervalString(reportFrame.idiling.stoppedTime)}
          />
          <DataRow
            title={'IgnOn Time'}
            value={msToTimeIntervalString(reportFrame.idiling.ignOn)}
          />
          <DataRow
            title={'IgnOn Stopped Time'}
            value={msToTimeIntervalString(reportFrame.idiling.ignOnWhileStopped)}
          />
          <DataRow
            title={'IgnOff Stopped Time'}
            value={msToTimeIntervalString(reportFrame.idiling.ignOffWhileStopped)}
          />
          <DataRow
            title={'Distance'}
            value={`${reportFrame.milageDistance.toFixed(1)} km`}
          />
          <DataRow
            title={'Odometr Total'}
            value={metersToKmString(reportFrame.distTotal)}
          />
          <DataRow
            title={'Odometr Last Trip'}
            value={metersToKmString(reportFrame.distLastTrip)}
          />
          {/* <ItemProperty
          title={'CalculatedDistance'}
          value={(reportFrame.calculatedDistanceM / 1000).toFixed(3)}
        />*/}
          <DataRow
            title={'Samples pos/all'}
            value={`${reportFrame.numberOfPosSamples} / ${reportFrame.numberOfSamples}`}
          />
          {/* <ItemProperty
          title={'Vechicle Id'}
          value={theVehicle.id}
        />*/}
        </TableBody>
      </Table>
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
