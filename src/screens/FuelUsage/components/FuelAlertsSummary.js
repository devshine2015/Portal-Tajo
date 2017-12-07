import React from 'react';
import { css } from 'aphrodite/no-important';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';

import DashboardElements from 'components/DashboardElements';
import { theme } from 'configs';
import inClasses from '../styles';

const redBadge = {
  backgroundColor: theme.palette.alertColor,
};
const greenBadge = {
  backgroundColor: theme.palette.okColor,
};

// {alertType: "REFUEL", date: "2017-11-26T21:22:20.000+0000", liters: 15.400000000000034}
// {alertType: "LOSS", date: "2017-11-25T01:59:42.000+0000", liters: 11}

const FuelAlertsSummary = ({ vehicleAlerts, totalConsumption }) => {
  const headClass = css(inClasses.tableHead);
  const classNameAltrs = css(inClasses.tableCellAlerts);

  const alertsSummaryInitial =
  { lossCount: 0,
    lossAmount: 0,
    lossPerc: 0,
    gainCount: 0,
    gainAmount: 0,
    gainPerc: 0,
  };
  const summAlerts = (summary, alert) => {
    if (alert.alertType === 'REFUEL') {
      summary.gainCount++;
      summary.gainAmount += alert.liters;
    } else {
      summary.lossCount++;
      summary.lossAmount += alert.liters;
    }
    return summary;
  };

  const alertsSummary = vehicleAlerts.reduce(summAlerts, alertsSummaryInitial);
  if (totalConsumption > 0) {
    alertsSummary.lossPerc = (100 * alertsSummary.lossAmount) / totalConsumption;
    alertsSummary.gainPerc = (100 * alertsSummary.gainAmount) / totalConsumption;
  }

  return (
    <div className={css(inClasses.container)}>
      <div className={css(inClasses.containerHeading)}>Fuel Alerts Summary</div>
      <table >
        <tbody>
          <tr>
            <td className={headClass} />
            <td className={headClass}>Total liters</td>
            <td className={headClass}>% of Fuel Consumption</td>
          </tr>
          <tr>
            <td><div className={classNameAltrs}>
              <div className={css(inClasses.subText)}>Number of Fuel Loss Alerts</div>
              <div className={css(inClasses.subBadge)} style={redBadge}>{alertsSummary.lossCount}</div>
              <div className={css(inClasses.subText)}>Estimated Fuel Loss </div>
            </div></td>
            <DashboardElements.TableDataCell
              dataString={alertsSummary.lossAmount.toFixed(1).toString()}
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString={`${alertsSummary.lossPerc.toFixed(1)}%`}
              style={{ backgroundColor: theme.palette.alertColor }}
            />
          </tr>
          <tr>
            <td><div className={classNameAltrs}>
              <div className={css(inClasses.subText)}>Number of Refuel Alerts </div>
              <div className={css(inClasses.subBadge)} style={greenBadge}>{alertsSummary.gainCount}</div>
              <div className={css(inClasses.subText)}>Estimated Refuel</div>
            </div></td>
            <DashboardElements.TableDataCell
              dataString={alertsSummary.gainAmount.toFixed(1).toString()}
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString={`${alertsSummary.gainPerc.toFixed(1)}%`}
              style={{ backgroundColor: theme.palette.okColor }}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

FuelAlertsSummary.propTypes = {
  vehicleAlerts: PropTypes.array.isRequired,
  totalConsumption: PropTypes.number.isRequired,
};

export default pure(FuelAlertsSummary);
