import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import DashboardElements from 'components/DashboardElements';

//
//
// import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import { theme } from 'configs';

import classes from 'components/DashboardElements/classes';

// import classes from './classes';

function calcPerc(value, total) {
  if (total > 0) {
    return `${((100 * value) / total).toFixed(1)}%`;
  }
  return '0%';
}

const inClasses = StyleSheet.create({
  tableCellDescr: {
    padding: '4px 16px',
    textAlign: 'right',
    fontWeight: 'bold',
    color: theme.palette.dachboardElementColor,
  },
  container: {
    marginTop: '32px',
  },
});

const FuelConsumption = ({ fleetOverviewData }) => {
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  const ltrPerKm = fleetOverviewData.totalDistance
    ? fleetOverviewData.totalFuel / fleetOverviewData.totalDistance
    : 0;
  return (
    <div className={css(inClasses.container)}>
      <div className={css(classes.dataItemTitleDark)}>
        {'Fleet wide fuel consumption'}
      </div>
      <table>
        <tbody>
          <tr>
            <td className={css(inClasses.tableCellDescr)}>Total Fuel Consumption</td>
            <DashboardElements.TableDataCell
              dataString={fleetOverviewData.totalFuel.toFixed(1).toString()}
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString={ltrPerKm.toFixed(1).toString()}
              dataUnits="Ltr/Km"
            />
          </tr>
          <tr>
            <td />
            <td className={css(inClasses.tableCellDescr)} style={{ fontWeight: 'normal', padding: '12px 0 0', textAlign: 'center' }}>Total Litres</td>
            <td className={css(inClasses.tableCellDescr)} style={{ fontWeight: 'normal', padding: '12px 0 0', textAlign: 'center' }}>% of Fuel Consumption</td>
          </tr>
          <tr>
            <td className={css(inClasses.tableCellDescr)}>Estimated Fuel Loss</td>
            <DashboardElements.TableDataCell
              dataString={fleetOverviewData.totalLoss.toFixed(1).toString()}
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString={calcPerc(fleetOverviewData.totalLoss, fleetOverviewData.totalFuel)}
              style={{ backgroundColor: theme.palette.alertColor }}
            />
          </tr>
          <tr>
            <td className={css(inClasses.tableCellDescr)}>Estimated Refuel</td>
            <DashboardElements.TableDataCell
              dataString={fleetOverviewData.totalGain.toFixed(1).toString()}
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString={calcPerc(fleetOverviewData.totalGain, fleetOverviewData.totalFuel)}
              style={{ backgroundColor: theme.palette.okColor }}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// TODO: defaine the shape separetly, DRY
FuelConsumption.propTypes = {
  fleetOverviewData: PropTypes.shape({
    avgSpeed: PropTypes.number,
    idleOver30Min: PropTypes.number,
    idleUnder30Min: PropTypes.number,
    normalDriving: PropTypes.number,
    totalDistance: PropTypes.number,
    totalDrivingTime: PropTypes.number,
    totalIdleTime: PropTypes.number,
    totalRunningTime: PropTypes.number,
    vehicleCount: PropTypes.number,
  }).isRequired,
};

// const mapState = state => ({
//   vehicles: fromFleetReducer.getVehiclesExSorted(state),
//   fleetOverviewData: getFleetOverView(state),
//   // selectedVehicleId: ctxGetSelectedVehicleId(state),
//   // getVehicleById: getVehicleByIdFunc(state),
// });
// const mapDispatch = {
//   fetchLogs: logActions.fetchLogs,
//   fetchFleetOverview,
// };

// export default connect(mapState, mapDispatch)(pure(FuelConsumption));

export default pure(FuelConsumption);

