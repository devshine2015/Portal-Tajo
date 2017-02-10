import React from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const titlePropType = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.node,
]);

const GroupTitle = ({ title }) => (
  <div className={css(classes.widget__title)}>
    { title }
  </div>
);

GroupTitle.propTypes = {
  title: titlePropType,
};

const Widget = ({
  children,
  containerClass,
  title,
}) => {
  if (!children) return null;

  return (
    <div className={css(classes.widget, containerClass)}>
      { title && <GroupTitle title={title} /> }
      <div className={css(classes.widget__inn)}>
        { children }
      </div>
    </div>
  );
};

Widget.propTypes = {
  children: React.PropTypes.node,
  containerClass: React.PropTypes.object,
  title: titlePropType,
};

export default Widget;
