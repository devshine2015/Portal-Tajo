import React from 'react';
import { css } from 'aphrodite/no-important';
import DashboardElements from 'components/DashboardElements';
import pure from 'recompose/pure';

import { theme } from 'configs';
import inClasses from '../styles';

const redBadge = {
  backgroundColor: 'red',
};
const greenBadge = {
  backgroundColor: 'green',
};

const FuelConsumption = () => {
  const headClass = css(inClasses.tableHead);
  const classNameAltrs = css(inClasses.tableCellAlerts);
  return (
    <div className={css(inClasses.container)}>
      <div className={css(inClasses.containerHeading)}>Fuel Alerts</div>
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
              <div className={css(inClasses.subBadge)} style={redBadge}>1</div>
              <div className={css(inClasses.subText)}>Estimated Fuel Loss </div>
            </div></td>
            <DashboardElements.TableDataCell
              dataString="20"
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString="6.4%"
              style={{ backgroundColor: theme.palette.alertColor }}
            />
          </tr>
          <tr>
            <td><div className={classNameAltrs}>
              <div className={css(inClasses.subText)}>Number of Refuel Alerts </div>
              <div className={css(inClasses.subBadge)} style={greenBadge}>5</div>
              <div className={css(inClasses.subText)}>Estimated Refuel</div>
            </div></td>
            <DashboardElements.TableDataCell
              dataString="238"
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString="36.4%"
              style={{ backgroundColor: theme.palette.okColor }}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

FuelConsumption.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default pure(FuelConsumption);
