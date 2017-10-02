import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const titlePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
]);

const WidgetTitle = ({
  children,
  rightElement,
}) => (
  <div className={css(classes.title)}>
    { children }
    { rightElement && 
      <div className={css(classes.title__right)}>
        { rightElement }
      </div>
    }
  </div>
);

WidgetTitle.propTypes = {
  children: titlePropType.isRequired,
  rightElement: PropTypes.node,
};

WidgetTitle.defaultProps = {
  rightElement: null,
};

const Widget = ({
  children,
  title,
  containerClassName,
  rightElement,
}) => {
  if (!children) return null;

  const cntClassName = cs(css(classes.widget), containerClassName);

  return (
    <div className={cntClassName}>
      { title &&
        <WidgetTitle rightElement={rightElement}>
          { title }
        </WidgetTitle>
      }
      <div className={css(classes.body)}>
        { children }
      </div>
    </div>
  );
};

Widget.propTypes = {
  containerClassName: PropTypes.string,
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  title: titlePropType,
  rightElement: PropTypes.node,
};

Widget.defaultProps = {
  containerClassName: '',
  title: undefined,
  rightElement: null,
};

export default Widget;
