import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import cs from 'classnames';
import classes from './classes';

const Section = ({
  children,
  style,
  className,
}) => {
  return (
    <div className={cs(css(classes.sectionContainer), className)} style={style}>
      { children }
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

Section.defaultProps = {
  style: {},
  className: null,
};


export default Section;
