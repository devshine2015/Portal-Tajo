import React from 'react';
import { css } from 'aphrodite/no-important';
import moment from 'moment';
import cs from 'classnames';

import classes from './Warn.classes';

const NEVER_REPORTED = 'never reported - check device';

const Warn = ({
  activityStatus,
  isExpanded = false,
  updateDate,
}) => {
  let infoStr = '';

  if (activityStatus === 'dead') {
    infoStr = NEVER_REPORTED;
  } else if (activityStatus === 'delayed') {
    infoStr = `Delayed ${moment().from(updateDate, true)}`;
  }

  const className = cs(css(classes.warn), {
    [css(classes.warn_white)]: isExpanded,
  });

  return (
    <div className={className}>
      { infoStr }
    </div>
  );
};

Warn.propTypes = {
  activityStatus: React.PropTypes.oneOf([
    'ok', 'dead', 'delayed',
  ]).isRequired,
  isExpanded: React.PropTypes.bool,
  updateDate: React.PropTypes.number.isRequired,
};

export default Warn;
