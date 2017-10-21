import React from 'react';
import { css } from 'aphrodite/no-important';

//
//
// import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import cs from 'classnames';
import { theme } from 'configs';

import DashboardElements from 'components/DashboardElements';

import classes from 'components/DashboardElements/classes';

// import classes from './classes';

const OverdueCard = {
  backgroundColor: theme.palette.alertColor,
};
const SoonCard = {
  backgroundColor: theme.palette.warningColor,
};

const ServiceOverview = () => {
  const classNameParent = cs(css(classes.itemBody), css(classes.subCardsContainer));

  return (
    <div className={css(classes.itemBox)}>
      <div className={css(classes.dataItemTitleDark)}>
        {'Next Service Overview'}
      </div>
      <div className={classNameParent}>
        <DashboardElements.SubCard title={'comming soon'} dataString={'7'} style={SoonCard} />
        <DashboardElements.SubCard title={'overdue'} dataString={'2'} style={OverdueCard} />
      </div>
    </div>
  );
};

ServiceOverview.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default pure(ServiceOverview);
