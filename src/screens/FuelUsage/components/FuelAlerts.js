import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import DashboardElements from 'components/DashboardElements';
import pure from 'recompose/pure';

import { theme } from 'configs';

const tableCellCardTheftInv = {
  backgroundColor: 'white',
  color: theme.palette.alertColor,
};
const tableCellCardRefuelInv = {
  backgroundColor: 'white',
  color: theme.palette.dachboardElementColor,
};

const inClasses = StyleSheet.create({
  tableHead: {
    color: theme.palette.dachboardElementColor,
    height: '32px',
    padding: '4px 16px',
    margin: '4px',
  },
  tableCellAlerts: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 8px',
  },
  subText: {
    fontSize: 'small',
    lineHeight: 'initial',
    // lineBreak: normal;
    textAlign: 'start',
  },
  subBadge: {
    backgroundColor: 'white',
    width: '56px',
    minWidth: '56px',
    height: '56px',
    lineHeight: '56px',
    borderRadius: '50%',
  },

  container: {
    marginTop: '32px',
  },
});

const FuelConsumption = () => {
  const headClass = css(inClasses.tableHead);
  const classNameAltrs = css(inClasses.tableCellAlerts);
  return (
    <div className={css(inClasses.container)}>
      <table >
        <tr>
          <td className={headClass} />
          <td className={headClass}>Total liters</td>
          <td className={headClass}>% of Fuel Consumption</td>
        </tr>
        <tr>
          <td><div className={classNameAltrs}>
            <div className={css(inClasses.subText)}>Number of Fuel Loss Alerts</div>
            <div className={css(inClasses.subBadge)} style={tableCellCardTheftInv}>1</div>
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
            <div className={css(inClasses.subBadge)} style={tableCellCardRefuelInv}>5</div>
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
      </table>
    </div>
  );
};

FuelConsumption.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default pure(FuelConsumption);
