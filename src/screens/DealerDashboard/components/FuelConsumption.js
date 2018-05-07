import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import DashboardElements from 'components/DashboardElements';
import { numberToFixedString } from 'utils/convertors';

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

const FuelConsumption = (props) => {
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }}
  const kmPerLtr = props.totalDistance
    ? props.totalDistance / props.totalFuel
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
              dataString={numberToFixedString(props.totalFuel)}
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString={numberToFixedString(kmPerLtr)}
              dataUnits=" KM / Litre"
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
              dataString={numberToFixedString(props.totalLoss)}
              dataUnits="ltr"
            />
            <DashboardElements.TableDataCell
              dataString={calcPerc(props.totalLoss, props.totalFuel)}
              style={{ backgroundColor: theme.palette.alertColor }}
            />
          </tr>
          <tr>
            <td className={css(inClasses.tableCellDescr)}>Estimated Refuel</td>
            <DashboardElements.TableDataCell
              dataString={numberToFixedString(props.totalGain)}
              dataUnits="ltr"
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

FuelConsumption.propTypes = {
  totalFuel: PropTypes.number.isRequired,
  totalLoss: PropTypes.number.isRequired,
  totalGain: PropTypes.number.isRequired,
  totalDistance: PropTypes.number.isRequired,
};

export default pure(FuelConsumption);
