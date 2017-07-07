//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { metersToKmString, speedToString, msToTimeIntervalString,
  dateToHHMM, temperatureToString } from 'utils/convertors';

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
const totalRowStyle = { WebkitPrintColorAdjust: 'exact', backgroundColor: 'beige', fontWeight: 'bold' };
// import classes from './classes';

const cellStyle = {
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
  fontSize: '11px',
};

const TotalRow = ({
  aTotal,
}) => (
  <TableRow className={styles.row} style={btmColorStyle}>
    <TableRowColumn style={cellStyle}>{aTotal.dateMoment !== undefined ? aTotal.dateMoment.toDate().toLocaleDateString() : 'Grand Total'}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{msToTimeIntervalString(aTotal.calculatedRestMs)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{msToTimeIntervalString(aTotal.calculatedOperationalDurationMs)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{msToTimeIntervalString(aTotal.calculatedIdleDurationMs)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{metersToKmString(aTotal.calculatedDistanceM)}</TableRowColumn>
    {/* <TableRowColumn style={cellStyle}>{speedToString(reportFrame.totalMaxSpeed)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{speedToString(reportFrame.totalAvgSpeed)}</TableRowColumn>*/}
  </TableRow>
);

TotalRow.propTypes = {
  aTotal: React.PropTypes.object.isRequired,
};


const UglyTable = ({
  vehicleId,
  getSoloReportById,
}) => {
  const reportFrame = getSoloReportById(vehicleId);
  if (reportFrame === null) {
    return false;
  }
  const totals = reportFrame.perDayTotals.map(aTotal => <TotalRow key={aTotal.dateMoment.valueOf()} aTotal={aTotal} />);
  totals.push(<TotalRow key={0} aTotal={reportFrame.grandTotal} />);
  const noBgdStyle = { backgroundColor: 'transparent' };
  return (
    <Layout.Content style={{ alignItems: 'center' }}>
      <Table selectable={false} style={noBgdStyle}>
        <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false} style={noBgdStyle}>
          <TableRow style={btmColorStyle}>
            <TableHeaderColumn style={cellStyle}>Date</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>Rest Duration</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>Operation Duration</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>Idle</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>Dist</TableHeaderColumn>
            {/*<TableHeaderColumn style={cellStyle}>MaxV</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>AvgV</TableHeaderColumn>*/}
          </TableRow>
        </TableHeader>
        <TableBody style={noBgdStyle}>
          {totals}
        </TableBody>
      </Table>
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
