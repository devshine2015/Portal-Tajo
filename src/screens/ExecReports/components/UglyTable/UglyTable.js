//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { metersToKmString, speedToString, msToTimeIntervalString, dateToHHMM } from 'utils/convertors';

import Layout from 'components/Layout';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { getInstanceExecReportFrameById } from './../../services/reducer';
import styles from './styles.css';

const btmColorStyle = { borderBottomColor: 'gray' };
// import classes from './classes';

const cellStyle = {
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
};
const nameCellStyle = {
  width: '20%',
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
};

const TripRow = ({
  aTrip,
}) => (
  <TableRow className={styles.row} style={btmColorStyle}>
    <TableRowColumn style={nameCellStyle}>{aTrip.fromStopOwer.address}</TableRowColumn>
    <TableRowColumn style={nameCellStyle}>{aTrip.toStopOver.address}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{dateToHHMM(aTrip.startDate)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{dateToHHMM(aTrip.endDate)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{msToTimeIntervalString(aTrip.durationMs)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{metersToKmString(aTrip.calculatedDistanceM)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{speedToString(aTrip.maxSpeed)}</TableRowColumn>
  </TableRow>
);

TripRow.propTypes = {
  aTrip: React.PropTypes.object.isRequired,
};


const UglyTable = ({
  vehicleId,
  getSoloReportById,
}) => {
  const reportFrame = getSoloReportById(vehicleId);
  if (reportFrame === null) {
    return false;
  }
  const trips = reportFrame.getValidTrips().map(aTrip => <TripRow key={aTrip.startIdx} aTrip={aTrip} />);
  const noBgdStyle = { backgroundColor: 'transparent' };
  return (
    <Layout.Content style={{ alignItems: 'center' }}>
      <Table selectable={false} style={noBgdStyle}>
        <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false} style={noBgdStyle}>
          <TableRow style={btmColorStyle}>
            <TableHeaderColumn style={nameCellStyle}>From</TableHeaderColumn>
            <TableHeaderColumn style={nameCellStyle}>To</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>Start</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>End</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>Duration</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>Distance</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>MaxSpeed</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody style={noBgdStyle}>
          {trips}
        </TableBody>
      </Table>
      {/* <table style={{ border: 'solid 1px #aaa' }}>
        {trips}
      </table>*/}
    </Layout.Content>
  );
};

UglyTable.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getSoloReportById: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(UglyTable));
