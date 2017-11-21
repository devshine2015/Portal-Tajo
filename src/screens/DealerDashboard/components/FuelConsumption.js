import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

//
//
// import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import cs from 'classnames';
import { theme } from 'configs';

import classes from 'components/DashboardElements/classes';

// import classes from './classes';

const tableCellCard = {
};

const tableCellCardTheft = {
  backgroundColor: theme.palette.alertColor,
};
const tableCellCardRefuel = {
  backgroundColor: theme.palette.dachboardElementColor,
};

const inClasses = StyleSheet.create({
  tableCellCard: {
    height: '64px',
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
  container: {
    marginTop: '32px',
  },
});

const FuelConsumption = () => {
  const className = cs(css(classes.dataItemContainer), css(classes.dataItemValueContainer), css(inClasses.tableCellCard));
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  return (
    <div className={css(inClasses.container)}>
      <div className={css(classes.dataItemTitleDark)}>
        {'Fleet wide fuel consumption'}
      </div>
      <table >
        <tr>
          <td className={css(inClasses.tableCellDescr)}>Total Fuel Consumption</td>
          <td><div className={className} style={tableCellCard}>350 Ltr</div></td>
          <td><div className={className} style={tableCellCard}>2.8 Ltr/Km</div></td>
        </tr>
        <tr>
          <td />
          <td className={css(inClasses.tableCellDescr)} style={{ fontWeight: 'normal', padding: '12px 0 0', textAlign: 'center' }}>Total Litres</td>
          <td className={css(inClasses.tableCellDescr)} style={{ fontWeight: 'normal', padding: '12px 0 0', textAlign: 'center' }}>% of Fuel Consumption</td>
        </tr>
        <tr>
          <td className={css(inClasses.tableCellDescr)}>Estimated Fuel Loss</td>
          <td><div className={className} style={tableCellCardTheft}>20 Ltr</div></td>
          <td><div className={className} style={tableCellCardTheft}>5.7%</div></td>
        </tr>
        <tr>
          <td className={css(inClasses.tableCellDescr)}>Estimated Refuel</td>
          <td><div className={className} style={tableCellCardRefuel}>175 Ltr</div></td>
          <td><div className={className} style={tableCellCardRefuel}>50%</div></td>
        </tr>
      </table>
    </div>
  );
};

FuelConsumption.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default pure(FuelConsumption);
