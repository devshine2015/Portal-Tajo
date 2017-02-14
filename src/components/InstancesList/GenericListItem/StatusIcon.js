import React from 'react';
import { css } from 'aphrodite/no-important';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
import AlertLagIcon from 'material-ui/svg-icons/action/watch-later';
import { yellow700, blueGrey200 } from 'material-ui/styles/colors';
import { isEscape } from 'configs';

import classes from './StatusIcon.classes';

const StatusIcon = ({
  activityStatus,
  isDelayedWithIgnitionOff,
}) => {
  let icon = null;

  if (activityStatus === 'dead') {
    icon = <AlertIcon color={yellow700} />;
  } else if (isEscape && isDelayedWithIgnitionOff) {
    icon = <AlertLagIcon color={blueGrey200} />;
  } else if (activityStatus === 'delayed') {
    icon = <AlertLagIcon color={yellow700} />;
  }

  return (
    <div className={css(classes.indicator)}>
      { icon }
    </div>
  );
};

StatusIcon.propTypes = {
  activityStatus: React.PropTypes.oneOf([
    'ok', 'dead', 'delayed',
  ]).isRequired,
  isDelayedWithIgnitionOff: React.PropTypes.bool.isRequired,
};

export default StatusIcon;
