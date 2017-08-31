import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import Paper from 'material-ui/Paper';
import classes from './classes';

const WidgetPaper = ({
  children,
  innerClassName,
  style,
}) => {
  const paperClassName = css(classes.widget__paper);
  const innClassName = cs(css(classes.widget__inn), innerClassName);

  return (
    <Paper
      className={paperClassName}
      style={style}
    >
      <div className={innClassName}>
        { children }
      </div>
    </Paper>
  );
};

WidgetPaper.propTypes = {
  // custom class name for inner wrapper
  innerClassName: PropTypes.string,
  children: PropTypes.any.isRequired, // eslint-disable-line
  // styles for container
  style: PropTypes.object, // eslint-disable-line
};

WidgetPaper.defaultProps = {
  style: {},
  innerClassName: '',
};

export default WidgetPaper;
