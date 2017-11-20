import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

//
//
// import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import cs from 'classnames';
import { theme } from 'configs';

import DashboardElements from 'components/DashboardElements';

import classes from 'components/DashboardElements/classes';

const IdleOverview = () => {
  const classNameParent = cs(css(classes.itemBody), css(classes.subCardsContainer));

  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  return (
    <div className={css(classes.itemBox)}>
      <div className={css(classes.dataItemTitleDark)}>
        {'IDLE Time within Running Time'}
      </div>
      <div className="row">
        <div className="col-md-2" style={{paddingLeft: 0, paddingRight: 0}}>
          <DashboardElements.SubCard
            title={'20%'}
            dataString={'Idle under 30mins'}
            style={{ backgroundColor: '#cacaca' }}
          />
        </div>
        <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 0, height: 98}}>
          <DashboardElements.SubCard
            title={'10%'}
            dataString={'Idle over 30mins'}
            style={{ backgroundColor: '#ea2224', minWidth: '0' }}
          />
        </div>
        <div className="col-md-6" style={{paddingLeft: 0, paddingRight: 0, height: 98}}>
          <DashboardElements.SubCard
            title={'70%'}
            dataString={'Normal Driving Time'}
            style={{ backgroundColor: '#61a653' }}
          />
        </div>
        <div className="row" style={{paddingLeft: 15, paddingRight: 15}}>
          <div className="col-md-6" style={{paddingLeft: 0, paddingRight: 0, color: '#5c5c5c'}}>
            <label style={{fontSize: 20}}>{'0%'}</label>
          </div>
          <div className="col-md-6" style={{paddingLeft: 0, paddingRight: 0, textAlign: 'right', color: '#5c5c5c'}}>
            <label style={{fontSize: 20}}>{'100%'}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

IdleOverview.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default pure(IdleOverview);
