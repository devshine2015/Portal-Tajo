import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { linksClasses } from './classes';

const HelperLink = ({
  onClick,
  text,
}) => {
  return (
    <button
      type="button"
      role="link"
      className={css(linksClasses.helper__link)}
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
