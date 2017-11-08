import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { StyleSheet, css } from 'aphrodite/no-important';

import {
  getLogEntries,
} from 'services/AlertsSystem/reducers/logReducer';

import { getAlertByKind } from 'services/AlertsSystem/alertKinds';

import classes from 'components/DashboardElements/classes';

// import classes from './classes';

const inClasses = StyleSheet.create({
  tableCell: {
    // height: '64px',
    // lineHeight: '64px',
    // backgroundColor: theme.palette.dachboardElementColor,
    padding: '4px 16px',
    // margin: '4px',
  },
  tableHeader: {
    fontSize: 'small',
  },
  container: {
    // marginTop: '32px',
    margin: '24px',
    padding: '4px',
    /* background-color: aliceblue; */
    border: 'solid rgba(0, 0, 0, 0.22) 1px',
    borderRadius: '3px',
  },
});

const AlertSummaryTable = ({ alerts, myKind }) => {
  const theAlerts = alerts.toJS().filter(alrt => alrt.eventKind === myKind);
  if (theAlerts.length === 0) { return false; }
  const perVehicle = {};
  theAlerts.forEach((alrt) => {
    if (perVehicle[alrt.ownerId] !== undefined) perVehicle[alrt.ownerId].count++;
    else perVehicle[alrt.ownerId] = { count: 1, name: alrt.ownerName };
  });
  const tableData = Object.entries(perVehicle).sort((a, b) => b[1].count - a[1].count)
    .map(
      entry => (<tr>
        <td className={css(inClasses.tableCell)}>{entry[1].count}</td>
        <td className={css(inClasses.tableCell)}>{entry[1].name}</td>
      </tr>));

  // const tableData = theAlerts.map(alrt => (<tr>
  //   <td>count</td>
  //   <td>{alrt.ownerName}</td>
  // </tr>));
  const alertData = getAlertByKind(myKind);
  return (
    <div className={css(inClasses.container)}>
      <div className={css(classes.dataItemTitleDark)}>
        {alertData.niceName}
      </div>
      <table >
        <tr>
          <th className={css(inClasses.tableHeader)}>Count</th>
          <th className={css(inClasses.tableHeader)}>Vehicle Name</th>
        </tr>
        {tableData}
      </table>
    </div>
  );
};

AlertSummaryTable.propTypes = {
  myKind: PropTypes.string.isRequired,
  alerts: PropTypes.array.isRequired,
};
// export default JobsChart;
const mapState = state => ({
  alerts: getLogEntries(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
  // getVehicleById: getVehicleByIdFunc(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(AlertSummaryTable));
