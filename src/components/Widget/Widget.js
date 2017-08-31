import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const titlePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
]);

const WidgetTitle = ({ title }) => (
  <div className={css(classes.widget__title)}>
    { title }
  </div>
);

WidgetTitle.propTypes = {
  title: titlePropType,
};

WidgetTitle.defaultProps = {
  title: undefined,
};

const Widget = ({
  children,
  title,
  containerClassName,
}) => {
  if (!children) return null;

  const cntClassName = cs(css(classes.widget), containerClassName);

  return (
    <div className={cntClassName}>
      { title && <WidgetTitle title={title} /> }
      <div className={css(classes.widget__body)}>
        { children }
      </div>
    </div>
  );
};

Widget.propTypes = {
  containerClassName: PropTypes.string,
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  title: titlePropType,
};

Widget.defaultProps = {
  containerClassName: '',
  title: undefined,
};

export default Widget;
