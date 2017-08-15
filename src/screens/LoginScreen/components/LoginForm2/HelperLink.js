import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const HelperLink = ({
  onClick,
  text,
}) => {
  return (
    <button
      type="button"
      role="link"
      className={css(classes.helper__link)}
      onClick={onClick}
    >
      { text }
    </button>
  );
};

HelperLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default HelperLink;
