import React from 'react';
import PropTypes from 'prop-types';
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
  children: PropTypes.any.isRequired,
};

export default ScreenWithList;
