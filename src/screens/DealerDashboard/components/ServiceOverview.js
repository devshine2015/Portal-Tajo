import React from 'react';
import { css } from 'aphrodite/no-important';

//
//
// import PropTypes from 'prop-types';

import pure from 'recompose/pure';

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
  const classNameParent = css(classes.itemBody, classes.subCardsContainer);

  return (
    <div className={css(classes.itemBox)}>
      <div className={css(classes.dataItemTitleDark)}>
        {'Next Service Overview'}
      </div>
      <div className={classNameParent}>
        <DashboardElements.SubCard title={'coming soon'} dataString={'2'} style={SoonCard} />
        <DashboardElements.SubCard title={'overdue'} dataString={'1'} style={OverdueCard} />
      </div>
    </div>
  );
};

ServiceOverview.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default pure(ServiceOverview);
