import React from 'react';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';

import { msToTimeIntervalString } from 'utils/convertors';

import classes from './classes';

const StopOver = ({
  address,
  durationMs,
}) => (
  <div className={css(classes.stopOver_container)}>
    <div>
      {address}
    </div>
    <div>
      {`Stoped for ${msToTimeIntervalString(durationMs)}`}
    </div>
  </div>
);

StopOver.propTypes = {
  address: React.PropTypes.string.isRequired,
  durationMs: React.PropTypes.number.isRequired,

};

export default pure(StopOver);
