import React from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const Section = ({
  children,
}) => {
  return (
    <div className={css(classes.sectionContainer)}>
      { children }
    </div>
  );
};

Section.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default Section;
