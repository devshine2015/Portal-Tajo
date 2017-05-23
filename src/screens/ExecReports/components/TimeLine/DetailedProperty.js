import React from 'react';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import classes from './classes';


const DetailItemProperty = ({
  title,
  icon,
  value,
}) => (
  <div className={css(classes.propContainer)}>
    <span className={css(classes.titleCell)}>
      {title === '' ? icon : `${title}:`}
    </span>
    <span className={css(classes.valueCell)}>
      {value}
    </span>
  </div>
);

DetailItemProperty.propTypes = {
  icon: React.PropTypes.node,
  title: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
};
DetailItemProperty.defaultProps = {
  icon: null,
  title: '',
};

export default pure(DetailItemProperty);
