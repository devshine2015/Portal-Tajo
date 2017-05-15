import React from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const ScreenWithList = ({
  children,
}) => {
  return (
    <div className={css(classes.screenWithList)}>
      { children }
    </div>
  );
};

ScreenWithList.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default ScreenWithList;
