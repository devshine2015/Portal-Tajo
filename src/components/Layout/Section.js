import React from 'react';
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
  children: React.PropTypes.any.isRequired,
  style: React.PropTypes.object,
};

Section.defaultProps = {
  style: {},
};


export default Section;
