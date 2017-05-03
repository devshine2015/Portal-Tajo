import React from 'react';
import { css } from 'aphrodite/no-important';
import moment from 'moment';
import cs from 'classnames';
import { translate } from 'utils/i18n';

import classes from './Warn.classes';
import phrases, { phrasesShape } from './Warn.PropTypes';

const Warn = ({
  activityStatus,
  isExpanded = false,
  updateDate,
  translations,
}) => {
  let infoStr = '';

  if (activityStatus === 'dead') {
    infoStr = translations.device_never_reported;
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

  translations: phrasesShape.isRequired,
};

Warn.defaultProps = {
  isExpanded: false,
};

Warn.defaultProps = {
  translations: phrases,
};

export default translate()(Warn);
