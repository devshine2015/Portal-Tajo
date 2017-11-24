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

const IdleOverview = ({ idle1, idle2 }) => {
  const classNameParent = cs(css(classes.itemBody), css(classes.subCardsContainer));
  const drive = 100 - (idle1 + idle2);
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  return (
    <div className={css(classes.itemBox)} style={{ flex: 1 }}>
      <div className={css(classes.dataItemTitleDark)}>
        {'Idle and Running Time'}
      </div>
      <div className={classNameParent}>
        <DashboardElements.SubCard
          title={'<30min'}
          dataString={`${idle1}%`}
          style={{ backgroundColor: theme.palette.dachboardElementSecondaryColor, width: `${idle1}%` }}
        />
        <DashboardElements.SubCard
          title={'>30min'}
          dataString={`${idle2}%`}
          style={{ backgroundColor: theme.palette.alertColor, width: `${idle2}%` }}
        />
        <DashboardElements.SubCard
          title={'Drive time'}
          dataString={`${drive}%`}
          style={{ backgroundColor: theme.palette.okColor, width: `${drive}%` }}
        />
      </div>
    </div>
  );
};

IdleOverview.propTypes = {
  idle1: PropTypes.number.isRequired,
  idle2: PropTypes.number.isRequired,
  // value3: PropTypes.number.isRequired,
};

export default pure(IdleOverview);
