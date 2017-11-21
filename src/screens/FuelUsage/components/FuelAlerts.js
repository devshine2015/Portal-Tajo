import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import cs from 'classnames';

//
//
// import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import { theme } from 'configs';

import classes from 'components/DashboardElements/classes';

// import classes from './classes';

// const tableCellCard = {
// };

const tableCellCardTheft = {
  backgroundColor: theme.palette.alertColor,
};
const tableCellCardRefuel = {
  backgroundColor: theme.palette.dachboardElementColor,
};

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
  tableCellCard: {
    minHeight: '64px',
    lineHeight: '64px',
    backgroundColor: theme.palette.dachboardElementColor,
    padding: '4px 16px',
    margin: '4px',
  },
  tableCellDescr: {
    padding: '4px 16px',
    textAlign: 'right',
    fontWeight: 'bold',
    color: theme.palette.dachboardElementColor,
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
  const className = css(classes.dataItemContainer, classes.dataItemValueContainer, inClasses.tableCellCard);
  const classNameAltrs = cs(className, css(inClasses.tableCellAlerts));
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  return (
    <div className={css(inClasses.container)}>
      {/* <div className={css(classes.dataItemTitleDark)}>
        {'Fleet wide fuel consumption'}
      </div> */}
      <table >
        <tr>
          <td className={headClass} />
          <td className={headClass}>Total liters</td>
          <td className={headClass}>% of Fuel Consumption</td>
          {/* <td className={headClass}>Approx Monetary Value</td> */}
        </tr>
        <tr>
          <td><div className={classNameAltrs} style={tableCellCardTheft}>
            <div className={css(inClasses.subText)}>Number of Fuel Loss Alerts</div>
            <div className={css(inClasses.subBadge)} style={tableCellCardTheftInv}>1</div>
          </div></td>
          <td><div className={className} style={tableCellCardTheft}>20 Ltr</div></td>
          <td><div className={className} style={tableCellCardTheft}>5.7%</div></td>
          {/* <td><div className={className} style={tableCellCardTheft}>14840 Kyat</div></td> */}
        </tr>
        <tr>
          <td><div className={classNameAltrs} style={tableCellCardRefuel}>
            <div className={css(inClasses.subText)}>Number of Refuel Alerts </div>
            <div className={css(inClasses.subBadge)} style={tableCellCardRefuelInv}>5</div>
          </div></td>
          <td><div className={className} style={tableCellCardRefuel}>165 Ltr</div></td>
          <td><div className={className} style={tableCellCardRefuel}>54.2%</div></td>
          {/* <td><div className={className} style={tableCellCardRefuel}>129730 Kyat</div></td> */}
        </tr>
      </table>
    </div>
  );
};

FuelConsumption.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default pure(FuelConsumption);
