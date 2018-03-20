import React from 'react';
import { css } from 'aphrodite/no-important';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';

import DashboardElements from 'components/DashboardElements';
import { theme } from 'configs';
import { numberToFixedString } from 'utils/convertors';

import inClasses from './classes';

import { summarizeFuelAlerts } from './../utils/alertsSummaryHelper';

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

  const alertsSummary = summarizeFuelAlerts(vehicleAlerts, totalConsumption);

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
              dataString={numberToFixedString(alertsSummary.lossAmount)}
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
              dataString={numberToFixedString(alertsSummary.gainAmount)}
              dataUnits="ltr"
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
