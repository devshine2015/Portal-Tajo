import React from 'react';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import { dateToHHMM } from 'utils/convertors';

import classes from './classes';

const TimeStampTerminal = ({
  date,
}) => (
  <div className={css(classes.timeStampTerminal_container)}>
    <span>
      {/*{date.toLocaleString()}*/}
      {date.toDateString()}
    </span>
    <span>
      {date.toLocaleTimeString()}
    </span>
  </div>
);

TimeStampTerminal.propTypes = {
  date: React.PropTypes.object.isRequired,

};

export default pure(TimeStampTerminal);
