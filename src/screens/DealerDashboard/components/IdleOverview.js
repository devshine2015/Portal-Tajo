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
        {'Idle and Running Time'}
      </div>
      <div className={classNameParent}>
        <DashboardElements.SubCard
          title={'<30min'}
          dataString={'20%'}
          style={{ backgroundColor: theme.palette.warningColor, width: '140px' }}
        />
        <DashboardElements.SubCard
          title={'>30min'}
          dataString={'10%'}
          style={{ backgroundColor: theme.palette.alertColor, width: '70px', minWidth: '0' }}
        />
        <DashboardElements.SubCard
          title={'Drive time'}
          dataString={'70%'}
          style={{ backgroundColor: theme.palette.dachboardElementColor, width: '490px' }}
        />
      </div>
    </div>
  );
};

IdleOverview.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default pure(IdleOverview);
