import React from 'react';
import { StyleSheet } from 'aphrodite/no-important';

//
//
import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import classes from 'components/DashboardElements/classes';

// import classes from './classes';

const tableCellDescr = {
  padding: '4px 16px',
};
const tableCellCard = {
};

const tableCellCardTheft = {
  backgroundColor: '#f44336',
};
const tableCellCardRefuel = {
  backgroundColor: '#3f51b5',
};

const inClasses = StyleSheet.create({
  tableCellCard: {
    height: '64px',
    lineHeight: '64px',
    backgroundColor: '#439e47',
    color: 'white',
    padding: '4px 16px',
    margin: '4px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 'xx-large',
  },
  tableCellDescr: {
    padding: '4px 16px',
    textAlign: 'right',
  },
  container: {
    marginTop: '32px',
  },
});

const FuelConsumption = ({
}) => {
  const className = cs(css(inClasses.tableCellCard), css(classes.dataItemContainer));
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  return (
    <div className={css(inClasses.container)}>
      <div className={css(classes.dataItemTitleDark)}>
        {'Fleet wide fuel consumption'}
      </div>
      <table >
        <tr>
          <td className={css(inClasses.tableCellDescr)}>Total Fuel Consumtion</td>
          <td><div className={className} style={tableCellCard}>350 Ltr</div></td>
          <td><div className={className} style={tableCellCard}>2.8 Ltr/Km</div></td>
        </tr>
        <tr>
          <td className={css(inClasses.tableCellDescr)}>Estimated Fuel Theft</td>
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
