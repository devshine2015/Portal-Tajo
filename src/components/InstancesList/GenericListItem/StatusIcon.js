import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
import AlertLagIcon from 'material-ui/svg-icons/action/watch-later';
import { isEscape, theme } from 'configs';
import classes from './StatusIcon.classes';

const STYLES = {
  icon: {
    width: 21,
    height: 21,
  },
};

const StatusIcon = ({
  activityStatus,
  isDelayedWithIgnitionOff,
}) => {
  let icon = null;

  if (activityStatus === 'dead') {
    icon = <AlertIcon color={theme.palette.warningColor} style={STYLES.icon} />;
  } else if (isEscape && isDelayedWithIgnitionOff) {
    // blueGrey200
    icon = <AlertLagIcon color={theme.palette.warningColor} style={STYLES.icon} />;
  } else if (activityStatus === 'delayed') {
    icon = <AlertLagIcon color={theme.palette.warningColor} style={STYLES.icon} />;
  }

  return (
    <div className={css(classes.indicator)}>
      { icon }
    </div>
  );
};

StatusIcon.propTypes = {
  activityStatus: PropTypes.oneOf([
    'ok', 'dead', 'delayed',
  ]).isRequired,
  isDelayedWithIgnitionOff: PropTypes.bool.isRequired,
};

export default StatusIcon;
