import React from 'react';
import { css } from 'aphrodite/no-important';
import { version } from 'configs';

import classes from './classes';

const CodebaseVersion = () => (
  <div className={css(classes.version)}>
    v.{ version }
  </div>
);

export default CodebaseVersion;
