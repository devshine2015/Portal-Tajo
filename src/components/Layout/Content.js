import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const Content = ({
  children,
  center,
  maxWidth,
  noPadding,
  style,
}) => {
  const className = cs(css(classes.content), {
    [css(classes.content__center)]: center,
    [css(classes.content__padding)]: !noPadding,
  });
  const st = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  return (
    <div className={className} style={st}>
      { children }
    </div>
  );
};

Content.defaultProps = {
  center: false,
  noPadding: false,
  maxWidth: undefined,
  style: {},
};

Content.propTypes = {
  children: PropTypes.any.isRequired,
  center: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  noPadding: PropTypes.bool,
  style: PropTypes.object,
};

export default Content;
