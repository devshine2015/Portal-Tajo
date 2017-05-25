import React from 'react';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import { dateToHHMM } from 'utils/convertors';

import classes from './classes';

const TimeStamp = ({
  date,
}) => (
  <div className={css(classes.timeStamp_tick)}>
    <div className={css(classes.timeStamp_mark_container)}>
      <div className={css(classes.timeStamp_mark_pointer)} />
      <div className={css(classes.timeStamp_mark_body)}>
        <span>
          {dateToHHMM(date)}
          {/*{date.toLocaleString()}*/}
        </span>
      </div>
    </div>
  </div>
);

TimeStamp.propTypes = {
  date: React.PropTypes.object.isRequired,

};

export default pure(TimeStamp);
