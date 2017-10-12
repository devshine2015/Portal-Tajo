import React from 'react';
import PropTypes from 'prop-types';
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
      {`Stopped for ${msToTimeIntervalString(durationMs)}`}
    </div>
  </div>
);

StopOver.propTypes = {
  address: PropTypes.string.isRequired,
  durationMs: PropTypes.number.isRequired,

};

export default pure(StopOver);
