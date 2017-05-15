import React from 'react';
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
  children: React.PropTypes.any.isRequired,
  center: React.PropTypes.bool,
  maxWidth: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  noPadding: React.PropTypes.bool,
  style: React.PropTypes.object.isRequired,
};

export default Content;
