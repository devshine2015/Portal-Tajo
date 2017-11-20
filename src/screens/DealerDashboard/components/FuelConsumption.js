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
  fontSize: '55px',
  letterSpacing: '3px',
  padding: '6px',
  borderRadius: '5px'
};

const tableCellCardTheft = {
  fontSize: '55px',
  letterSpacing: '3px',
  backgroundColor: '#eb1c24',
  padding: '6px',
  borderRadius: '5px'
};
const tableCellCardRefuel = {
  fontSize: '55px',
  letterSpacing: '3px',
  backgroundColor: '#019e0f',
  padding: '6px',
  borderRadius: '5px'
};

const inClasses = StyleSheet.create({
  tableCellCard: {
    //height: '64px',
    //lineHeight: '64px',
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
        {'Fleet Wide Fuel Consumption'}
      </div>
      <div className="row">
        <div className="col-md-2" style={{paddingTop: 25, paddingRight: 0}}>
          <div className={css(inClasses.tableCellDescr)} style={{color: '#878787', fontSize: 18, fontWeight: 400}}>Total Fuel Consumption</div>
        </div>
        <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 5}}>
          <div className={className} style={tableCellCard}>350<label style={{fontSize: 30, fontWeight: 400}}>Ltrs</label></div>
        </div>
        <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 0}}>
          <div className={className} style={tableCellCard}>2.8<label style={{fontSize: 30, fontWeight: 400}}>Lt/km</label></div> 
        </div>
      </div>
      <div className="row" style={{marginTop: '10px', marginBottom: '10px'}}>
        <div className="col-md-2">
        </div>
        <div className="col-md-4">
          <div className={css(inClasses.tableCellDescr)} style={{fontSize: 22, fontWeight: 'normal', padding: '12px 0 0', textAlign: 'center', color: 'black' }}>Total Litres</div>
        </div>
        <div className="col-md-4">
          <div className={css(inClasses.tableCellDescr)} style={{fontSize: 22, fontWeight: 'normal', padding: '12px 0 0', textAlign: 'center', color: 'black' }}>% of Fuel Consumption</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2" style={{paddingTop: 25, paddingRight: 0}}>
          <div className={css(inClasses.tableCellDescr)} style={{color: '#878787', fontSize: 18, fontWeight: 400}}>Estimated Fuel Loss</div>
        </div>
        <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 5}}>
          <div className={className} style={{backgroundColor: '#2b629d', fontSize: '55px', letterSpacing: '3px',padding: '6px', borderRadius: '5px'}}>20<label style={{fontSize: 30, fontWeight: 400}}> Litres</label></div>
        </div>
        <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 0}}>
          <div className={className} style={tableCellCardTheft}>5.7%</div> 
        </div>
      </div>
      <div className="row">
        <div className="col-md-2" style={{paddingTop: 25, paddingRight: 0}}>
          <div className={css(inClasses.tableCellDescr)} style={{color: '#878787', fontSize: 18, fontWeight: 400}}>Estimated Refuel</div>
        </div>
        <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 5}}>
          <div className={className} style={{backgroundColor: '#2b629d', fontSize: '55px', letterSpacing: '3px',padding: '6px', borderRadius: '5px'}}>175<label style={{fontSize: 30, fontWeight: 400}}> Litres</label></div>
        </div>
        <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 0}}>
          <div className={className} style={tableCellCardRefuel}>50%</div>
        </div>
      </div>
    </div>
  );
};

FuelConsumption.propTypes = {
  //title: PropTypes.string.isRequired,
};

export default pure(FuelConsumption);
