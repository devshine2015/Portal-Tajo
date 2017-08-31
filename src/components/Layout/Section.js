import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const Section = ({
  children,
  style,
}) => {
  return (
    <div className={css(classes.sectionContainer)} style={style}>
      { children }
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};

Section.defaultProps = {
  style: {},
};


export default Section;
