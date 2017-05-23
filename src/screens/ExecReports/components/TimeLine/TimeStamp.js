import React from 'react';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import { dateToHHMM } from 'utils/convertors';

import classes from './classes';

const TimeStamp = ({
  date,
}) => (
  <div className={css(classes.timeStamp_container)}>
    <span>
      {/*{dateToHHMM(date)}*/}
      {date.toLocaleString()}
    </span>
  </div>
);

TimeStamp.propTypes = {
  date: React.PropTypes.object.isRequired,

};

export default pure(TimeStamp);
