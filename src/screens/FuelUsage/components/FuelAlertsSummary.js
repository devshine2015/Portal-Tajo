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

const FuelAlertsSummary = () => {
  const headClass = css(inClasses.tableHead);
  const classNameAltrs = css(inClasses.tableCellAlerts);

  const lossCount = 0;
  const lossAmount = '0';
  const lossPerc = '0%';
  const gainCount = 0;
  const gainAmount = '0';
  const gainPerc = '0%';

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
              <div className={css(inClasses.subBadge)} style={redBadge}>{lossCount}</div>
              <div className={css(inClasses.subText)}>Estimated Fuel Loss </div>
            </div></td>
            <DashboardElements.TableDataCell
              dataString={lossAmount}
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString={lossPerc}
              style={{ backgroundColor: theme.palette.alertColor }}
            />
          </tr>
          <tr>
            <td><div className={classNameAltrs}>
              <div className={css(inClasses.subText)}>Number of Refuel Alerts </div>
              <div className={css(inClasses.subBadge)} style={greenBadge}>{gainCount}</div>
              <div className={css(inClasses.subText)}>Estimated Refuel</div>
            </div></td>
            <DashboardElements.TableDataCell
              dataString={gainAmount}
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString={gainPerc}
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
};

export default pure(FuelAlertsSummary);
