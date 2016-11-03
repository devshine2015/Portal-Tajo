import React from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const titlePropType = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.node,
]);

const GroupTitle = ({ title }) => (
  <div className={css(classes.group__title)}>
    { title }
  </div>
);

GroupTitle.propTypes = {
  title: titlePropType,
};

const WidgetsGroup = ({
  children,
  group,
  containerClass,
  title,
}) => {
  if (!children && !group) return null;

  const child = group || children;

  return (
    <div className={css(classes.group, containerClass)}>
      { title && <GroupTitle title={title} /> }
      <div className={css(classes.group__inn)}>
        { child }
      </div>
    </div>
  );
};

WidgetsGroup.propTypes = {
  group: React.PropTypes.node,
  children: React.PropTypes.node,
  containerClass: React.PropTypes.object,
  title: titlePropType,
};

export default WidgetsGroup;
