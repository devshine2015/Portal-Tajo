import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';

//
//
// import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import cs from 'classnames';
import { theme } from 'configs';

import DashboardElements from 'components/DashboardElements';

import classes from 'components/DashboardElements/classes';

// two component bar

const IdleOverviewBin = ({ idle }) => {
  const classNameParent = cs(css(classes.itemBody), css(classes.subCardsContainer));
  const drive = 100 - idle;
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  return (
    <div className={css(classes.itemBox)} style={{ flex: 1 }}>
      <div className={css(classes.dataItemTitleDark)}>
        {'Idle and Running Time'}
      </div>
      <div className={classNameParent}>
        <DashboardElements.SubCard
          title={'Idle time'}
          dataString={`${idle.toFixed(0)}%`}
          style={{ backgroundColor: theme.palette.dachboardElementSecondaryColor, width: `${idle}%` }}
        />
        <DashboardElements.SubCard
          title={'Drive time'}
          dataString={`${drive.toFixed(0)}%`}
          style={{ backgroundColor: theme.palette.okColor, width: `${drive}%` }}
        />
      </div>
    </div>
  );
};

IdleOverviewBin.propTypes = {
  idle: PropTypes.number.isRequired,
  // value3: PropTypes.number.isRequired,
};

export default pure(IdleOverviewBin);
