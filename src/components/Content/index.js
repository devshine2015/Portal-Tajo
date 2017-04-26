import React from 'react';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const Content = ({
  children,
  center,
  maxWidth,
}) => {
  const className = cs(css(classes.content), {
    [css(classes.content_center)]: center,
  });

  return (
    <div className={className} style={maxWidth !== undefined ? { maxWidth } : {}}>
      { children }
    </div>
  );
};

Content.defaultProps = {
  center: false,
};

Content.propTypes = {
  children: React.PropTypes.any.isRequired,
  center: React.PropTypes.bool,
  maxWidth: React.PropTypes.number,
};

export default Content;
